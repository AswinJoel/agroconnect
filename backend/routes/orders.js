const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const authMiddleware = require('../middleware/auth');

// POST /api/orders (Requires Customer JWT)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { farmerId, items, totalAmount, deliveryAddress } = req.body;
    
    const newOrder = new Order({
      customerId: req.user.userId,
      farmerId,
      items,
      totalAmount,
      deliveryAddress,
      status: 'pending'
    });
    
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/orders/:id
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customerId', 'name phone')
      .populate('farmerId', 'farmName farmAddress')
      .populate('items.productId');
      
    if (!order) return res.status(404).json({ error: 'Order not found' });
    
    // Auth check: only customer who ordered, or farmer who received, or admin
    if (req.user.role !== 'admin' && 
        order.customerId._id.toString() !== req.user.userId && 
        order.farmerId._id.toString() !== req.user.userId) { // Note: using req.user.userId but order.farmerId._id might need separate check depending on user-farmer relation
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PATCH /api/orders/:id/status (Requires Farmer/Admin JWT)
router.patch('/:id/status', authMiddleware, async (req, res) => {
  if (req.user.role === 'customer') {
    return res.status(403).json({ error: 'Customers cannot update order status directly' });
  }

  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    
    if (!order) return res.status(404).json({ error: 'Order not found' });
    
    // In a real app, we'd emit a socket event here if socket.io is used for status updates
    // e.g. req.app.get('io').to(order.customerId.toString()).emit('orderStatusUpdated', order);

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/orders/:id/track
router.get('/:id/track', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).select('trackingCoords status');
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/orders/:id/location
router.post('/:id/location', authMiddleware, async (req, res) => {
  try {
    const { lat, lng } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, {
      trackingCoords: { lat, lng }
    }, { new: true });
    
    if (!order) return res.status(404).json({ error: 'Order not found' });
    
    // Emit real-time update via socket.io
    const io = req.app.get('io');
    if (io) {
      io.to(`order_${order._id}`).emit('locationUpdate', { lat, lng });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
