import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const LiWithNavLink = ({ children, to }) => {
  const { pathname } = useLocation();

  return (
    <li className={pathname === to ? 'active' : ''}>
      <NavLink to={to}>{children}</NavLink>
    </li>
  );
};

const Links = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload(false);
  };

  return (
    <ul className='dropdown-close'>
      <LiWithNavLink to='/'>
        <div className='link'>
          <span className='icon'>
            <ion-icon name='home-outline' />
          </span>
          <span className='text'>Home</span>
        </div>
      </LiWithNavLink>

      <div className='dropdown'>
        <button className='settings-icon'>
          <span className='icon'>
            <ion-icon name='settings-outline' />
          </span>
        </button>
        <div className='dropdown-menu'>
          <LiWithNavLink to='/messages'>
            <div className='link'>
              <span className='icon'>
                <ion-icon name='chatbubble-outline' />
              </span>
              <span className='message-count'>88</span>
              <span className='text'>Messages</span>
            </div>
          </LiWithNavLink>

          <LiWithNavLink to='/mybikes'>
            <div className='link'>
              <span className='icon'>
                <ion-icon name='bicycle-outline' />
              </span>
              <span className='text'>My Bikes</span>
            </div>
          </LiWithNavLink>
          <LiWithNavLink to='/registerbike'>
            <div className='link'>
              <span className='icon'>
                <ion-icon name='pencil-outline'></ion-icon>
              </span>
              <span className='text'>Register Bike</span>
            </div>
          </LiWithNavLink>
          <hr />
          <div className='link' onClick={logoutHandler}>
            <span className='icon'>
              <ion-icon name='person-outline' />
            </span>
            <span className='text'>Sign Out</span>
          </div>
        </div>
      </div>
    </ul>
  );
};

export default Links;
