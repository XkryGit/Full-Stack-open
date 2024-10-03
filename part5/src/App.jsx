import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import AddBlog from "./components/AddBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  const blogFormRef = useRef();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      window.localStorage.setItem("userLogged", JSON.stringify(user));
      setUsername("");
      setPassword("");
      setNotification([true, `Login as ${user.username}`]);
      setTimeout(() => {
        setNotification(null);
        window.location.reload();
      }, 1000);
    } catch (exception) {
      setNotification([false, `Wrong credentials`]);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const createBlog = async () => {
    try {
      await blogService.create({ title: title, author: author, url: url });
      setNotification([true, `A new blog ${title} by ${author} added`]);
      setTitle("");
      setAuthor("");
      setUrl("");
      handleGetAll();
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      setNotification([false, error.message]);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleUpdate = async (update) => {
    const blog = {
      ...update,
      likes: update.likes + 1,
      user: update.user.id,
    };
    const id = update.id;
    try {
      await blogService.update(id, blog);
      setNotification([true, `Like added to ${blog.title}`]);
      handleGetAll();
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      setNotification([false, error.message]);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("userLogged");
    window.location.reload();
  };

  const handleDelete = async (blog) => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
    try {
      await blogService.deleteBlog(blog.id);
      setNotification([true, `Blog ${blog.title} removed`]);
      handleGetAll();
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      setNotification([false, error.message]);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleGetAll = async () => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
    const loggedUserJSON = window.localStorage.getItem("userLogged");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  };

  useEffect(() => {
    handleGetAll();
  }, []);

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          id="username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="login-button">
        login
      </button>
    </form>
  );

  const userForm = () => (
    <>
      <h3>
        {user.username} is logged.
        <button onClick={handleLogout}>Logout</button>
      </h3>
    </>
  );

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={notification} />
      {user === null ? loginForm() : userForm()}
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
      {user &&
        blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
          ))}
    </div>
  );
};

export default App;
