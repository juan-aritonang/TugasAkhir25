import { parse } from 'csv-parse';
import type { Parser } from 'csv-parse';

export interface CsvRecord {
  date: string;
  'port name': string;
  'utz%': string;
}

export async function parseCsvFile(fileContent: string): Promise<CsvRecord[]> {
  const records: CsvRecord[] = [];
  const parser: Parser = parse(fileContent, {
    columns: true,
    skip_empty_lines: true
  });

  for await (const record of parser) {
    records.push(record);
  }

  return records;
}