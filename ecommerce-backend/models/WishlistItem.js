const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // <-- Must match the model name used in Product.js
    required: true,
  },
});

module.exports = mongoose.model('WishlistItem', wishlistItemSchema);
