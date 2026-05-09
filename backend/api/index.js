const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('../routes/auth'));
app.use('/api/products', require('../routes/products'));
app.use('/api/orders', require('../routes/orders'));
app.use('/api/farmers', require('../routes/farmers'));
app.use('/api/chat', require('../routes/chat'));
app.use('/api/ai', require('../routes/ai'));

// Health check and root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'AgroConnect API is running!',
    version: '1.0.0',
    status: 'healthy',
    endpoints: [
      'GET /api/products',
      'POST /api/auth/send-otp',
      'POST /api/auth/verify-otp',
      'GET /api/farmers/nearby',
      'POST /api/orders',
      'GET /api/orders/:id',
      'POST /api/ai/grade-image',
      'POST /api/chat/message'
    ]
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

// Setup HTTP server for Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Attach Socket.io instance to app for use in routes
app.set('io', io);

// Socket.io connection logic (for live GPS tracking)
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Clients can join specific order rooms to get location updates
  socket.on('joinOrderTrack', (orderId) => {
    socket.join(`order_${orderId}`);
    console.log(`Socket ${socket.id} joined room order_${orderId}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// In a Vercel serverless environment, we export the Express app.
// Serverless functions don't stay alive to run `server.listen`.
// If running locally, we can listen.
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export the express app for Vercel
module.exports = app;
