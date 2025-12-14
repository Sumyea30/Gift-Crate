const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
  register: async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      
      db.run(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword],
        function(err) {
          if (err) {
            return res.status(400).json({ error: err.message });
          }
          const userId = this.lastID;
          const token = jwt.sign({ userId }, process.env.JWT_SECRET || 'your_secret');
          res.json({ 
            user: { id: userId, username, email }, 
            token 
          });
        }
      );
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (!user) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'your_secret');
        res.json({ 
          user: { id: user.id, username: user.username, email: user.email }, 
          token 
        });
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  logout: async (req, res) => {
    res.json({ message: 'Logged out successfully' });
  },

  verifyToken: async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token' });
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret');
      db.get('SELECT id, username, email FROM users WHERE id = ?', [decoded.userId], (err, user) => {
        if (err || !user) {
          return res.status(401).json({ error: 'Invalid token' });
        }
        res.json({ user });
      });
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  }
};

module.exports = authController;

