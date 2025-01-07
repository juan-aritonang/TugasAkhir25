export interface DataPoint {
  date: string;  // matches 'tanggal' from backend
  portName: string;  // matches 'nearend' from backend
  utilization: number;  // matches 'utz(%)' from backend
}

export interface ChartData {
  portNames: string[];
  data: DataPoint[];
}

export interface ApiError {
  error: string;
  path?: string;
}