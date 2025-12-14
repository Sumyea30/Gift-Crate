import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function TaskDetail({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [bids, setBids] = useState([]);
  const [bidMessage, setBidMessage] = useState('');
  const [bidPrice, setBidPrice] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTaskDetail();
    fetchBids();
  }, [id]);

  const fetchTaskDetail = async () => {
    try {
      const response = await axios.get(`/tasks/${id}`);
      setTask(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching task:', err);
      setLoading(false);
    }
  };

  const fetchBids = async () => {
    try {
      const response = await axios.get(`/tasks/${id}/bids`);
      setBids(response.data);
    } catch (err) {
      console.error('Error fetching bids:', err);
    }
  };

  const handleSubmitBid = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/bids', {
        task_id: parseInt(id),
        message: bidMessage,
        price: parseFloat(bidPrice)
      });
      setBidMessage('');
      setBidPrice('');
      fetchBids();
      alert('Bid submitted successfully!');
    } catch (err) {
      alert('Failed to submit bid');
    }
  };

  if (loading) return <div className="loading">Loading task...</div>;
  if (!task) return <div>Task not found</div>;

  return (
    <div className="task-detail-container">
      <button onClick={() => navigate('/')} className="btn-back">← Back to Tasks</button>
      
      <div className="task-detail">
        <h1>{task.title}</h1>
        <p className="task-description-full">{task.description}</p>
        <div className="task-info">
          <span className="info-item">Budget: <strong>${task.budget}</strong></span>
          <span className="info-item">Status: <strong>{task.status}</strong></span>
          <span className="info-item">Posted by: <strong>{task.username}</strong></span>
        </div>
      </div>

      {task.user_id !== user.id && (
        <div className="bid-form-section">
          <h2>Submit Your Bid</h2>
          <form onSubmit={handleSubmitBid}>
            <textarea
              placeholder="Describe your proposal..."
              value={bidMessage}
              onChange={(e) => setBidMessage(e.target.value)}
              rows="4"
              required
            />
            <input
              type="number"
              placeholder="Your Price ($)"
              value={bidPrice}
              onChange={(e) => setBidPrice(e.target.value)}
              step="0.01"
              required
            />
            <button type="submit" className="btn-primary">Submit Bid</button>
          </form>
        </div>
      )}

      <div className="bids-section">
        <h2>Bids ({bids.length})</h2>
        {bids.length === 0 ? (
          <p>No bids yet. Be the first to bid!</p>
        ) : (
          <div className="bids-list">
            {bids.map((bid) => (
              <div key={bid.id} className="bid-card">
                <div className="bid-header">
                  <strong>{bid.username}</strong>
                  <span className="bid-price">${bid.price}</span>
                </div>
                <p className="bid-message">{bid.message}</p>
                <small className="bid-date">{new Date(bid.created_at).toLocaleDateString()}</small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskDetail;