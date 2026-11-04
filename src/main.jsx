import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ProductosProvider } from './context/ProductosContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductosProvider>
          <App />
        </ProductosProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);