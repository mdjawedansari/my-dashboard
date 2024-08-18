import { createSlice } from '@reduxjs/toolkit';
import { getStoredData, setStoredData } from './utils/localStorage';

const initialState = {
  categories: getStoredData()?.categories || [],
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
        // Check if widget is already added to prevent duplicates
        if (!category.widgets.find(w => w.id === widget.id)) {
          category.widgets.push(widget);
          setStoredData(state); // Update local storage
        }
      }
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        category.widgets = (category.widgets || []).filter(widget => widget.id !== widgetId);
        setStoredData(state); // Update local storage
      }
    },
    addCategory: (state, action) => {
      // Prevent adding duplicate categories
      if (!state.categories.find(cat => cat.id === action.payload.id)) {
        state.categories.push(action.payload);
        setStoredData(state); // Update local storage
      }
    },
    removeCategory: (state, action) => {
      state.categories = state.categories.filter(category => category.id !== action.payload);
      setStoredData(state); // Update local storage
    },
  },
});

export const { addWidget, removeWidget, addCategory, removeCategory } = dashboardSlice.actions;
export default dashboardSlice.reducer;
