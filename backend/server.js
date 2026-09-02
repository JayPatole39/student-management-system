const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const aiRoutes = require('./routes/aiRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/ai', aiRoutes);

// Root Health Check Route
app.get('/', (req, res) => {
  res.json({
    status: 'Running',
    message: '🎓 Student Management System API is live and healthy!',
    version: '1.0.0'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🚀 SMS Backend Server running on http://localhost:${PORT}`);
  console.log(`📡 API Endpoints ready: /api/auth, /api/students, /api/ai`);
  console.log(`==================================================`);
});
