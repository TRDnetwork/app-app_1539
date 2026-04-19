import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// PERF: Defer Framer Motion until needed — reduces initial bundle size
// It will be imported dynamically inside animated components
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);