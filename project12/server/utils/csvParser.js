import { parse } from 'csv-parse';
import { CSV_COLUMNS } from '../constants/csvColumns.js';

/**
 * Validates if the CSV record has all required columns
 */
function validateCsvRecord(record) {
  return (
    record[CSV_COLUMNS.DATE] &&
    record[CSV_COLUMNS.PORT_NAME] &&
    record[CSV_COLUMNS.UTILIZATION]
  );
}

/**
 * Parses CSV content into records
 */
export async function parseCsvFile(fileContent) {
  const records = [];
  const parser = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  });

  for await (const record of parser) {
    if (validateCsvRecord(record)) {
      records.push(record);
    }
  }

  return records;
}