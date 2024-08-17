// utils/localStorage.js

export const getStoredData = () => {
    try {
      const data = localStorage.getItem('dashboardData');
      return data ? JSON.parse(data) : { categories: [] };
    } catch (e) {
      console.error('Failed to load data from localStorage', e);
      return { categories: [] }; // Return a default state
    }
  };
  
  export const setStoredData = (data) => {
    try {
      localStorage.setItem('dashboardData', JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save data to localStorage', e);
    }
  };
  