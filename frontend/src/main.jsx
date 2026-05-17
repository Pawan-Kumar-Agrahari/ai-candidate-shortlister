import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { CandidateProvider } from './context/CandidateContext.jsx';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CandidateProvider>
      <App />
      <Toaster position="top-right" />
    </CandidateProvider>
  </React.StrictMode>,
);
