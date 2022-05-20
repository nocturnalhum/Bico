import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import AccountMenu from './AccountMenu';

const Navbar = () => {
  const checkActive = ({ isActive }) => {
    return isActive ? 'link active nav-link' : 'link nav-link';
  };

  return (
    <nav className='navbar'>
      <div className='logo'>
        <img src='/logo4.svg' alt='' />
        <h3 className='logo-text'>Bico</h3>
      </div>
      <div className='navLinks'>
        <NavLink to='/' className={checkActive}>
          <div className='menu-item'>
            <HomeIcon sx={{ marginRight: '3px' }} />
            Home
          </div>
        </NavLink>

        {localStorage.getItem('username') ? (
          <div className='menuList'>
            <AccountMenu />
          </div>
        ) : (
          <>
            <NavLink to='/register' className={checkActive}>
              Register
            </NavLink>
            <NavLink to='/login' className={checkActive}>
              <div className='menu-item'>
                <AccountCircleIcon sx={{ marginRight: '3px' }} />
                Sign In
              </div>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;