import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Dashboard({ user }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/tasks');
      setTasks(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading tasks...</div>;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Available Tasks</h1>
        <Link to="/create-task" className="btn-primary">Post New Task</Link>
      </div>
      <div className="task-grid">
        {tasks.length === 0 ? (
          <p>No tasks available. Be the first to post one!</p>
        ) : (
          tasks.map((task) => (
            <Link to={`/task/${task.id}`} key={task.id} className="task-card">
              <h3>{task.title}</h3>
              <p className="task-description">{task.description.substring(0, 150)}...</p>
              <div className="task-meta">
                <span className="task-budget">${task.budget}</span>
                <span className="task-status">{task.status}</span>
              </div>
              <p className="task-author">Posted by: {task.username}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
