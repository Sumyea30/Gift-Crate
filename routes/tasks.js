const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/auth');

// GET /api/tasks - Get all tasks
router.get('/', taskController.getAllTasks);

// GET /api/tasks/:id - Get single task
router.get('/:id', taskController.getTaskById);

// POST /api/tasks - Create new task (protected)
router.post('/', authMiddleware, taskController.createTask);

// PUT /api/tasks/:id - Update task (protected)
router.put('/:id', authMiddleware, taskController.updateTask);

// DELETE /api/tasks/:id - Delete task (protected)
router.delete('/:id', authMiddleware, taskController.deleteTask);

// GET /api/tasks/:id/bids - Get bids for a task
router.get('/:id/bids', taskController.getTaskBids);

module.exports = router;