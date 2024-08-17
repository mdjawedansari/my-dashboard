import { createSlice } from '@reduxjs/toolkit';
import dashboardData from './dashboardData.json';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: dashboardData,
  reducers: {
    addWidget: (state, action) => {
      const { categoryId, widget } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        category.widgets.push(widget);
      }
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter((widget) => widget.id !== widgetId);
      }
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    removeCategory: (state, action) => {
      state.categories = state.categories.filter((category) => category.id !== action.payload.categoryId);
    },
  },
});

export const { addWidget, removeWidget, addCategory, removeCategory } = dashboardSlice.actions;
export default dashboardSlice.reducer;
