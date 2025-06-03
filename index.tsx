import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/theme.css';
import { app, analytics } from './config/firebase';

// Declare global types for TypeScript
declare global {
  interface Window {
    firebaseApp?: any;
  }
  
  interface ImportMeta {
    env: Record<string, any>;
  }
}

// Initialize theme from localStorage or system preference
const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'light' || savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else {
    // Use system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const systemTheme = prefersDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', systemTheme);
  }
};

// Initialize theme before rendering
initializeTheme();

// Make Firebase instance available globally for debugging
if (import.meta.env.DEV) {
  window.firebaseApp = app;
}

// Create root and render app
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
