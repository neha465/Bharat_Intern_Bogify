import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const BlogCard = (props) => {
  const navigate = useNavigate();
  const { title, description, image, username, dateTime, id, isUser } = props;
  const userInitial = username.charAt(0);
  const date = dateTime.split('T')[0];
  const [showFullDescription, setShowFullDescription] = useState(false);
  const shortDescription = description.length > 100 ? `${description.substring(0, 200)}...` : description;

  const handleEdit = () => {
    navigate(`/blog-detail/${id}`);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/blog/delete-blog/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });
      const data = await response.json();
      if (data?.success) {
        toast.success('blog deleted successfully');
        window.location.reload();
        navigate('/my-blogs');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formattedDescription = showFullDescription ? description.replace(/\n/g, '<br>') : shortDescription;

  return (
    <>
      <div className="card mx-auto mt-4" style={{ width: '60%' }}>
        <div className="card-header d-flex align-items-center bg-light text-dark" style={{ border: "none" }}>
          <div className="initial-circle" style={{ marginRight: '10px' }}>
            {userInitial}
          </div>
          <h5 className="mb-0">{username}</h5>
          {isUser && (
            <div className="icon">
              <i
                className="fa-solid fa-trash"
                onClick={handleDelete}
              ></i>
              <i className="fa-sharp fa-solid fa-pen" onClick={handleEdit}></i>
            </div>
          )}
        </div>
        <div className="card-body d-flex" style={{ flexDirection: 'column' }}>
          <div className="row">
            <div className="col-md-6 mb-md-0 d-flex align-items-center">
              <img
                style={{ width: '100%', aspectRatio: "4/2" }}
                src={image}
                alt="blog-img"
                className="img-fluid mb-2"
              />
            </div>
            <div className="col-md-6 d-flex flex-column align-items-center">
              <div className="align-items-center mb-3 mt-5">
                <h5 className="card-title mb-0 text-center" style={{ fontSize: '24px' }}>
                  {title}
                </h5>
              </div>
              <small className="text-muted text-center">{date}</small>
            </div>

            <div>
              <p className="card-text flex-grow-1" style={{ fontSize: '16px' }} dangerouslySetInnerHTML={{ __html: formattedDescription }} />
              {description.length > 200 && (
                <button
                  className="btn btn-link p-0 ms-1"
                  onClick={() => setShowFullDescription(!showFullDescription)}
                >
                  {showFullDescription ? 'Read less' : 'Read more'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;