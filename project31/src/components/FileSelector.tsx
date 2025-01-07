import React from 'react';
import { RefreshCcw } from 'lucide-react';

interface FileSelectorProps {
  files: string[];
  selectedFile: string;
  onFileChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onRefresh: () => void;
}

export function FileSelector({ files, selectedFile, onFileChange, onRefresh }: FileSelectorProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-gray-700">
          Select CSV File
        </label>
        <button
          onClick={onRefresh}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          <RefreshCcw className="h-4 w-4" />
          Refresh
        </button>
      </div>
      <select
        className="w-full border border-gray-300 rounded-md shadow-sm p-2"
        value={selectedFile}
        onChange={onFileChange}
      >
        <option value="">Choose a file...</option>
        {files.map(file => (
          <option key={file} value={file}>{file}</option>
        ))}
      </select>
    </div>
  );
}