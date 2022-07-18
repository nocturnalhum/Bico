import { useRef, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Axios from '../../api/axios';
import AuthContext from '../../components/Context/AuthProvider';

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const { setAuth } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMsg('');
  }, [username, password]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    try {
      const response = await Axios.post(
        '/auth',
        JSON.stringify({ username, password }),
        config
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const permissions = response?.data?.permissions;
      setUsername('');
      setPassword('');
      setSuccess(true);
    } catch (error) {
      if (!error?.response) {
        setErrorMsg('No Server Response');
      } else if (error.response?.status === 400) {
        setErrorMsg('Missing Username or password');
      } else if (error.response?.status === 401) {
        setErrorMsg('Unauthorized');
      } else {
        setErrorMsg('Sign In Failed');
      }
      errRef.current.focus();
    }
  };
  return (
    <>
      {success ? (
        <section>
          <h1>You are Logged In!</h1>
          <br />
          <p>
            <Link to='/'>Go to Home</Link>
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
          <h1>Sign In</h1>
          <form onSubmit={handleLogin}>
            <div className='form-group'>
              <label htmlFor='username'>Username:</label>
              <input
                type='text'
                id='username'
                ref={userRef}
                autoComplete='off'
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password:</label>
              <input
                type='password'
                id='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
            <button>Sign In</button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className='line'>
              <Link to='/register'>Register</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;
