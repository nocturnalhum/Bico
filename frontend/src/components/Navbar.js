import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import AccountMenu from './AccountMenu';
import ClearIcon from '@mui/icons-material/Clear';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [click, setClick] = useState(false);

  const clickHandler = () => setClick(!click);

  const checkActive = ({ isActive }) => {
    return isActive ? 'link active nav-link' : 'link nav-link';
  };

  return (
    <nav className='navbar'>
      <div className='logo'>
        <img src='/logo4.svg' alt='' />
        <h3 className='logo-text'>Bico</h3>
      </div>

      <div className={click ? 'nav-links active' : 'nav-links'}>
        <NavLink to='/' className={checkActive} onClick={clickHandler}>
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
            <NavLink to='/login' className={checkActive} onClick={clickHandler}>
              <div className='menu-item'>
                <AccountCircleIcon sx={{ marginRight: '3px' }} />
                Sign In
              </div>
            </NavLink>
          </>
        )}
      </div>
      <div className='menu-icon' onClick={clickHandler}>
        {click ? <ClearIcon /> : <MenuIcon />}
      </div>
    </nav>
  );
};

export default Navbar;
