import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        'Content-Type': 'application/jason',
      },
    };

    if (password !== confirmPassword) {
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setError('');
      }, 5000);
      return setError('Passwords do not match');
    }
    try {
      const { data } = await axios.post(
        '/auth/register',
        { username, email, password },
        config
      );
      navigate('/login');
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  return (
    <div className='register-container'>
      <div className='registerWrapper'>
        <div className='title'>Registration</div>

        <form onSubmit={registerHandler}>
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
              <label htmlFor='email' className='details'>
                Email
              </label>
              <input
                required
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <div className='input-box'>
              <label htmlFor='confirmPassword' className='details'>
                Confirm Password
              </label>
              <input
                required
                type='password'
                placeholder='Confirm your password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div className='profileAvatar'>
            <img src='/noAvatar.jpg' alt='' className='avatar' />
          </div>
          {error && <span className='error-message'>{error}</span>}
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
