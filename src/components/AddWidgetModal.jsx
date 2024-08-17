import React, { useState } from 'react';

const AddWidgetModal = ({ isOpen, onRequestClose, onConfirm }) => {
  const [widgetName, setWidgetName] = useState('');
  const [chartLabels, setChartLabels] = useState('');
  const [chartValues, setChartValues] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    const labelsArray = chartLabels.split(',').map(label => label.trim());
    const valuesArray = chartValues.split(',').map(value => parseFloat(value.trim()));

    const newWidget = {
      id: Date.now().toString(),
      name: widgetName,
      type: 'pie',
      data: {
        labels: labelsArray,
        values: valuesArray,
      },
    };

    onConfirm(newWidget);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Add Pie Chart Widget</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Widget Name
          </label>
          <input
            type="text"
            value={widgetName}
            onChange={(e) => setWidgetName(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Chart Labels (comma separated)
          </label>
          <input
            type="text"
            value={chartLabels}
            onChange={(e) => setChartLabels(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Chart Values (comma separated)
          </label>
          <input
            type="text"
            value={chartValues}
            onChange={(e) => setChartValues(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onRequestClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetModal;
