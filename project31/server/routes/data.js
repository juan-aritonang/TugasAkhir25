import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseCsvFile } from '../utils/csvParser.js';
import { transformCsvData } from '../utils/dataTransformer.js';
import { logToFile } from '../utils/logger.js';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '..', 'data');

router.get('/:filename', async (req, res) => {
  try {
    const filePath = path.join(dataDir, req.params.filename);
    logToFile(`Request received for file: ${req.params.filename}`);

    const fileContent = await fs.readFile(filePath, 'utf-8');
    logToFile(`File content loaded: ${filePath}`);

    const records = await parseCsvFile(fileContent);
    logToFile(`CSV parsed: ${records.length} records`);

    const formattedData = transformCsvData(records);
    logToFile(`Data transformed successfully for file: ${req.params.filename}`);

    res.json(formattedData);
  } catch (error) {
    logToFile(`Error processing file: ${req.params.filename} - ${error.message}`);
    res.status(500).json({ error: 'Error reading file', message: error.message });
  }
});

export default router;
