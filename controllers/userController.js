const db = require('../config/database');

const userController = {
  getProfile: async (req, res) => {
    try {
      db.get(
        'SELECT id, username, email, created_at FROM users WHERE id = ?',
        [req.userId],
        (err, row) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          if (!row) {
            return res.status(404).json({ error: 'User not found' });
          }
          res.json(row);
        }
      );
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateProfile: async (req, res) => {
    const { username, email } = req.body;
    try {
      db.run(
        'UPDATE users SET username = ?, email = ? WHERE id = ?',
        [username, email, req.userId],
        function(err) {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.json({ id: req.userId, username, email });
        }
      );
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getUserTasks: async (req, res) => {
    try {
      db.all(
        'SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC',
        [req.params.id],
        (err, rows) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.json(rows);
        }
      );
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getUserBids: async (req, res) => {
    try {
      db.all(
        'SELECT b.*, t.title FROM bids b JOIN tasks t ON b.task_id = t.id WHERE b.user_id = ? ORDER BY b.created_at DESC',
        [req.params.id],
        (err, rows) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.json(rows);
        }
      );
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = userController;

