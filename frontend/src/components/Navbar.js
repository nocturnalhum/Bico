import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './navbar.css';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import HomeIcon from '@mui/icons-material/Home';
// import AccountMenu from './AccountMenu';
// import ClearIcon from '@mui/icons-material/Clear';
// import MenuIcon from '@mui/icons-material/Menu';

const LiWithNavLink = ({ children, to }) => {
  const { pathname } = useLocation();

  return (
    <li className={pathname === to ? 'active' : ''}>
      <NavLink to={to}>{children}</NavLink>
    </li>
  );
};

const Navbar = () => {
  // const [click, setClick] = useState(false);

  // const clickHandler = () => setClick(!click);

  // const checkActive = ({ isActive }) => {
  //   return isActive ? 'link active nav-link' : 'link nav-link';
  // };

  return (
    <div className='navigation-container'>
      <nav>
        <div className='logo'>
          <img src='/logo4.svg' alt='' />
          <h3 className='logo-text'>Bico</h3>
        </div>
        <ul>
          <LiWithNavLink to='/'>
            <div className='link'>
              <span className='icon'>
                <ion-icon name='home-outline' />
              </span>
              <span className='text'>Home</span>
            </div>
          </LiWithNavLink>
          <LiWithNavLink to='/login'>
            <div className='link'>
              <span className='icon'>
                <ion-icon name='person-outline' />
              </span>
              <span className='text'>Sign In</span>
            </div>
          </LiWithNavLink>
        </ul>
      </nav>
    </div>
    // <nav className='navbar'>
    //   <div className='logo'>
    //     <img src='/logo4.svg' alt='' />
    //     <h3 className='logo-text'>Bico</h3>
    //   </div>

    //   <div className={click ? 'nav-links active' : 'nav-links'}>
    //     <NavLink to='/' className={checkActive} onClick={clickHandler}>
    //       <div className='menu-item'>
    //         <HomeIcon sx={{ marginRight: '3px' }} />
    //         Home
    //       </div>
    //     </NavLink>

    //     {localStorage.getItem('id') ? (
    //       <NavLink to='/login' className={checkActive} onClick={clickHandler}>
    //         <div className='menuList'>
    //           <AccountMenu />
    //         </div>
    //       </NavLink>
    //     ) : (
    //       <>
    //         <NavLink to='/login' className={checkActive} onClick={clickHandler}>
    //           <div className='menu-item'>
    //             <AccountCircleIcon sx={{ marginRight: '3px' }} />
    //             Sign In
    //           </div>
    //         </NavLink>
    //       </>
    //     )}
    //   </div>
    //   <div className='menu-icon' onClick={clickHandler}>
    //     {click ? <ClearIcon /> : <MenuIcon />}
    //   </div>
    // </nav>
  );
};

export default Navbar;
