require('dotenv').config(); // Add this at the very top!

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Import route modules
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const bidRoutes = require('./routes/bids');
const userRoutes = require('./routes/users');

// Use routes with prefixes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/bids', bidRoutes);
app.use('/api/users', userRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'API is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));