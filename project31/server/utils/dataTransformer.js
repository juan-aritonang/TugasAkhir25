import { logToFile } from './logger.js';

export function transformCsvData(records) {
  const portNames = [...new Set(records.map(record => record['nearend']))];
  
  const data = records.map(record => {
    return {
      date: record['tanggal'],
      portName: record['nearend'],
      utilization: parseFloat(record['utz(%)'])
    };
  });

  // Logging, bisa dihapus
  logToFile(`Data transformed: ${JSON.stringify(data.slice(0, 1), null, 2)}...`);
  
  return { portNames, data };
}
