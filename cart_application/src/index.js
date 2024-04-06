import React from 'react';
import ReactDOM from 'react-dom/client';
import Store from './script';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <Store />
  </React.StrictMode>
);

