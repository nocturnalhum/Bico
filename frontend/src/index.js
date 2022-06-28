import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import RenderSnackbar from './components/snackbar/Snackbar';
import SimpleBackdrop from './components/backdrop/Backdrop';
import { BikeProvider } from './components/Context/BikeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <RenderSnackbar> */}
    {/* <SimpleBackdrop> */}
    <BikeProvider>
      <App />
    </BikeProvider>
    {/* </SimpleBackdrop> */}
    {/* </RenderSnackbar> */}
  </React.StrictMode>
);
