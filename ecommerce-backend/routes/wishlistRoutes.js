const express = require('express');
const router = express.Router();
const WishlistItem = require('../models/WishlistItem');

// Add to wishlist
router.post('/add', async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const existing = await WishlistItem.findOne({ userId, productId });
    if (existing) return res.status(400).json({ message: 'Already in wishlist' });

    const newItem = new WishlistItem({ userId, productId });
    await newItem.save();
    res.status(201).json({ message: 'Added to wishlist' });
  } catch (err) {
    console.error('Add to wishlist error:', err.message);
    res.status(500).json({ message: 'Failed to add to wishlist' });
  }
});

// Get wishlist by user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const items = await WishlistItem.find({ userId }).populate('productId');
    res.json(items);
  } catch (err) {
    console.error('Fetch wishlist error:', err);
    res.status(500).json({ message: 'Failed to fetch wishlist' });
  }
});

// ✅ Remove from wishlist
router.delete('/remove/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await WishlistItem.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item removed from wishlist' });
  } catch (err) {
    console.error('Error removing wishlist item:', err.message);
    res.status(500).json({ message: 'Failed to remove item' });
  }
});

module.exports = router;
