import React from 'react';
import GuestLinks from './GuestLinks';
import UserLinks from './UserLinks';

import './Navbar.css';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import HomeIcon from '@mui/icons-material/Home';
// import AccountMenu from './AccountMenu';
// import ClearIcon from '@mui/icons-material/Clear';
// import MenuIcon from '@mui/icons-material/Menu';

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
        <div className='search'>
          <ion-icon name='search-outline' />
        </div>
        {localStorage.getItem('authToken') ? (
          <UserLinks />
        ) : (
          <GuestLinks></GuestLinks>
        )}
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
