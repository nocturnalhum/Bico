import { Routes, Route } from 'react-router-dom';
import Error from './pages/Error/Error';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import RegisterBike from './pages/RegisterBike/RegisterBike';
// import ImageUpload from './components/cropper/Cropper';
// import Messages from './pages/Messages/Messages';
// import PrivateRoute from './components/routing/PrivateRoute';
// import Navbar from './components/Navigation/Navbar';
// import MyBikes from './pages/MyBikes/MyBikes';
// import BikePage from './pages/BikePage/BikePage';
// import { useEffect, useState } from 'react';
// import Axios from 'axios';
// import { Users } from './pages/Users/Users';
import Layout from './components/Layout/Layout';
import { RequireAuth } from './components/RequireAuth';
import Admin from './components/Admin/Admin';
import UnAuthorized from './components/UnAuthorized';

import LinkPage from './components/Admin/LinkPage';
import Editor from './components/Admin/Editor';
import Lounge from './components/Admin/Lounge';

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
        <Route path='linkpage' element={<LinkPage />} />

        {/* Protected: */}
        <Route element={<RequireAuth allowedRoles={[1010, 1111]} />}>
          <Route path='registerBike' element={<RegisterBike />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[1111]} />}>
          <Route path='admin' element={<Admin />} />
          <Route path='editor' element={<Editor />} />
          <Route path='lounge' element={<Lounge />} />
          {/* <Route path='users' element={<Users />} /> */}
        </Route>
        {/* Catch all */}
        <Route path='*' element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
