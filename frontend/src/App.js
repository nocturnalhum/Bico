import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ImageUpload from './components/cropper/Cropper';
import Error from './pages/Error/Error';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Messages from './pages/Messages/Messages';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import RegisterBike from './pages/RegisterBike/RegisterBike';
import PrivateRoute from './components/routing/PrivateRoute';
import Navbar from './components/Navigation/Navbar';
import MyBikes from './pages/MyBikes/MyBikes';
import BikePage from './pages/BikePage/BikePage';
import { useEffect, useState } from 'react';
import Axios from 'axios';

function App() {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    (async function getBikes() {
      const config = {
        header: {
          'Content-Type': 'application/json',
        },
      };
      try {
        const response = await Axios.get('/bike/', {}, config);
        setBikes(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
    console.log(bikes);
  }, []);

  return (
    <main className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          {/* <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route
            path='/passwordreset/:resetToken'
            element={<ResetPassword />}
          /> */}
          {/* <Route path='/upload' element={<ImageUpload />} />
          <Route path='/messages' element={<Messages />} />
          <Route path='/mybikes' element={<MyBikes />} />
          <Route path='/bikepage/:bikeid' element={<BikePage />} /> */}

          {/* <Route
            path='/registerbike'
            element={
              <PrivateRoute>
                <RegisterBike />
              </PrivateRoute>
            }
          /> */}
          {/* <Route path='*' element={<Error />} /> */}
        </Routes>
      </Router>
    </main>
  );
}

export default App;
