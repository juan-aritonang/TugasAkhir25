import { parse } from 'csv-parse';
import type { Parser } from 'csv-parse';

export interface CsvRecord {
  date: string;
  'port name': string;
  'utz%': string;
}

export async function parseCsvFile(fileContent: string): Promise<CsvRecord[]> {
  const FIELD_MAP = {
    date: 'tanggal',
    'port name': 'port_use',
    'utz%': 'utz(%)',
  };

  const records: CsvRecord[] = [];
  const parser: Parser = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });

  for await (const record of parser) {
    // Map actual CSV fields to standard keys
    records.push({
      date: record[FIELD_MAP.date],
      'port name': record[FIELD_MAP['port name']],
      'utz%': record[FIELD_MAP['utz%']],
    });
  }

  return records;
}
