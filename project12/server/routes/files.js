import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '..', 'data');

/**
 * Lists all available CSV files
 */
async function listCsvFiles() {
  const files = await fs.readdir(dataDir);
  return files.filter(file => file.endsWith('.csv'));
}

router.get('/', async (req, res, next) => {
  try {
    const csvFiles = await listCsvFiles();
    res.json(csvFiles);
  } catch (error) {
    next(error);
  }
});

export default router;