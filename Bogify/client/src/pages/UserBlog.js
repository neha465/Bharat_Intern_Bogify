import React, { useEffect, useState } from 'react'
import BlogCard from '../components/BlogCard'
import Spinner from '../components/Spinner';

const UserBlog = () => {
  const [blogs,setBlogs] =useState([]);
  const [loading, setLoading] = useState(true);

  const getUserBlogs =async()=>{
try {
  const response = await fetch(
    "http://localhost:3001/api/v1/blog/users-blog",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
    }
  )
  const data = await response.json()
  setLoading(false);
  if(data?.success){
    setBlogs(data?.blogs)
  }

} catch (error) {
  console.log(error)
}
  }

  useEffect(() => {  
   getUserBlogs()
  }, [])
  
  return (
    <>
       {loading ? (
        <div className="text-center mt-5">
          <Spinner /> 
        </div>
      ) : (
        <>
          {blogs.length !== 0 ? (
            blogs.map((blog) => (
              <BlogCard
                title={blog.title}
                description={blog.description}
                image={blog.image}
                username={blog.user.username}
                dateTime={blog.date}
                id={blog._id}
                isUser={localStorage.getItem("userId") === blog.user._id}
              />
            )).reverse()
          ) : (
            <p style={{ marginTop: "200px", fontSize: "32px", textAlign: "center", color: "grey" }}>
              "No blogs to display"
            </p>
          )}
        </>
      )}
    </>
  )
}

export default UserBlog