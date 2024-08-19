import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWidget, addCategory, removeCategory, removeWidget } from '../dashboardSlice';
import AddWidgetModal from './AddWidgetModal';
import AddCategoryModal from './AddCategoryModal';
import { Pie } from 'react-chartjs-2';
import { CgProfile } from 'react-icons/cg';
import { IoMdClose } from 'react-icons/io';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.dashboard.categories || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [isWidgetModalOpen, setIsWidgetModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);

  const openWidgetModal = (categoryId) => {
    setCurrentCategoryId(categoryId);
    setIsWidgetModalOpen(true);
  };

  const closeWidgetModal = () => {
    setIsWidgetModalOpen(false);
  };

  const openCategoryModal = () => {
    setIsCategoryModalOpen(true);
  };

  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false);
  };

  const handleAddWidget = (newWidget) => {
    if (currentCategoryId) {
      dispatch(addWidget({ categoryId: currentCategoryId, widget: newWidget }));
      closeWidgetModal();
    } else {
      console.error('No category ID selected');
    }
  };

  const handleAddCategory = (newCategory) => {
    dispatch(addCategory(newCategory));
    closeCategoryModal();
  };

  const handleRemoveCategory = (categoryId) => {
    dispatch(removeCategory(categoryId));
  };

  const handleRemoveWidget = (categoryId, widgetId) => {
    dispatch(removeWidget({ categoryId, widgetId }));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCategories = categories.map((category) => {
    const filteredWidgets = (category.widgets || []).filter(
      (widget) =>
        widget.name &&
        widget.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !widget.hidden // Only include widgets that are not hidden
    );
    return { ...category, widgets: filteredWidgets };
  });

  return (
    <div className="p-4 bg-[#F2F2F2] py-[36px] px-[45px] w-full">
      <div className="flex justify-between -ml-9 sm:-ml-0">
        <h1 className="text-lg md:text-2xl mr-4 sm:mr-0 text-green-600 font-bold cursor-pointer">
          CNAPP Dashboard
        </h1>
        <input
          type="text"
          placeholder="Search Widgets..."
          value={searchTerm}
          onChange={handleSearch}
          className="mb-4 p-2 border-[#CCCCCC] rounded-lg w-[350px] focus:outline-[#F2F2F2] border-[1px]"
        />
        <span><CgProfile className="text-4xl ml-4 sm:ml-0 text-green-600 cursor-pointer" /></span>
      </div>

      <div className="flex justify-end">
        <div className="mb-4 mt-4 p-2 pt-4 pb-4 bg-green-500 rounded-lg shadow-lg w-44 text-center">
          <button onClick={openCategoryModal}>+ Add Category</button>
        </div>
      </div>

      {filteredCategories.length === 0 ? (
        <p className="text-center text-gray-500">No categories available</p>
      ) : (
        filteredCategories.map((category) => (
          <div key={category.id} className="mb-6 mt-8 relative bg-[#CCCCCC] p-4 rounded-lg">
            <button
              onClick={() => handleRemoveCategory(category.id)}
              className="absolute top-2 right-2 text-red-500"
            >
              <IoMdClose className="text-xl" />
            </button>
            <h2 className="text-xl font-bold mb-4">{category.name}</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {category.widgets.length === 0 ? (
                <p className="text-center text-gray-500 w-full col-span-full">No widgets available</p>
              ) : (
                category.widgets.map((widget) => (
                  <div
                    key={widget.id}
                    className="p-4 pl-14 bg-white rounded-lg shadow-lg relative"
                  >
                    <button
                      onClick={() => handleRemoveWidget(category.id, widget.id)}
                      className="absolute top-2 right-2 text-red-500"
                    >
                      ✕
                    </button>
                    <h3 className="font-semibold text-lg mb-2">{widget.name}</h3>

                    {widget.type === 'pie' && (
                      <div className="w-1/2">
                        <Pie
                          data={{
                            labels: widget.data.labels,
                            datasets: [
                              {
                                data: widget.data.values,
                                backgroundColor: ['#FF6384', '#36A2EB', '#D1D5DB'],
                              },
                            ],
                          }}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: {
                                display: true,
                                position: 'right',
                              },
                            },
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
            <button
              onClick={() => openWidgetModal(category.id)}
              className="w-full mt-4 p-4 bg-gray-200 rounded-lg shadow-lg text-center flex items-center justify-center"
            >
              + Add Widget
            </button>
          </div>
        ))
      )}

      <AddWidgetModal
        isOpen={isWidgetModalOpen}
        onRequestClose={closeWidgetModal}
        onConfirm={handleAddWidget}
        categoryId={currentCategoryId}
      />

      <AddCategoryModal
        isOpen={isCategoryModalOpen}
        onRequestClose={closeCategoryModal}
        onConfirm={handleAddCategory}
      />
    </div>
  );
};

export default Dashboard;
