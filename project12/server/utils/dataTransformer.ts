import type { CsvRecord } from './csvParser';

export interface FormattedData {
  portNames: string[];
  data: {
    date: string;
    portName: string;
    utilization: number;
  }[];
}

export function transformCsvData(records: CsvRecord[]): FormattedData {
  const portNames = [...new Set(records.map(record => record['port name']))];
  
  const data = records.map(record => ({
    date: record.date,
    portName: record['port name'],
    utilization: parseFloat(record['utz%'])
  }));

  return { portNames, data };
}