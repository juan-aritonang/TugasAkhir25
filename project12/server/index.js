import express from 'express';
import cors from 'cors';
import filesRouter from './routes/files.js';
import dataRouter from './routes/data.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/files', filesRouter);
app.use('/api/data', dataRouter);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});