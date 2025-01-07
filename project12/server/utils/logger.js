import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logFilePath = path.join(__dirname, 'app.log');

fs.writeFileSync(logFilePath, '', 'utf-8');

export function logToFile(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;

  fs.appendFileSync(logFilePath, logMessage, 'utf-8');
}
