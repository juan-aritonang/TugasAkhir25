import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from './config';
import type { ChartData } from '../types';

export const fetchFiles = async (): Promise<string[]> => {
  try {
    const response = await axios.get<string[]>(`${API_BASE_URL}${API_ENDPOINTS.files}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching files:', error);
    return [];
  }
};

export const fetchPortData = async (filename: string): Promise<ChartData> => {
  try {
    const response = await axios.get<ChartData>(
      `${API_BASE_URL}${API_ENDPOINTS.data(filename)}`
    );
    
    // Validate response data
    if (!response.data || !Array.isArray(response.data.portNames) || !Array.isArray(response.data.data)) {
      throw new Error('Invalid data format received from server');
    }
    
    return response.data;
  } catch (error) {
    console.error('Error fetching port data:', error);
    return { portNames: [], data: [] };
  }
};