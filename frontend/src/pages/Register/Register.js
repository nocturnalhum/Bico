import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from '../../api/axios';
// import './register.css';
import RenderAvatar from '../../components/avatar/RenderAvatar';

// Start with lower/uppercase letter followed by 3~23 characters:
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// Password requires 1 lowercase 1 uppercase 1 digit 1 special character 3-24 characters long:
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// Email requiring "mail@example.com" format:
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const isValid = USER_REGEX.test(username);
    setValidName(isValid);
  }, [username]);

  useEffect(() => {
    const isValid = EMAIL_REGEX.test(email);
    setValidEmail(isValid);
  }, [email]);

  useEffect(() => {
    const isValid = PASSWORD_REGEX.test(password);
    setValidPassword(isValid);
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valid1 = USER_REGEX.test(username);
    const valid2 = USER_REGEX.test(email);
    const valid3 = USER_REGEX.test(password);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    if (!valid1 || !valid2 || !valid3) {
      setErrorMsg('Invalid Entry');
      return;
    }

    try {
      console.log(profilePicture);
      const response = await Axios.post(
        '/auth/register',
        JSON.stringify({ username, email, password, profilePicture }),
        config
      );
      console.log(response.data);
      console.log(response.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
    } catch (error) {
      if (!error?.response) {
        setErrorMsg('No Server Response');
      } else if (error.response?.status === 409) {
        setErrorMsg('Username Taken');
      } else {
        setErrorMsg('Registration Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {/* ==========<<< Success Field >>>========================*/}
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
          {/* ==========<<< Error Field >>>========================*/}
          <p
            ref={errRef}
            className={errorMsg ? 'errmsg' : 'offscreen'}
            aria-live='assertive'
          >
            {errorMsg}
          </p>
          <div className='form-title'>Registration</div>
          <hr></hr>
          <form onSubmit={handleSubmit}>
            {/* ==========<<< Username Field >>>===================== */}
            <div className='form-group'>
              <label htmlFor='username'>Username:</label>
              <span className='input-check'>
                <input
                  required
                  type='text'
                  id='username'
                  ref={userRef}
                  placeholder='Enter your username'
                  autoComplete='off'
                  aria-invalid={validName ? 'false' : 'true'}
                  aria-describedby='uidnote'
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <span className={validName ? 'valid' : 'hide'}>
                  {/* <ion-icon name='checkmark' /> */}
                  <ion-icon name='checkmark-circle-outline' />
                </span>
                <span className={validName || !username ? 'hide' : 'invalid'}>
                  <ion-icon name='close' />
                  {/* <ion-icon name='close-circle-outline'/> */}
                </span>
              </span>
              <p
                id='uidnote'
                className={
                  userFocus && username && !validName
                    ? 'hints flexStart'
                    : 'offscreen flexStart'
                }
              >
                <ion-icon name='information-circle-outline'></ion-icon>
                Must be 4 to 24 characters.
                <br />
                Must begin with a letter. <br />
                Letter, number, underscores, hyphens permitted.
              </p>
            </div>
            {/* ==========<<< Email Field >>>======================== */}
            <div className='form-group'>
              <label htmlFor='email'>Email:</label>
              <span className='input-check'>
                <input
                  required
                  type='email'
                  id='email'
                  placeholder='Enter your email'
                  aria-invalid={validEmail ? 'false' : 'true'}
                  aria-describedby='emailnote'
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className={validEmail ? 'valid' : 'hide'}>
                  {/* <ion-icon name='checkmark' /> */}
                  <ion-icon name='checkmark-circle-outline' />
                </span>
                <span className={validEmail || !email ? 'hide' : 'invalid'}>
                  <ion-icon name='close' />
                  {/* <ion-icon name='close-circle-outline'/> */}
                </span>
              </span>
              <p
                id='emailnote'
                className={
                  emailFocus && email && !validEmail
                    ? 'hints flexStart'
                    : 'offscreen flexStart'
                }
              >
                <ion-icon name='information-circle-outline'></ion-icon>
                Enter a valid email address.
              </p>
            </div>
            {/* ==========<<< Password Field >>>===================== */}
            <div className='form-group'>
              <label htmlFor='password'>Password:</label>
              <span className='input-check'>
                <input
                  required
                  type='password'
                  id='password'
                  placeholder='Enter your password'
                  aria-invalid={validPassword ? 'false' : 'true'}
                  aria-describedby='pwdnote'
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <span className={validPassword ? 'valid' : 'hide'}>
                  {/* <ion-icon name='checkmark' /> */}
                  <ion-icon name='checkmark-circle-outline' />
                </span>
                <span
                  className={validPassword || !password ? 'hide' : 'invalid'}
                >
                  <ion-icon name='close' />
                  {/* <ion-icon name='close-circle-outline'/> */}
                </span>
              </span>
              <p
                id='pwdnote'
                className={
                  passwordFocus && !validPassword
                    ? 'hints flexStart'
                    : 'offscreen flexStart'
                }
              >
                <ion-icon name='information-circle-outline'></ion-icon>
                <span>
                  Must be 8 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters, <br />
                  a number, and a special character. <br />
                  Allowed special characters: !@#$%
                </span>
              </p>
            </div>
            {/* ==========<<< Match Password Field >>>=============== */}
            <div className='form-group'>
              <label htmlFor='confirmPassword'>Confirm Password:</label>
              <span className='input-check'>
                <input
                  required
                  type='password'
                  id='confirmPassword'
                  placeholder='Confirm your password'
                  aria-invalid={validMatch ? 'false' : 'true'}
                  aria-describedby='confirmnote'
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                  onChange={(e) => setMatchPassword(e.target.value)}
                />
                <span
                  className={validMatch && matchPassword ? 'valid' : 'hide'}
                >
                  {/* <ion-icon name='checkmark' /> */}
                  <ion-icon name='checkmark-circle-outline' />
                </span>
                <span
                  className={validMatch || !matchPassword ? 'hide' : 'invalid'}
                >
                  <ion-icon name='close' />
                  {/* <ion-icon name='close-circle-outline'/> */}
                </span>
              </span>
              <p
                id='confirmnote'
                className={
                  matchFocus && !validMatch
                    ? 'hints flexStart'
                    : 'offscreen flexStart'
                }
              >
                <ion-icon name='information-circle-outline'></ion-icon>
                Passwords don't match.
              </p>
            </div>

            <RenderAvatar
              profilePicture={profilePicture}
              setProfilePicture={setProfilePicture}
              registrationType='profile'
            />
            {/* ==========<<< Submit Button >>>====================== */}
            <button
              className='btn btn-primary'
              disabled={
                !validName || !validPassword || !validMatch ? true : false
              }
            >
              Sign Up
            </button>
          </form>
          {/* ==========<<< Already Have Account >>>================= */}
          Already have an account?
          <Link to='/login' className='link'>
            Login
          </Link>
        </section>
      )}
    </>
  );
}
