import React from 'react';
import './bikes.css';

const Bikes = ({ bikes }) => {
  return (
    <div className='section-center'>
      {bikes.map((bike) => {
        return (
          <article className='bike-item' key={bike._id}>
            <img
              className='bike-card-image'
              src={bike.bikeImage}
              alt={bike.bikeModel}
            />
            <div className='bike-info'>
              <header>
                <h4>Manufacturer: {bike.manufacturer}</h4>
                <h4>Model: {bike.bikeModel}</h4>
                <h5>Status: {bike.status}</h5>
              </header>
              <p className='bike-description'>{bike.description}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default Bikes;
