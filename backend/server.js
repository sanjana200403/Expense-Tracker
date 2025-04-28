require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db'); // your DB connection file

const authRoutes = require('./routes/authRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const expenseRoute = require('./routes/expenseRoute');
const dashboardRoute = require('./routes/dashboardRoute');

const app = express();

// CORS Middleware
app.use(cors());
app.get('/api/v1/test', (req, res) => {
  console.log('testing')
  res.json({ message: 'API is working perfectly!' });
});
// Logger Middleware (to show each request)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Body Parser Middleware
app.use(express.json());

// Static Files (for file uploads, if you have)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/income', incomeRoutes);
app.use('/api/v1/expense', expenseRoute);
app.use('/api/v1/dashboard', dashboardRoute);

// Start Server only after DB connection is successful
const PORT = 8000;

const startServer = async () => {
  try {
    await connectDB(); // Wait for DB connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to DB', err);
    process.exit(1); // Exit process with failure
  }
};

startServer();
