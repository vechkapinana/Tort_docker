import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ClientStore from './store/ClientStore';
import ProductStore from './store/ProductStore';
// import { BasketProvider } from './BasketContext';
//import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    client: new ClientStore(),
    category: new ProductStore(),
    product: new ProductStore(),
    // basket: new ProductStore()
  }}>
    <App />
  </Context.Provider>  
  // document.getElementById('root')
);


