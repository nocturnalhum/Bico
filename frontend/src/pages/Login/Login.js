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

      localStorage.setItem('authToken', data.token);
      localStorage.setItem('username', username);
      navigate('/');
      window.location.reload(false);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  return (
    <div className='login-screen'>
      <form onSubmit={loginHandler} className='login-screen__form'>
        <div className='login-screen__title'>Login</div>
        {error && <span className='error-message'>{error}</span>}
        <div className='form-group'>
          <label htmlFor='username'>Username:</label>
          <input
            required
            type='text'
            id='username'
            placeholder='Enter your username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>
            Password:
            <Link
              to='/forgotpassword'
              className='login-screen__forgotPassword '
            >
              Forgot your password?
            </Link>
          </label>
          <input
            required
            type='password'
            id='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type='submit' className='btn btn-primary'>
          Login
        </button>
        <span className='login-screen__subtext'>
          Don't have an account?
          <Link to='/register' className='link'>
            Register
          </Link>
        </span>
      </form>
    </div>
  );
}
