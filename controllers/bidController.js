const db = require('../config/database');

const bidController = {
  createBid: async (req, res) => {
    const { task_id, message, price } = req.body;
    try {
      db.run(
        'INSERT INTO bids (task_id, user_id, message, price) VALUES (?, ?, ?, ?)',
        [task_id, req.userId, message, price],
        function(err) {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.json({ 
            id: this.lastID, 
            task_id, 
            user_id: req.userId, 
            message, 
            price 
          });
        }
      );
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getBidById: async (req, res) => {
    try {
      db.get(
        'SELECT b.*, u.username FROM bids b JOIN users u ON b.user_id = u.id WHERE b.id = ?',
        [req.params.id],
        (err, row) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          if (!row) {
            return res.status(404).json({ error: 'Bid not found' });
          }
          res.json(row);
        }
      );
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  acceptBid: async (req, res) => {
    try {
      db.run(
        'UPDATE bids SET status = ? WHERE id = ?',
        ['accepted', req.params.id],
        function(err) {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          if (this.changes === 0) {
            return res.status(404).json({ error: 'Bid not found' });
          }
          res.json({ id: req.params.id, status: 'accepted' });
        }
      );
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteBid: async (req, res) => {
    try {
      db.run(
        'DELETE FROM bids WHERE id = ? AND user_id = ?',
        [req.params.id, req.userId],
        function(err) {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          if (this.changes === 0) {
            return res.status(404).json({ error: 'Bid not found or unauthorized' });
          }
          res.json({ message: 'Bid deleted successfully' });
        }
      );
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = bidController;

