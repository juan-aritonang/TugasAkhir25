import { parse } from 'csv-parse';
import { CSV_COLUMNS } from '../constants/csvColumns.js';
import { logToFile } from './logger.js';

function validateCsvRecord(record) {
  const isValid = (
    record[CSV_COLUMNS.DATE] &&
    record[CSV_COLUMNS.PORT_NAME] &&
    record[CSV_COLUMNS.UTILIZATION]
  );
  return isValid;
}

export async function parseCsvFile(fileContent) {
  const records = [];
  // Logging Start, bisa dihapus
  let loggedFirstRawRecord = false;
  // Logging End

  const parser = parse(fileContent, {
    columns: header => header.map(h => h.trim().replace(/^\uFEFF/, '')),
    skip_empty_lines: true,
    trim: true
  });

  for await (const record of parser) {
    // Logging Start, bisa dihapus
    if (!loggedFirstRawRecord) {
      logToFile(`Raw Record (First): ${JSON.stringify(record)}`);
      loggedFirstRawRecord = true;
    }
    // Logging End
    if (validateCsvRecord(record)) {
      records.push(record);
    }
  }

  // Logging Start, bisa dihapus
  logToFile(`Parsed Records Count: ${records.length}`);
  logToFile(`Sample Records: ${JSON.stringify(records.slice(0, 1), null, 2)}`);
  // Logging End
  return records;
}
