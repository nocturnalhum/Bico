import React, { useState } from 'react';
import { useEffect } from 'react';
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
  const [click, setClick] = useState(false);
  const navigate = useNavigate();

  const clickHandler = () => {
    setClick((prev) => !prev);
  };

  const logoutHandler = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload(false);
  };

  useEffect(() => {
    const closeDropdown = (e) => {
      if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'ION-ICON') {
        setClick(false);
      }
    };
    document.body.addEventListener('click', closeDropdown);

    return () => document.body.removeEventListener('click', closeDropdown);
  }, []);

  return (
    <ul className='dropdown-close'>
      <LiWithNavLink to='/'>
        <div className='link' onClick={() => setClick(false)}>
          <span className='icon'>
            <ion-icon name='home-outline' />
          </span>
          <span className='text'>Home</span>
        </div>
      </LiWithNavLink>

      <div className='dropdown'>
        <button className='settings-icon' onClick={clickHandler}>
          {click ? (
            <ion-icon name='close-outline' />
          ) : (
            <ion-icon name='reorder-four-outline' />
          )}

          {/* {click ? (
            <ion-icon name='chevron-up-outline' />
          ) : (
            <ion-icon name='chevron-down-outline' />
          )} */}
        </button>
        <div className={click ? 'dropdown-menu open' : ' dropdown-menu'}>
          <LiWithNavLink to='/messages'>
            <div className='link' onClick={clickHandler}>
              <span className='icon'>
                <ion-icon name='chatbubble-outline' />
              </span>
              <span className='message-count'>88</span>
              <span className='text'>Messages</span>
            </div>
          </LiWithNavLink>

          <LiWithNavLink to='/mybikes'>
            <div className='link' onClick={clickHandler}>
              <span className='icon'>
                <ion-icon name='bicycle-outline' />
              </span>
              <span className='text'>My Bikes</span>
            </div>
          </LiWithNavLink>
          <LiWithNavLink to='/registerbike'>
            <div className='link' onClick={clickHandler}>
              <span className='icon'>
                <ion-icon name='pencil-outline'></ion-icon>
              </span>
              <span className='text'>Register Bike</span>
            </div>
          </LiWithNavLink>
          <hr />
          <div className='link' onClick={logoutHandler}>
            <span className='icon' onClick={clickHandler}>
              <ion-icon name='log-out-outline' />
            </span>
            <span className='text'>Sign Out</span>
          </div>
        </div>
      </div>
    </ul>
  );
};

export default Links;
