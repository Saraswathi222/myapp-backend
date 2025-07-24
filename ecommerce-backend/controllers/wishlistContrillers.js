// controllers/wishlistController.js
const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    if (!userId || !productId) {
      return res.status(400).json({ error: 'Missing userId or productId' });
    }

    const wishlistItem = new WishlistItem({ userId, productId });
    await wishlistItem.save();

    res.status(201).json(wishlistItem);
  } catch (err) {
    console.error('Wishlist error:', err);
    res.status(500).json({ error: 'Server error while adding to wishlist' });
  }
};
