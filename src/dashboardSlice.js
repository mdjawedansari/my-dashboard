import { createSlice } from "@reduxjs/toolkit";
import { getStoredData, setStoredData } from "./utils/localStorage";

const initialState = {
  categories: getStoredData()?.categories || [],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    addWidget: (state, action) => {
      const { categoryId, widget } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        if (!category.widgets) {
          category.widgets = [];
        }
        if (!category.widgets.find((w) => w.id === widget.id)) {
          category.widgets.push({ ...widget, hidden: false }); // Set hidden to false by default
          setStoredData(state); // Update local storage
        }
      }
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        category.widgets = (category.widgets || []).filter(
          (widget) => widget.id !== widgetId
        );
        setStoredData(state); // Update local storage
      }
    },
    hideWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        const widget = category.widgets.find(
          (widget) => widget.id === widgetId
        );
        if (widget) {
          widget.hidden = true;
          setStoredData(state); // Update local storage
        }
      }
    },
    showWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        const widget = category.widgets.find(
          (widget) => widget.id === widgetId
        );
        if (widget) {
          widget.hidden = false;
          setStoredData(state); // Update local storage
        }
      }
    },
    addCategory: (state, action) => {
      const newCategory = action.payload;
      if (!state.categories.find((cat) => cat.id === newCategory.id)) {
        // Add the new category to the top
        state.categories = [newCategory, ...state.categories];
        setStoredData(state); // Update local storage
      }
    },
    removeCategory: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
      setStoredData(state); // Update local storage
    },
  },
});

export const {
  addWidget,
  removeWidget,
  hideWidget,
  showWidget,
  addCategory,
  removeCategory,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
