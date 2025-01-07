import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseCsvFile } from '../utils/csvParser';
import { transformCsvData } from '../utils/dataTransformer';

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
    res.status(500).json({ error: 'Error reading file', message: error.message });
  }
});

export default router;