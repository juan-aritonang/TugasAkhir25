import express from 'express';
import cors from 'cors';
import filesRouter from './routes/files.js';
import dataRouter from './routes/data.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/files', filesRouter);
app.use('/api/data', dataRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});