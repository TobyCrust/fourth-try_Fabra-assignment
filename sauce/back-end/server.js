const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const sessionConfig = require('./config/session');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5000',
  credentials: true
}));
app.use(express.json());
app.use(session(sessionConfig));

// Routes
app.use('/api', authRoutes);

// Start server
sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('Server running on port 5000');
  });
});