import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Changed to relative path
import './styles/main.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);