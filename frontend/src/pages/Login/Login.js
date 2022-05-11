import React from 'react';
import { Link } from 'react-router-dom';
import './login.css';

export default function Login() {
  return (
    <div className='login-container'>
      <div className='loginWrapper'>
        <div className='title'>Login</div>
        <form action='#'>
          <div className='form-details'>
            <div className='input-box'>
              <span className='details'>Username</span>
              <input required type='text' placeholder='Enter your username' />
            </div>

            <div className='input-box'>
              <span className='details'>Password</span>
              <input
                required
                type='password'
                placeholder='Enter your password'
              />
            </div>
          </div>

          <div className='button'>
            <input type='submit' value='Login' />
          </div>
          <div className='text'>
            <span className='login'>
              Don't have an account?
              <Link to='/register' className='link'>
                Register
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
