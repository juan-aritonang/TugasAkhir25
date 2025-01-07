import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import type { DataPoint } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface UtilizationChartProps {
  data: DataPoint[];
  portName: string;
}

export function UtilizationChart({ data, portName }: UtilizationChartProps) {
  // Sort data by date to ensure proper line chart display
  const sortedData = [...data].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Port Utilization - ${portName}`,
        font: {
          size: 16,
          weight: 'bold'
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Utilization %'
        },
        min: 0,
        max: 100
      },
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      }
    }
  };

  const chartData = {
    labels: sortedData.map(point => point.date),
    datasets: [
      {
        label: 'Utilization %',
        data: sortedData.map(point => point.utilization),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

  return <Line options={chartOptions} data={chartData} />;
}