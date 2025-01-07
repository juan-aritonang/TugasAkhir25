import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseCsvFile } from '../utils/csvParser.js';
import { transformCsvData } from '../utils/dataTransformer.js';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '..', 'data');

router.get('/:filename', async (req, res) => {
  try {
    const filePath = path.join(dataDir, req.params.filename);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    
    const records = await parseCsvFile(fileContent);
    const formattedData = transformCsvData(records);

    res.json(formattedData);
  } catch (error) {
    console.error('Error reading file:', error, req.params.filename);
    res.status(500).json({ error: 'Error reading file' });
  }
});

export default router;