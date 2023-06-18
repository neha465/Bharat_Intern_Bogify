import React, { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { categories } from "../components/Category";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.keywords || category.keyword);
  };

  const filteredBlogs = selectedCategory
    ? blogs.filter((blog) => {
        if (Array.isArray(selectedCategory)) {
          return selectedCategory.some((keyword) => {
            return (
              blog.title.toLowerCase().includes(keyword) ||
              blog.description.toLowerCase().includes(keyword)
            );
          });
        } else {
          return (
            blog.title.toLowerCase().includes(selectedCategory) ||
            blog.description.toLowerCase().includes(selectedCategory)
          );
        }
      })
    : blogs;

  // Get all Blogs
  const getAllBlogs = async () => {
    try {
      // API Call with fetch headers
      const response = await fetch(
        "http://localhost:3001/api/v1/blog/all-blogs",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setLoading(false);
      setBlogs(data?.blogs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <>
      {!localStorage.getItem("token") && (
        <section className="bg-light">
          <div className="container py-5">
            <div className="row d-flex align-items-center">
              <div
                className="col-md-6 d-flex align-items-center"
                style={{ flexDirection: "column" }}
              >
                <h2 className="mb-4 text-center fw-bold">Welcome to Blogify</h2>
                <p className="lead mb-4">
                  Discover and share interesting Blogs with the world. Blogify
                  is a platform for writers, creators, and thinkers to publish
                  their ideas.
                </p>
                <Link
                  to="/signup"
                  className="btn btn-outline-dark"
                  style={{ fontSize: "18px", width: "180px" }}
                >
                  Get Started
                </Link>
              </div>
              <div className="col-md-6">
                <img src="main.png" className="img-fluid" alt="Blogify Cover" />
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="container mt-3 ">
        <div className="row">
          <h2 className="mt-5 text-center mb-5 ">Recent Blogs</h2>
          <div className="btn-group mt-3">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`btn btn-secondary ${
                  selectedCategory === category.keyword ? "active" : ""
                }`}
                onClick={() => handleCategorySelect(category)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center mt-5">
          <Spinner />
        </div>
      ) : (
        <>
          {filteredBlogs.length !== 0 ? (
            filteredBlogs
              .map((blog) => (
                <BlogCard
                  key={blog._id} // Assign a unique key prop using blog._id
                  title={blog.title}
                  description={blog.description}
                  image={blog.image}
                  username={blog.user.username}
                  dateTime={blog.date}
                  id={blog._id}
                  isUser={localStorage.getItem("userId") === blog.user._id}
                />
              ))
              .reverse()
          ) : (
            <p
              style={{
                marginTop: "200px",
                fontSize: "32px",
                textAlign: "center",
                color: "grey",
              }}
            >
              "No blogs to display"
            </p>
          )}
        </>
      )}
    </>
  );
};

export default Blogs;