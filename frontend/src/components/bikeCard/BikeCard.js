import React from 'react';
import './bikecard.css';

const BikeCard = ({ bike }) => {
  return (
    <div className={`bike-card ${bike.status}`}>
      <div className='bike-card-top'>
        <img className='bike-card-image' src={bike.bikeImage} alt='' />
      </div>
      <div className='bike-card-body'>
        <h4>Manufacturer: {bike.manufacturer}</h4>
        <h4>Model: {bike.bikeModel}</h4>
        <p>Status: {bike.status}</p>
      </div>
    </div>
  );
};

export default BikeCard;
