import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateTask({ user }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('/tasks', { title, description, budget: parseFloat(budget) });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create task');
    }
  };

  return (
    <div className="create-task-container">
      <div className="create-task-card">
        <h2>Post a New Task</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="6"
            required
          />
          <input
            type="number"
            placeholder="Budget ($)"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            step="0.01"
            required
          />
          <div className="form-actions">
            <button type="submit" className="btn-primary">Post Task</button>
            <button type="button" onClick={() => navigate('/')} className="btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTask;