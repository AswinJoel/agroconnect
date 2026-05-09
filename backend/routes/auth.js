const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Mock OTP memory store
const otpStore = new Map();

// POST /api/auth/send-otp
router.post('/send-otp', async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: 'Phone number is required' });

  // Mock sending OTP
  const mockOtp = '123456';
  otpStore.set(phone, mockOtp);
  
  res.json({ message: 'OTP sent successfully (mocked as 123456)' });
});

// POST /api/auth/verify-otp
router.post('/verify-otp', async (req, res) => {
  const { phone, otp, name, role } = req.body;
  
  if (!phone || !otp) {
    return res.status(400).json({ error: 'Phone and OTP are required' });
  }

  const storedOtp = otpStore.get(phone);
  if (storedOtp !== otp) {
    return res.status(400).json({ error: 'Invalid OTP' });
  }

  otpStore.delete(phone); // Clear OTP

  try {
    let user = await User.findOne({ phone });
    
    if (!user) {
      if (!name) return res.status(400).json({ error: 'Name is required for new users' });
      // Create new user
      user = new User({ phone, name, role: role || 'customer' });
      await user.save();
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
