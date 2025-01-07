import { parse } from 'csv-parse';

export async function parseCsvFile(fileContent) {
  const records = [];
  const parser = parse(fileContent, {
    columns: true,
    skip_empty_lines: true
  });

  for await (const record of parser) {
    records.push(record);
  }

  return records;
}