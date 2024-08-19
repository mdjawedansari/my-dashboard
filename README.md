# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# My Dashboard

![Screenshot](./src/assets/Screenshot%20(31).png)

![Screenshot](./src/assets/Screenshot%20(32).png)

![Screenshot](./src/assets/Screenshot%20(33).png)

## Description

My Dashboard is a modern, interactive dashboard application built with React, Redux, and various other libraries. It allows users to manage categories and widgets dynamically, including adding, removing, and customizing them. The dashboard uses Chart.js for data visualization and features a clean and responsive UI using Material-UI and Tailwind CSS.

## Features

- **Dynamic Category and Widget Management**: Add, remove, and modify categories and widgets.
- **Interactive Charts**: Visualize data using Pie charts provided by Chart.js.
- **Persistent Data Storage**: Save and load data using local storage for persistence across sessions.
- **Responsive Design**: Enjoy a seamless experience on both desktop and mobile devices.

## Live Demo

You can see the live version of the dashboard [here](https://my-dashboard-ashy.vercel.app/).

## Installation

To run this project locally, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/my-dashboard.git

   ```

2. **Navigate to the Project Directory**
   ```bash
   cd my-dashboard
   ```
3. **Install Dependencies**
   ```bash
   npm install
   ```
4. **Run the Development Server**
   ```bash
   npm run dev
   ```

## Usage

- Adding a Category: Click on "+ Add Category" to open the category modal.
  Enter the category name and confirm.

- Adding a Widget: Select a category and click on "+ Add Widget" to open the widget modal. Enter widget details and confirm.
- Managing Widgets: Use checkboxes to show or hide widgets within each category. Widgets can also be removed as needed.

## Dependencies

- React: A JavaScript library for building user interfaces.
- Redux: State management library.
- Chart.js: A charting library for data visualization.
- Material-UI: A React UI framework for building responsive UIs.
- Tailwind CSS: A utility-first CSS framework.
- Vite: A modern build tool for development and production.

## Dev Dependencies

- ESLint: A linting tool for identifying and fixing problems in JavaScript code.
- TypeScript: A typed superset of JavaScript for improved development.
- Vite Plugins: Plugins for integrating React, PostCSS, and Tailwind CSS

## Project Structure

- src/: Contains the source code for the application.

  - components/: Contains React components such as AddWidgetModal,
    AddCategoryModal, and Dashboard.
  - redux/: Contains Redux slice and store configuration.
  - utils/: Contains utility functions for handling local storage.

- public/: Contains static assets.

- index.html: The main HTML file.

- package.json: Defines project metadata and dependencies.

- vite.config.js: Vite configuration file.

## Redux Slice: dashboardSlice.js

The Redux slice manages the state for categories and widgets in the dashboard. It includes actions and reducers for adding/removing categories and widgets, and toggling widget visibility.

## Local Storage Utilities: utils/localStorage.js

Functions for saving and retrieving dashboard data from local storage to ensure persistence across sessions.

## getStoredData

Retrieves data from local storage, defaulting to an empty categories array if no data is found.

## setStoredData

Saves the current state to local storage

## Acknowledgments

- React: For the powerful and flexible library for building user interfaces.
- Redux: For state management.
- Chart.js: For easy data visualization.
- Material-UI: For UI components.
- Tailwind CSS: For utility-first styling.
- Vite: For fast and modern build tooling
