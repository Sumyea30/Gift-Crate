const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

// GET /api/users/profile - Get user profile (protected)
router.get('/profile', authMiddleware, userController.getProfile);

// PUT /api/users/profile - Update profile (protected)
router.put('/profile', authMiddleware, userController.updateProfile);

// GET /api/users/:id/tasks - Get user's tasks
router.get('/:id/tasks', userController.getUserTasks);

// GET /api/users/:id/bids - Get user's bids
router.get('/:id/bids', userController.getUserBids);

module.exports = router;