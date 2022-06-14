import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const LiWithNavLink = ({ children, to }) => {
  const { pathname } = useLocation();

  return (
    <li className={pathname === to ? 'active' : ''}>
      <NavLink to={to}>{children}</NavLink>
    </li>
  );
};

const Links = () => {
  return (
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
  );
};

export default Links;
