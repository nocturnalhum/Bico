import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from '../../api/axios';
import './register.css';
import RenderAvatar from '../../components/avatar/RenderAvatar';

// Start with lower/uppercase letter followed by 3~23 characters:
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// Password requires 1 lowercase 1 uppercase 1 digit 1 special character 3-24 characters long:
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default function Register() {
  // Username states:
  const [username, setUsername] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  // Email states:
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  // Password states:
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  // Match Password states:
  const [matchPassword, setMatchPassword] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  // Profile picture:
  const [profilePicture, setProfilePicture] = useState('/noAvatar.jpg');

  // Error and Success states:
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState('');

  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const config = {
  //     header: {
  //       'Content-Type': 'application/json',
  //     },
  //   };

  //   if (password !== matchPassword) {
  //     setPassword('');
  //     setMatchPassword('');
  //     setTimeout(() => {
  //       setErrorMsg('');
  //     }, 5000);
  //     return setErrorMsg('Passwords do not match');
  //   }
  //   try {
  //     console.log(profilePicture);
  //     const { data } = await Axios.post(
  //       '/auth/register',
  //       { username, email, password, profilePicture },
  //       config
  //     );
  //     setSuccess(data.data);
  //     navigate('/login');
  //   } catch (error) {
  //     setErrorMsg(error.response.data.error);
  //     setTimeout(() => {
  //       setErrorMsg('');
  //     }, 3000);
  //   }
  // };

  return (
    <>
      {success ? (
        <section>
          <h1>Registration Complete</h1>
          <p>
            <Link to='/login' className='link'>
              Sign In
            </Link>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errorMsg ? 'errmsg' : 'offscreen'}
            aria-live='assertive'
          >
            {errorMsg}
          </p>
          <div className='form__title'>Registration</div>
          <hr></hr>
          <form onSubmit={handleSubmit}>
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
                  value={matchPassword}
                  onChange={(e) => setMatchPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              className='btn btn-primary'
              disabled={
                !validName || !validPassword || !validMatch ? true : false
              }
            >
              Sign Up
            </button>
          </form>
        </section>
      )}
    </>
  );
}
