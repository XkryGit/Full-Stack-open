import React from 'react';
import NavBar from './components/NavBar';
import Home from './pages/home';
import Users from './pages/Users';
import User from './pages/User';
import Blog from './pages/Blog';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const App = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <Router>
        <NavBar />
        {user !== null && (
          <div>
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/users" element={<Users />} />
              <Route path="/user/:id" element={<User />} />
              <Route path="/blogs/:id" element={<Blog />} />
            </Routes>
          </div>
        )}
      </Router>
    </div>
  );
};

export default App;
