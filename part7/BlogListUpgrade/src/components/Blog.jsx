import React, { useState, useEffect } from "react";

const Blog = ({ blog, handleUpdate, handleDelete }) => {
  const [visible, setVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const userLogged = JSON.parse(localStorage.getItem("userLogged"));
    setCurrentUser(userLogged);
  }, []);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} id="blog">
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)} id="view-button">
        View
      </button>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>
            Likes {blog.likes}
            <button onClick={() => handleUpdate(blog)} id="like-button">
              Like
            </button>
          </p>
          <p>{blog.user.name}</p>

          {blog.user.username === currentUser.username && (
            <button
              style={{ background: "red" }}
              onClick={() => handleDelete(blog)}
              id="delete-button"
            >
              Remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
