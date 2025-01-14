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
  const portNames = [...new Set(records.map(record => record['port_use']))]; // Map to actual field

  const data = records.map(record => ({
    date: record['tanggal'], // Map 'tanggal' to 'date'
    portName: record['port_use'], // Map 'port_use' to 'port name'
    utilization: parseFloat(record['utz(%)']), // Map 'utz(%)' to 'utz%'
  }));

  return { portNames, data };
}
