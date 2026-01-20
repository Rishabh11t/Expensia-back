
// // server.js
// // Entry point for the Express server



// import express from 'express';
// import cors from 'cors';
// import path from 'path';
// import dotenv from 'dotenv';
// import cookieParser from 'cookie-parser';
// import authRoutes from './routes/authRoutes.js';
// import budgetRoutes from './routes/budgetRoutes.js';
// import transactionRoutes from './routes/transactionRoutes.js';
// import auth from './middleware/authMiddleware.js';
// import connectDB from './config/db.js';

// dotenv.config();

// const app = express();
// app.use(cookieParser());
// const PORT = process.env.PORT || 5000;



// app.use(cors({
//   origin: [
//     'http://localhost:5173',
//     'https://personal-finance-manager-nine.vercel.app'
//   ],
//   credentials: true
// }));
// app.use(express.json());

// // API routes
// app.use('/api/auth', authRoutes);
// app.use('/api/budgets', auth, budgetRoutes);
// app.use('/api/transactions', auth, transactionRoutes);



// app.get('/', (req, res) => {
//   res.send('Server is running');
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes.js';
import budgetRoutes from './routes/budgetRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import auth from './middleware/authMiddleware.js';
import connectDB from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://expensia-eight.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.options("*", cors());

// Routes
app.get('/', (req, res) => {
  res.send('Server is running 🚀');
});

app.use('/api/auth', authRoutes);
app.use('/api/budgets', auth, budgetRoutes);
app.use('/api/transactions', auth, transactionRoutes);

// 🔑 START SERVER ONLY AFTER DB CONNECTS
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
