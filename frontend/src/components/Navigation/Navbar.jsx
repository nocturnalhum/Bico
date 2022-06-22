import React from 'react';
import GuestLinks from './GuestLinks';
import UserLinks from './UserLinks';
import './Navbar.css';
import Search from '../Search/Search';

const Navbar = () => {
  return (
    <div className='navigation-container'>
      <nav>
        <div className='logo'>
          <img src='/logo4.svg' alt='' />
          <h3 className='logo-text'>Where Is My Bike?!</h3>
        </div>
        <div className='search'>
          <Search placeholder='Enter Bike Manufacturer' />
        </div>
        {localStorage.getItem('authToken') ? <UserLinks /> : <GuestLinks />}
      </nav>
    </div>
  );
};

export default Navbar;
