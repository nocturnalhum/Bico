import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ImageUpload from './components/cropper/Cropper';
import Error from './pages/Error/Error';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import SharedLayout from './pages/SharedLayout/SharedLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/upload' element={<ImageUpload />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
