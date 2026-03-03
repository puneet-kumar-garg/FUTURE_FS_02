import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from '../server/src/routes/auth.js';
import leadRoutes from '../server/src/routes/leads.js';

const app = express();

app.use(cors());
app.use(express.json());

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URI);
  isConnected = true;
};

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

export default app;
