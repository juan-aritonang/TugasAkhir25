import { CSV_COLUMNS } from '../constants/csvColumns.js';

/**
 * Extracts unique port names from records
 */
function extractPortNames(records) {
  return [...new Set(records.map(record => record[CSV_COLUMNS.PORT_NAME]))];
}

/**
 * Transforms a single record into the required format
 */
function transformRecord(record) {
  return {
    date: record[CSV_COLUMNS.DATE],
    portName: record[CSV_COLUMNS.PORT_NAME],
    utilization: parseFloat(record[CSV_COLUMNS.UTILIZATION])
  };
}

/**
 * Transforms CSV records into chart-ready data
 */
export function transformCsvData(records) {
  const portNames = extractPortNames(records);
  const data = records.map(transformRecord);

  return { portNames, data };
}