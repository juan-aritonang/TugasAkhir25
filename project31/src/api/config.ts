export const API_BASE_URL = 'http://localhost:3001';

export const API_ENDPOINTS = {
  files: '/api/files',
  data: (filename: string) => `/api/data/${filename}`,
} as const;