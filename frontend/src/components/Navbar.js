import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='logo'>
        <img src='/logo4.svg' alt='' />
        <h3 className='logo-text'>Bico</h3>
      </div>
      <div className='navLinks'>
        <NavLink
          to='/'
          className={({ isActive }) => (isActive ? 'link active' : 'link')}
        >
          Home
        </NavLink>
        <NavLink
          to='/register'
          className={({ isActive }) => (isActive ? 'link active' : 'link')}
        >
          Register
        </NavLink>

        <NavLink
          to='/login'
          className={({ isActive }) => (isActive ? 'link active' : 'link')}
        >
          <div className='sign-in'>
            <AccountCircleIcon />
            Sign In
          </div>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
