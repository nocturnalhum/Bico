import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './navbar.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuListComposition from './MenuList';

const Navbar = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setUsername(localStorage.getItem('username'));
  }, [username]);

  const logoutHandler = () => {
    localStorage.clear();
    setUsername('');
    navigate('/');
    window.location.reload(false);
  };

  return (
    <nav className='navbar'>
      <div className='logo'>
        <img src='/logo4.svg' alt='' />
        <h3 className='logo-text'>Bico</h3>
      </div>
      <div className='navLinks'>
        <NavLink
          to='/'
          className={({ isActive }) =>
            isActive ? 'link active nav-link' : 'link nav-link'
          }
        >
          Home
        </NavLink>

        {localStorage.getItem('username') ? (
          <div className='menuList'>
            <MenuListComposition />
          </div>
        ) : (
          // <div className='sign-in' onClick={logoutHandler}>
          //   <AccountCircleIcon />
          //   Sign Out
          // </div>
          <>
            <NavLink
              to='/register'
              className={({ isActive }) =>
                isActive ? 'link active nav-link' : 'link nav-link'
              }
            >
              Register
            </NavLink>
            <NavLink
              to='/login'
              className={({ isActive }) =>
                isActive ? 'link active nav-link' : 'link nav-link'
              }
            >
              <div className='sign-in'>
                <AccountCircleIcon />
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
