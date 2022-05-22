import React from 'react';
import './home.css';

export default function Home() {
  const username = localStorage.getItem('username');
  return (
    <div className='home-screen'>
      {username ? <h2>Welcome {username}</h2> : <h1>Home</h1>}
    </div>
  );
}
