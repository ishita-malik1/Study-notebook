import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StreaksProvider } from './context/StreaksContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <StreaksProvider>
        <App />
      </StreaksProvider>
    </BrowserRouter>
  </React.StrictMode>
);
