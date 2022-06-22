import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './register.css';
import RenderAvatar from '../../components/avatar/RenderAvatar';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState('/noAvatar.jpg');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('username');
    if (user) {
      navigate('/');
    }
  }, [navigate]);

  const registerHandler = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        'Content-Type': 'application/json',
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
      console.log(profilePicture);
      const { data } = await Axios.post(
        '/auth/register',
        { username, email, password, profilePicture },
        config
      );
      setSuccess(data.data);
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
        <hr></hr>
        {error && <span className='error-message'>{error}</span>}
        {success && (
          <span className='success-message'>
            {success} <Link to='/login'>Login</Link>
          </span>
        )}
        <div className='form-group'>
          <label htmlFor='username'>Username:</label>
          <input
            required
            type='text'
            id='username'
            placeholder='Enter your username'
            autoComplete='off'
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
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
        <RenderAvatar
          profilePicture={profilePicture}
          setProfilePicture={setProfilePicture}
          registrationType='profile'
        />

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
