const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');

// Add to cart
router.post('/add', async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // Check if product already in cart
    const existing = await CartItem.findOne({ userId, productId });
    if (existing) return res.status(400).json({ message: 'Already in cart' });

    const newItem = new CartItem({ userId, productId });
    await newItem.save();
    res.status(201).json({ message: 'Added to cart' });
  } catch (err) {
    console.error('Add to cart error:', err.message);
    res.status(500).json({ message: 'Failed to add to cart' });
  }
});

// Get cart items by user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const items = await CartItem.find({ userId }).populate('productId');
    res.json(items);
  } catch (err) {
    console.error('Fetch cart error:', err);
    res.status(500).json({ message: 'Failed to fetch cart' });
  }
});router.delete('/remove/:itemId', async (req, res) => {
  const { itemId } = req.params;
  try {
    await CartItem.findByIdAndDelete(itemId);
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Remove from cart error:', error.message);
    res.status(500).json({ message: 'Failed to remove item' });
  }
});

module.exports = router;
