import React from 'react';
import { Link } from 'react-router-dom';
import './register.css';

export default function Register() {
  return (
    <div className='register'>
      <div className='registerWrapper'>
        <div className='title'>Registration</div>
        <form action='#'>
          <div className='form-details'>
            <div className='input-box'>
              <span className='details'>Username</span>
              <input required type='text' placeholder='Enter your username' />
            </div>
            <div className='input-box'>
              <span className='details'>Email</span>
              <input required type='email' placeholder='Enter your email' />
            </div>
            <div className='input-box'>
              <span className='details'>Password</span>
              <input
                required
                type='password'
                placeholder='Enter your password'
              />
            </div>
            <div className='input-box'>
              <span className='details'>Confirm Password</span>
              <input
                required
                type='password'
                placeholder='Confirm your password'
              />
            </div>
          </div>

          <div className='profileAvatar'>
            <img src='/noAvatar.jpg' alt='' className='avatar' />
          </div>
          <div className='button'>
            <input type='submit' value='Register' />
          </div>
          <div className='text'>
            <span className='login'>
              Already have an account?
              <Link to='/login' className='link'>
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
