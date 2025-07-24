const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).populate('productId');
    res.json(orders);
  } catch (err) {
    console.error('Fetch orders failed:', err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

router.post('/place', async (req, res) => {
  const { userId, productId, size, quantity } = req.body;

  try {
    const newOrder = new Order({ userId, productId, size, quantity });
    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to place order' });
  }
});

module.exports = router;
