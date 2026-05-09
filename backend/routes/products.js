const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const authMiddleware = require('../middleware/auth');

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const { category, aiGrade } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (aiGrade) filter.aiGrade = aiGrade;
    
    // Simplistic location filtering could go here, but omitted for brevity
    
    const products = await Product.find(filter).populate('farmerId', 'farmName rating');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('farmerId');
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/products (Requires Farmer JWT)
router.post('/', authMiddleware, async (req, res) => {
  if (req.user.role !== 'farmer') {
    return res.status(403).json({ error: 'Only farmers can add products' });
  }

  try {
    const newProduct = new Product({
      ...req.body,
      // Assume farmerId is passed in body or extracted from Farmer profile using req.user.userId
      // For simplicity, requiring it in body or assuming farmer profile lookup
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PATCH /api/products/:id
router.patch('/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'farmer') {
    return res.status(403).json({ error: 'Only farmers can edit products' });
  }
  
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
