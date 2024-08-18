import React, { useEffect, useState } from 'react';

const AddCategoryModal = ({ isOpen, onRequestClose, onConfirm }) => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    // Fetch data from localStorage
    const storedData = localStorage.getItem('dashboardData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setCategories(parsedData.categories || []);
    }
  }, [isOpen]); // Re-fetch data whenever the modal is opened

  const handleAddCategory = () => {
    const newCategory = {
      id: Date.now().toString(),
      name: categoryName,
      widgets: [],
    };

    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);

    // Update localStorage
    const updatedData = { categories: updatedCategories };
    localStorage.setItem('dashboardData', JSON.stringify(updatedData));

    // Pass the new category to the parent component if needed
    onConfirm(newCategory);

    // Clear the input field
    setCategoryName('');
  };

  if (!isOpen) return null; // Ensure the modal doesn't render when isOpen is false

  const handleCategoryClick = (id) => {
    setSelectedCategoryId(id);
  };

  const selectedCategory = categories.find(category => category.id === selectedCategoryId);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-2/5">
        

        <div>
          <h2 className="text-xl text-green-600 font-bold mb-4">Existing Categories</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`p-2 border rounded-lg ${selectedCategoryId === category.id ? 'bg-green-300' : 'bg-gray-200'}`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {selectedCategory && (
            <div>
              {/* <h2 className="text-xl text-green-600 font-bold mb-4">Widgets in {selectedCategory.name}</h2> */}
              <div>
                {selectedCategory.widgets.length > 0 ? (
                  selectedCategory.widgets.map((widget) => (
                    <div key={widget.id} className="mb-2 p-2 border rounded bg-gray-100">
                      {widget.name}
                    </div>
                  ))
                ) : (
                  <p>No widgets available for this category.</p>
                )}
              </div>
            </div>
          )}
        </div>
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
