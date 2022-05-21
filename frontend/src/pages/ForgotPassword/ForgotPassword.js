import axios from 'axios';
import React, { useState } from 'react';
import './forgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const forgotPasswordHandler = async (event) => {
    event.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const { data } = await axios.post(
        '/api/auth/v1/forgotpassword',
        { email },
        config
      );
    } catch (error) {
      setError(error.response.data.error);
      setEmail('');
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };
  return (
    <div className='forgotpassword-container'>
      <form onSubmit={forgotPasswordHandler} className='forgotpassword-form'>
        <h3 className='forgotpassword-screen__title'>Forgot Password</h3>
        {error && <span className='error-message'>{error}</span>}
        {success && <span className='success-message'>{success}</span>}
        <div className='form-group'>
          <p className='forgotpassword-screen__subtext'>
            Please enter the email address you register your account with. We
            will send you reset password confirmation to this email
          </p>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            required
            id='email'
            placeholder='Email address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Send Email
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
