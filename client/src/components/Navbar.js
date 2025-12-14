import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">TaskMarket</Link>
        <div className="nav-menu">
          <Link to="/" className="nav-link">Browse Tasks</Link>
          <Link to="/create-task" className="nav-link">Post Task</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
          <span className="nav-user">Welcome, {user.username}</span>
          <button onClick={onLogout} className="nav-logout">Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;