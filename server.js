
// server.js
// Entry point for the Express server



import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import budgetRoutes from './routes/budgetRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import auth from './middleware/authMiddleware.js';
import connectDB from './config/db.js';

dotenv.config();

const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://personal-finance-manager-nine.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/budgets', auth, budgetRoutes);
app.use('/api/transactions', auth, transactionRoutes);



app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
