import React from 'react';

interface PortSelectorProps {
  portNames: string[];
  selectedPort: string;
  disabled: boolean;
  onPortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function PortSelector({ portNames, selectedPort, disabled, onPortChange }: PortSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Nearend
      </label>
      <select
        className="w-full border border-gray-300 rounded-md shadow-sm p-2"
        value={selectedPort}
        onChange={onPortChange}
        disabled={disabled}
      >
        {portNames.map(port => (
          <option key={port} value={port}>{port}</option>
        ))}
      </select>
    </div>
  );
}