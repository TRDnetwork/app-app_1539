import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Add focus indicator for keyboard users
const style = document.createElement('style');
style.textContent = `
  :focus:not(:focus-visible) {
    outline: none;
  }
  .focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;
document.head.appendChild(style);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);