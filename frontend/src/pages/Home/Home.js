import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css';

export default function Home() {
  const username = localStorage.getItem('username');
  console.log(username);
  return (
    <div className='home-container'>
      <h1>Home</h1>
      <h2>
        <Link to='/register'>Register</Link>
      </h2>
      {username && <h2>Welcome {username}</h2>}
    </div>
  );
}
