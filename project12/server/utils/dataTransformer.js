import { CSV_COLUMNS } from '../constants/csvColumns.js';
import { logToFile } from './logger.js';

function extractPortNames(records) {
  const portNames = [...new Set(records.map(record => record[CSV_COLUMNS.PORT_NAME]))];
  logToFile(`Extracted Port Names: ${JSON.stringify(portNames)}`);
  return portNames;
}

function transformRecord(record, logFirstTransformed) {
  const transformed = {
    date: record[CSV_COLUMNS.DATE],
    portName: record[CSV_COLUMNS.PORT_NAME],
    utilization: parseFloat(record[CSV_COLUMNS.UTILIZATION])
  };
  
  // Logging Start, bisa dihapus
  if (logFirstTransformed.value) {
    logToFile(`Transformed Record (First): ${JSON.stringify(transformed)}`);
    logFirstTransformed.value = false;
  }
  // Logging End
  
  return transformed;
}

export function transformCsvData(records) {
  logToFile(`Starting transformation of ${records.length} records`);
  
  const portNames = extractPortNames(records);
  const logFirstTransformed = { value: true };
  const data = records.map(record => transformRecord(record, logFirstTransformed));

  // Logging Start, bisa dihapus
  logToFile(`Transformed Data Sample: ${JSON.stringify(data.slice(0, 1), null, 2)}`);
  logToFile(`Transformation complete. Total Ports: ${portNames.length}, Total Records: ${data.length}`);
  // Logging End
  
  return { portNames, data };
}
