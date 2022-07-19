import { Outlet } from 'react-router-dom';
import Navbar from '../Navigation/Navbar';

const Layout = () => {
  return (
    <main className='App'>
      <Navbar />
      <Outlet />
    </main>
  );
};

export default Layout;
