import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './login.css';
import { BackdropContext } from '../../components/backdrop/Backdrop';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { closeBackdrop, showBackdrop } = useContext(BackdropContext);

  useEffect(() => {
    const user = localStorage.getItem('id');
    if (user) {
      navigate('/');
    }
  }, [navigate]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    try {
      showBackdrop();
      const { data } = await Axios.post(
        '/auth/login',
        { username, password },
        config
      );
      localStorage.setItem('authToken', 'Bearer ' + data.token);
      localStorage.setItem('id', data.user._id);
      localStorage.setItem('username', data.user.username);

      closeBackdrop();
      navigate('/');
      window.location.reload(false);
    } catch (error) {
      closeBackdrop();
      setError(error.response.data.error);
      setTimeout(() => {
        setError('');
      }, 2000);
    }
  };

  return (
    <div className='login-screen'>
      <form onSubmit={loginHandler} className='login-screen__form'>
        <div className='login-screen__title'>Sign In</div>
        <hr></hr>
        {error && <span className='error-message'>{error}</span>}
        <div className='form-group'>
          <label htmlFor='username'>Username:</label>
          <input
            required
            type='text'
            id='username'
            placeholder='Enter your username'
            autoComplete='off'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            tabIndex={1}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>
            Password:
            <Link
              to='/forgotpassword'
              className='login-screen__forgotPassword '
              tabIndex={3}
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
            tabIndex={2}
          />
        </div>

        <button type='submit' className='btn btn-primary' tabIndex={4}>
          Login
        </button>
        <span className='login-screen__subtext'>
          Don't have an account?
          <Link to='/register' className='link' tabIndex={5}>
            Register
          </Link>
        </span>
      </form>
    </div>
  );
}
