const db = require('../config/database');

const taskController = {
  getAllTasks: async (req, res) => {
    try {
      db.all(
        'SELECT t.*, u.username FROM tasks t JOIN users u ON t.user_id = u.id ORDER BY t.created_at DESC',
        [],
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

  getTaskById: async (req, res) => {
    try {
      db.get(
        'SELECT t.*, u.username FROM tasks t JOIN users u ON t.user_id = u.id WHERE t.id = ?',
        [req.params.id],
        (err, row) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          if (!row) {
            return res.status(404).json({ error: 'Task not found' });
          }
          res.json(row);
        }
      );
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createTask: async (req, res) => {
    const { title, description, budget } = req.body;
    try {
      db.run(
        'INSERT INTO tasks (title, description, budget, user_id) VALUES (?, ?, ?, ?)',
        [title, description, budget, req.userId],
        function(err) {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.json({ 
            id: this.lastID, 
            title, 
            description, 
            budget, 
            user_id: req.userId 
          });
        }
      );
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateTask: async (req, res) => {
    const { title, description, budget, status } = req.body;
    try {
      db.run(
        'UPDATE tasks SET title = ?, description = ?, budget = ?, status = ? WHERE id = ? AND user_id = ?',
        [title, description, budget, status, req.params.id, req.userId],
        function(err) {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          if (this.changes === 0) {
            return res.status(404).json({ error: 'Task not found or unauthorized' });
          }
          res.json({ id: req.params.id, title, description, budget, status });
        }
      );
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteTask: async (req, res) => {
    try {
      db.run(
        'DELETE FROM tasks WHERE id = ? AND user_id = ?',
        [req.params.id, req.userId],
        function(err) {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          if (this.changes === 0) {
            return res.status(404).json({ error: 'Task not found or unauthorized' });
          }
          res.json({ message: 'Task deleted successfully' });
        }
      );
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getTaskBids: async (req, res) => {
    try {
      db.all(
        'SELECT b.*, u.username FROM bids b JOIN users u ON b.user_id = u.id WHERE b.task_id = ? ORDER BY b.created_at DESC',
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

module.exports = taskController;

