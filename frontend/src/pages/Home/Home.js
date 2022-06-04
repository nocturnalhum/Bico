import React, { useEffect, useState } from 'react';
import './home.css';
import Axios from 'axios';

export default function Home() {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    async function getBikes() {
      const response = await Axios.get('/bike');
      setBikes(response.data);
    }
    getBikes();
  }, []);

  return (
    <>
      <div className='home-screen'>
        <h1>Homes</h1>
        {bikes.map((bike) => {
          return (
            <div className='bike' key={bike._id}>
              <img src={bike.bikeImage} alt='' />
              <ul>
                <li>
                  <h2>Manufacturer: {bike.manufacturer}</h2>
                  <h3>Model: {bike.bikeModel}</h3>
                  <p>Description: {bike.description}</p>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
}
