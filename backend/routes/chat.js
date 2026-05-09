const express = require('express');
const router = express.Router();
const ChatSession = require('../models/ChatSession');
const authMiddleware = require('../middleware/auth');
const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

// POST /api/chat/message
router.post('/message', authMiddleware, async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ error: 'Message content is required' });

    let session = await ChatSession.findOne({ userId: req.user.userId });
    
    if (!session) {
      session = new ChatSession({
        userId: req.user.userId,
        messages: []
      });
    }

    // Add user message
    session.messages.push({ role: 'user', content });

    // Prepare messages for Claude API
    const apiMessages = session.messages.map(m => ({
      role: m.role,
      content: m.content
    })).slice(-10); // keep last 10 messages for context

    const systemPrompt = "You are AgroConnect's friendly assistant. Help users with: tracking orders, finding fresh produce, understanding AI freshness grades, payment issues, and connecting with farmers.";

    const message = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 1024,
      system: systemPrompt,
      messages: apiMessages
    });

    const assistantResponse = message.content[0].text;

    // Add assistant response to DB
    session.messages.push({ role: 'assistant', content: assistantResponse });
    await session.save();

    res.json({ response: assistantResponse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error with Chat AI' });
  }
});

// GET /api/chat/history
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const session = await ChatSession.findOne({ userId: req.user.userId });
    res.json(session ? session.messages : []);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
