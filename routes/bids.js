const express = require('express');
const router = express.Router();
const bidController = require('../controllers/bidController');
const authMiddleware = require('../middleware/auth');

// POST /api/bids - Create new bid (protected)
router.post('/', authMiddleware, bidController.createBid);

// GET /api/bids/:id - Get single bid
router.get('/:id', bidController.getBidById);

// PUT /api/bids/:id/accept - Accept a bid (protected)
router.put('/:id/accept', authMiddleware, bidController.acceptBid);

// DELETE /api/bids/:id - Delete bid (protected)
router.delete('/:id', authMiddleware, bidController.deleteBid);

module.exports = router;
