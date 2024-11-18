import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { handleNotification } from '../reducers/notificationReducer';
import blogService from '../services/blogs';
import { handleBlogs } from '../reducers/blogsReducer';

const Blog = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const blogs = useSelector((state) => state.blogs);
  const blog = blogs && blogs.find((blog) => blog.id === id);

  if (!blog) {
    return null;
  }

  const handleUpdate = async () => {
    const blogUpdate = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    const id = blog.id;
    try {
      await blogService.update(id, blogUpdate);
      dispatch(
        handleNotification([true, `Like added to ${blogUpdate.title}`], 5)
      );
      blogService.getAll().then((blogs) => dispatch(handleBlogs(blogs)));
    } catch (error) {
      dispatch(handleNotification([false, error.message], 5));
    }
  };

  const handleComment = async () => {
    const comment = document.getElementById('comment').value;
    const blogUpdate = {
      ...blog,
      comments: [...blog.comments, comment],
      user: blog.user.id,
    };
    const id = blog.id;
    try {
      await blogService.update(id, blogUpdate);
      dispatch(
        handleNotification([true, `Comment added to ${blogUpdate.title}`], 5)
      );
      blogService.getAll().then((blogs) => dispatch(handleBlogs(blogs)));
    } catch (error) {
      dispatch(handleNotification([false, error.message], 5));
    }
  };

  console.log(blog);
  return (
    <>
      <div>
        <h2>
          {blog.title} by {blog.author}
        </h2>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
        <div>
          <p>{blog.likes} likes</p>
          <button
            className="buttonSpecial"
            onClick={() => handleUpdate()}
            id="like-button"
          >
            Like
          </button>
        </div>
        <p>Added by {blog.user.username}</p>
      </div>
      <div>
        <h4>Comments</h4>
        <div className="blocks">
          <input type="text" id="comment" />
          <button className="buttonSpecial" onClick={() => handleComment()}>
            new comment
          </button>
        </div>
        <ul>
          {blog.comments ? (
            blog.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))
          ) : (
            <p>No comments</p>
          )}
        </ul>
      </div>
    </>
  );
};

export default Blog;
