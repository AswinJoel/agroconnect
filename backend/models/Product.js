const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Farmer', required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  images: [{ type: String }],
  aiGrade: { type: String }, // e.g. "Very good to buy"
  aiScore: { type: Number }, // e.g. 0.98
  origin: {
    lat: { type: Number },
    lng: { type: Number }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
