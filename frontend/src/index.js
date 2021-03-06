import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import App from './App';
import RenderSnackbar from './components/snackbar/Snackbar';
import SimpleBackdrop from './components/backdrop/Backdrop';
import { BikeProvider } from './Context/BikeContext';
import { AuthProvider } from './Context/AuthProvider';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Router>
    <RenderSnackbar>
      <SimpleBackdrop>
        <BikeProvider>
          <AuthProvider>
            <Routes>
              <Route path='/*' element={<App />} />
            </Routes>
          </AuthProvider>
        </BikeProvider>
      </SimpleBackdrop>
    </RenderSnackbar>
  </Router>
  // </React.StrictMode>
);
