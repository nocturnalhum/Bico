import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ImageUpload from './components/cropper/Cropper';
import Error from './pages/Error/Error';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import RegisterBike from './pages/RegisterBike/RegisterBike';
import PrivateRoute from './components/routing/PrivateRoute';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/passwordreset/:resetToken' element={<ResetPassword />} />
        <Route path='/upload' element={<ImageUpload />} />
        <Route
          path='/registerbike'
          element={
            <PrivateRoute>
              <RegisterBike />
            </PrivateRoute>
          }
        />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
