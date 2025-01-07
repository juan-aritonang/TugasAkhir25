import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { FileSelector } from './components/FileSelector';
import { PortSelector } from './components/PortSelector';
import { LoadingSpinner } from './components/LoadingSpinner';
import { UtilizationChart } from './components/UtilizationChart';
import { fetchFiles, fetchPortData } from './api/portData';
import type { DataPoint } from './types';

function App() {
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [portNames, setPortNames] = useState<string[]>([]);
  const [selectedPort, setSelectedPort] = useState<string>('');
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    const fileList = await fetchFiles();
    setFiles(fileList);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const filename = event.target.value;
    setSelectedFile(filename);
    
    if (filename) {
      setLoading(true);
      const data = await fetchPortData(filename);
      setPortNames(data.portNames);
      setChartData(data.data);
      setSelectedPort(data.portNames[0]);
      setLoading(false);
    }
  };

  const filteredData = chartData.filter(point => point.portName === selectedPort);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <FileText className="h-6 w-6" />
              Port Utilization Dashboard
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <FileSelector
              files={files}
              selectedFile={selectedFile}
              onFileChange={handleFileChange}
              onRefresh={loadFiles}
            />
            <PortSelector
              portNames={portNames}
              selectedPort={selectedPort}
              disabled={!selectedFile}
              onPortChange={(e) => setSelectedPort(e.target.value)}
            />
          </div>

          <div className="relative h-[60vh]">
            {loading ? (
              <LoadingSpinner />
            ) : (
              selectedFile && selectedPort && (
                <UtilizationChart
                  data={filteredData}
                  portName={selectedPort}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;