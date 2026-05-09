const express = require('express');
const router = express.Router();
const multer = require('multer');

// Configure multer for memory storage (for mock processing)
const upload = multer({ storage: multer.memoryStorage() });

// POST /api/ai/grade-image
router.post('/grade-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    // Mock AI Inference Logic
    const grades = [
      "Very good to buy",
      "Good to buy",
      "Better",
      "Quick to cook",
      "Not fair"
    ];
    
    // Simulate some delay for AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Randomize for mock purposes
    const randomGrade = grades[Math.floor(Math.random() * grades.length)];
    const randomScore = (Math.random() * (0.99 - 0.70) + 0.70).toFixed(2); // 0.70 to 0.99

    res.json({
      aiGrade: randomGrade,
      aiScore: parseFloat(randomScore),
      message: 'Mock image grading successful'
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error processing image' });
  }
});

module.exports = router;
