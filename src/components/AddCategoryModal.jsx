import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWidget, hideWidget, showWidget, addCategory } from '../dashboardSlice';

const AddCategoryModal = ({ isOpen, onRequestClose, onConfirm }) => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.dashboard.categories || []);
  const [categoryName, setCategoryName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [widgetStates, setWidgetStates] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (categories.length > 0) {
        const defaultCategoryId = categories[0].id;
        setSelectedCategoryId(defaultCategoryId);
        const defaultWidgets = categories.find(cat => cat.id === defaultCategoryId)?.widgets || [];
        setWidgetStates(defaultWidgets.reduce((acc, widget) => {
          acc[widget.id] = !widget.hidden; // Set initial checkbox state based on the widget's hidden state
          return acc;
        }, {}));
      }
    }
  }, [isOpen, categories]);

  const handleCategoryChange = (id) => {
    setSelectedCategoryId(id);
    const category = categories.find(cat => cat.id === id);
    if (category) {
      setWidgetStates(
        category.widgets.reduce((acc, widget) => {
          acc[widget.id] = !widget.hidden; // Set checkbox state based on widget's hidden state
          return acc;
        }, {})
      );
    }
  };

  const handleCheckboxChange = (widgetId) => {
    setWidgetStates(prevStates => {
      const newStates = { ...prevStates, [widgetId]: !prevStates[widgetId] };
      const category = categories.find(cat => cat.id === selectedCategoryId);
      if (category) {
        if (newStates[widgetId]) {
          dispatch(showWidget({ categoryId: selectedCategoryId, widgetId }));
        } else {
          dispatch(hideWidget({ categoryId: selectedCategoryId, widgetId }));
        }
      }
      return newStates;
    });
  };

  const handleAddCategory = () => {
    if (categoryName.trim() === '') return;

    const newCategory = {
      id: Date.now().toString(),
      name: categoryName,
      widgets: [],
    };

    dispatch(addCategory(newCategory));
    onConfirm(newCategory);
    setCategoryName('');
    setSelectedCategoryId(null);
    setWidgetStates({});
  };

  if (!isOpen) return null;

  const selectedCategory = categories.find(category => category.id === selectedCategoryId);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-2/5">
        <h2 className="text-xl text-green-600 font-bold mb-4">Existing Categories</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`p-2 border rounded-lg ${selectedCategoryId === category.id ? 'bg-green-300' : 'bg-gray-200'}`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {selectedCategory && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Widgets in {selectedCategory.name}</h3>
            {selectedCategory.widgets.map((widget) => (
              <div key={widget.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={!!widgetStates[widget.id]}
                  onChange={() => handleCheckboxChange(widget.id)}
                  className="mr-2"
                />
                <span>{widget.name}</span>
              </div>
            ))}
          </div>
        )}

        <h2 className="text-xl text-green-600 font-bold mb-4">Add New Category</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Category Name
          </label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            placeholder="Enter category name"
          />
        </div>
        <div className="flex justify-end space-x-2 mb-4">
          <button
            onClick={onRequestClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleAddCategory}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;
