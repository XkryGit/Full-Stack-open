import React from 'react';
import { useState } from 'react';
import Notification from '../components/Notification';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { useDispatch, useSelector } from 'react-redux';
import { handleNotification } from '../reducers/notificationReducer';
import { handleUser } from '../reducers/userReducer';
import { handleBlogs } from '../reducers/blogsReducer';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const NavBar = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      window.localStorage.setItem('userLogged', JSON.stringify(user));
      setUsername('');
      setPassword('');
      dispatch(handleNotification([true, `Login as ${user.username}`], 5));
      dispatch(handleUser(user));
      blogService.getAll().then((blogs) => dispatch(handleBlogs(blogs)));
    } catch (error) {
      dispatch(handleNotification([false, error.message], 5));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('userLogged');
    window.location.reload();
  };

  const loginForm = () => (
    <form className="navBar" onSubmit={handleLogin}>
      <div>
        Username
        <input
          type="text"
          id="username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button className="buttonSpecial" type="submit" id="login-button">
        Login
      </button>
    </form>
  );

  const userForm = () => (
    <>
      <div className="blocks">
        <h3>{user.username} is logged. </h3>
        <button className="buttonSpecial" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="blocks">
        <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="/users">
          Users
        </Link>
      </div>
    </>
  );
  return (
    <div>
      <Notification message={notification} />
      {user === null ? loginForm() : userForm()}
    </div>
  );
};

export default NavBar;
