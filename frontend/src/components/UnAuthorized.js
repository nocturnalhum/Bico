import React from 'react';
import { useNavigate } from 'react-router-dom';

const UnAuthorized = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <section>
      <h1>UnAuthorized</h1>
      <br />
      <p>Cannot Access Requested Page</p>
      <div className='flexGrow'>
        <button onClick={goBack}>Previous Page</button>
      </div>
    </section>
  );
};

export default UnAuthorized;
