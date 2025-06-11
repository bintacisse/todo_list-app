import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createTables } from './db.js';
import tasksRoutes from './routes/tasks.js';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
createTables().catch(err => {
  console.error('Failed to create tables:', err);
  process.exit(1);
});

// Routes
app.use('/api/tasks', tasksRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});