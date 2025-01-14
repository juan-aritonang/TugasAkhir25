import { parse } from 'csv-parse';
import { logToFile } from './logger.js';

export async function parseCsvFile(fileContent) {
  const records = [];

  const parser = parse(fileContent, {
    columns: header => header.map(h => h.trim().replace(/^\uFEFF/, '')), // Trim and remove BOM
    skip_empty_lines: true
  });

  // Logging Start
  let loggedCount = 0;

  for await (const record of parser) {
    if (loggedCount < 1) {
      logToFile(`Raw Record: ${JSON.stringify(record)}`);
      loggedCount++;
    }
    records.push(record);
  }

  if (loggedCount > 0) {
    logToFile(`Displayed ${loggedCount} raw records`);
  }

  logToFile(`CSV parsed: ${records.length} records`);
  const sampleRecords = records.slice(0, 1);
  logToFile(`Sample Records: ${JSON.stringify(sampleRecords, null, 2)}`);
  
  // Logging End, Bisa dihapus

  return records;
}
