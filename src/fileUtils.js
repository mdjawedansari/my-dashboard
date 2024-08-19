export const saveDashboardToLocalStorage = (dashboardState) => {
  localStorage.setItem("dashboardState", JSON.stringify(dashboardState));
};

export const loadDashboardFromLocalStorage = () => {
  const storedState = localStorage.getItem("dashboardState");
  return storedState ? JSON.parse(storedState) : null;
};
