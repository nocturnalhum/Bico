import React, { useState } from 'react';
import GuestLinks from './GuestLinks';
import UserLinks from './UserLinks';
import './Navbar.css';
import Search from '../Search/Search';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [signedIn, setSignedIn] = useState(false);
  return (
    <>
      <header>
        <div className='title flexCenter'>
          <img src='/logo4.svg' alt='logo' />
          <h1 className='logo-text'>BiKo</h1>
        </div>
        <div className='search-bar flexCenter'>
          <Search placeholder='Enter Bike Manufacturer' />
        </div>
        <nav className='nav'>
          <div
            id='menu-icon'
            className='menu-icon flexCenter'
            tabIndex='0'
            aria-label='Menu button'
          >
            <ion-icon size='24px' name='menu-outline' />
          </div>
          <ul className='menu flexCenter'>
            <li
              className='menuItem flexCenter'
              tabIndex='0'
              aria-label='submenu home'
            >
              <ion-icon name='home-outline'></ion-icon>
              Home
            </li>
            <li className='menuItem flexCenter' tabIndex='0'>
              <ion-icon name='person-outline'></ion-icon>
              Account
              <ul className='subMenu'>
                <li
                  className='subItem flexCenter'
                  tabIndex='0'
                  aria-label='Sign in'
                >
                  <ion-icon name='log-in-outline'></ion-icon>
                  <NavLink to='/login'>sign in</NavLink>
                </li>
                <li
                  className='subItem flexCenter'
                  tabIndex='0'
                  aria-label='Register'
                >
                  <ion-icon name='pencil-outline' />
                  <NavLink to='/register'>register</NavLink>
                </li>
              </ul>
            </li>
          </ul>
          {/* {signedIn ? <UserLinks /> : <GuestLinks />} */}
        </nav>
      </header>
    </>
  );
};

export default Navbar;
