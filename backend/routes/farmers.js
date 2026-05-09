const express = require('express');
const router = express.Router();
const Farmer = require('../models/Farmer');
const authMiddleware = require('../middleware/auth');

// POST /api/farmers (Register farmer details)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const existing = await Farmer.findOne({ userId: req.user.userId });
    if (existing) {
      return res.status(400).json({ error: 'Farmer profile already exists' });
    }

    const newFarmer = new Farmer({
      ...req.body,
      userId: req.user.userId
    });
    
    const savedFarmer = await newFarmer.save();
    res.status(201).json(savedFarmer);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/farmers/nearby
router.get('/nearby', async (req, res) => {
  try {
    const { lat, lng, radius = 50 } = req.query; // radius in km
    
    if (!lat || !lng) {
      return res.status(400).json({ error: 'lat and lng are required' });
    }

    // Simplistic calculation (Not using MongoDB Geospatial indexing for simplicity unless configured)
    // For a real production app, use MongoDB $geoNear
    
    // We will return all for now, in a real app add geo query
    const farmers = await Farmer.find().populate('userId', 'name phone');
    res.json(farmers);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
