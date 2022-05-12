import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const { data } = await axios.post(
        '/auth/login',
        { username, password },
        config
      );
      navigate('/');
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  return (
    <div className='login-container'>
      <div className='loginWrapper'>
        <div className='title'>Login</div>
        {error && <span className='error-message'>{error}</span>}
        <form onSubmit={loginHandler}>
          <div className='form-details'>
            <div className='input-box'>
              <label htmlFor='username' className='details'>
                Username
              </label>
              <input
                required
                type='text'
                placeholder='Enter your username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className='input-box'>
              <label htmlFor='password' className='details'>
                Password
              </label>
              <input
                required
                type='password'
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className='button'>
            <input type='submit' value='Login' />
          </div>
          <div className='text'>
            <span className='register'>
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
