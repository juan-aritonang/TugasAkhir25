import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '..', 'data');

router.get('/', async (req, res) => {
  try {
    const files = await fs.readdir(dataDir);
    const csvFiles = files.filter(file => file.endsWith('.csv'));
    res.json(csvFiles);
  } catch (error) {
    console.error('Error reading directory:', error);
    res.status(500).json({ error: 'Error reading directory' });
  }
});

export default router;