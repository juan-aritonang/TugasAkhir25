import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseCsvFile } from '../utils/csvParser.js';
import { transformCsvData } from '../utils/dataTransformer.js';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '..', 'data');

/**
 * Reads and processes a CSV file
 */
async function processCsvFile(filename) {
  const filePath = path.join(dataDir, filename);
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const records = await parseCsvFile(fileContent);
  return transformCsvData(records);
}

router.get('/:filename', async (req, res, next) => {
  try {
    const data = await processCsvFile(req.params.filename);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

export default router;