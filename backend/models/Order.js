const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Farmer', required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  deliveryAddress: { type: String, required: true },
  trackingCoords: {
    lat: { type: Number },
    lng: { type: Number }
  },
  paymentId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);
