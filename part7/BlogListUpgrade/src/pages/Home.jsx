import { useState, useEffect, useRef } from 'react';
import blogService from '../services/blogs';
import AddBlog from '../components/AddBlog';
import Togglable from '../components/Togglable';
import { useDispatch, useSelector } from 'react-redux';
import { handleNotification } from '../reducers/notificationReducer';
import { handleBlogs } from '../reducers/blogsReducer';
import { Link } from 'react-router-dom';

const Home = (user) => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const blogFormRef = useRef();

  const createBlog = async () => {
    try {
      await blogService.create({ title: title, author: author, url: url });
      dispatch(
        handleNotification([true, `A new blog ${title} by ${author} added`], 5)
      );
      setTitle('');
      setAuthor('');
      setUrl('');
      handleGetAll();
    } catch (error) {
      dispatch(handleNotification([false, error.message], 5));
    }
  };

  const handleDelete = async (blog) => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
    try {
      await blogService.deleteBlog(blog.id);
      dispatch(handleNotification([true, `Blog ${blog.title} removed`], 5));
      handleGetAll();
    } catch (error) {
      dispatch(handleNotification([false, error.message], 5));
    }
  };

  const handleGetAll = async () => {
    blogService.getAll().then((blogs) => dispatch(handleBlogs(blogs)));
  };

  return (
    <div>
      <h2>Blogs</h2>
      <div className="blocks">
        {user && (
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <AddBlog
              createBlog={createBlog}
              title={title}
              setTitle={setTitle}
              author={author}
              setAuthor={setAuthor}
              url={url}
              setUrl={setUrl}
            />
          </Togglable>
        )}
      </div>
      {user && blogs !== null && (
        <table>
          <tbody>
            {[...blogs]
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <tr key={blog.id}>
                  <td className="blocks">
                    <Link className="link" to={`/blogs/${blog.id}`}>
                      {blog.title} - {blog.author}
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
