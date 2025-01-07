export interface DataPoint {
  date: string;
  portName: string;
  utilization: number;
}

export interface ChartData {
  portNames: string[];
  data: DataPoint[];
}

export interface ApiError {
  error: string;
}