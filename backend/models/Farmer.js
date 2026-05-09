const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farmName: { type: String, required: true },
  farmAddress: { type: String, required: true },
  gpsCoords: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  verified: { type: Boolean, default: false },
  bankDetails: {
    accountNumber: String,
    ifscCode: String
  },
  rating: { type: Number, default: 0 }
});

module.exports = mongoose.models.Farmer || mongoose.model('Farmer', farmerSchema);
