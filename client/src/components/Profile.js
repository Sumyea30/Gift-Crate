import React from 'react';

function Profile({ user }) {
  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-card">
        <h2>{user.username}</h2>
        <p>Email: {user.email}</p>
        <p>Member since: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default Profile;