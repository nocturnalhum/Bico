import React, { useEffect, useState } from 'react';
import './home.css';
import Axios from 'axios';
import BikeCard from '../../components/bikeCard/BikeCard';

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
        <div className='grid-container'>
          {bikes.map((bike) => {
            return (
              <BikeCard className='grid-item' bike={bike} key={bike._id} />
            );
          })}
        </div>
      </div>
    </>
  );
}
