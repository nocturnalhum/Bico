import { Routes, Route } from 'react-router-dom';
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
import Layout from './components/Layout/Layout';
import UnAuthorized from './pages/UnAuthorized';
import { RequireAuth } from './components/RequireAuth';
import { Users } from './pages/Users/Users';

function App() {
  // const [bikes, setBikes] = useState([]);

  // useEffect(() => {
  //   (async function getBikes() {
  //     const config = {
  //       header: {
  //         'Content-Type': 'application/json',
  //       },
  //     };
  //     try {
  //       const response = await Axios.get('/bike/', {}, config);
  //       setBikes(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  //   console.log(bikes);
  // }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* Public: */}
        <Route path='/' element={<Home />} />
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='forgotPassword' element={<ForgotPassword />} />
        <Route path='resetPassword/:resetToken' element={<ResetPassword />} />
        <Route path='unauthorized' element={<UnAuthorized />} />

        {/* Protected: */}
        <Route element={<RequireAuth allowedRoles={[1010, 1111]} />}>
          <Route path='/registerBike' element={<RegisterBike />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[1111]} />}>
          <Route path='/users' element={<Users />} />
        </Route>
        {/* Catch all */}
        <Route path='*' element={<Error />} />
      </Route>
    </Routes>
    // <main className='App'>
    //     <Navbar />
    //     <Routes>
    //       <Route path='/' element={<Home />} />
    //       <Route path='/register' element={<Register />} />
    //       <Route path='/login' element={<Login />} />
    //       {/* <Route path='/forgotpassword' element={<ForgotPassword />} />
    //       <Route
    //         path='/passwordreset/:resetToken'
    //         element={<ResetPassword />}
    //       /> */}
    //       {/* <Route path='/upload' element={<ImageUpload />} />
    //       <Route path='/messages' element={<Messages />} />
    //       <Route path='/mybikes' element={<MyBikes />} />
    //       <Route path='/bikepage/:bikeid' element={<BikePage />} /> */}

    //       {/* <Route
    //         path='/registerbike'
    //         element={
    //           <PrivateRoute>
    //             <RegisterBike />
    //           </PrivateRoute>
    //         }
    //       /> */}
    //       {/* <Route path='*' element={<Error />} /> */}
    //     </Routes>
    // </main>
  );
}

export default App;
