import { createSlice } from '@reduxjs/toolkit';
import { getStoredData, setStoredData } from './utils/localStorage';

// Initialize the state from local storage or use a default value
const initialState = {
  categories: getStoredData()?.categories || [], // Ensure categories is always an array
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addWidget: (state, action) => {
      const { categoryId, widget } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        if (!category.widgets) {
          category.widgets = [];
        }
        category.widgets.push(widget); // Safe operation
        setStoredData(state); // Update local storage
      }
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        category.widgets = (category.widgets || []).filter(widget => widget.id !== widgetId); // Safe operation
        setStoredData(state); // Update local storage
      }
    },
    addCategory: (state, action) => {
      // Ensure state.categories is an array
      if (!Array.isArray(state.categories)) {
        state.categories = [];
      }
      state.categories.push(action.payload); // Safe operation
      setStoredData(state); // Update local storage
    },
    removeCategory: (state, action) => {
      // Ensure state.categories is an array
      if (!Array.isArray(state.categories)) {
        state.categories = [];
      }
      state.categories = state.categories.filter(category => category.id !== action.payload); // Safe operation
      setStoredData(state); // Update local storage
    },
  },
});

export const { addWidget, removeWidget, addCategory, removeCategory } = dashboardSlice.actions;
export default dashboardSlice.reducer;
