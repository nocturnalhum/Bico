import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.css';
import RenderAvatar from '../../components/avatar/Avatar';

export default function Register() {
  const [username, setUsername] = useState(
    localStorage.getItem('usernameStore')
  );
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

      localStorage.setItem('authToken', data.token);
      localStorage.setItem('username', username);

      navigate('/login');
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  return (
    <div className='register-screen'>
      <form onSubmit={registerHandler} className='register-screen__form'>
        <div className='register-screen__title'>Registration</div>
        {error && <span className='error-message'>{error}</span>}
        <div className='form-group'>
          <label htmlFor='username'>Username:</label>
          <input
            required
            type='text'
            id='username'
            placeholder='Enter your username'
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              localStorage.setItem('usernameStore', e.target.value);
            }}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input
            required
            type='email'
            id='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password:</label>
          <input
            required
            type='password'
            id='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='confirmPassword'>Confirm Password:</label>
          <input
            required
            type='password'
            id='confirmPassword'
            placeholder='Confirm your password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <RenderAvatar />

        <button type='submit' className='btn btn-primary'>
          Register
        </button>

        <span className='register-screen__subtext'>
          Already have an account?
          <Link to='/login' className='link'>
            Login
          </Link>
        </span>
      </form>
    </div>
  );
}
