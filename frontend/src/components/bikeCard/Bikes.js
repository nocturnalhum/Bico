import React from 'react';
import './bikes.css';

const Bikes = ({ bikes }) => {
  return (
    <div className='section-center'>
      {bikes.map((bike) => {
        console.log(bike);
        return (
          <article className='bike-item' key={bike._id}>
            <div className='bike-card-status'>status: {bike.status}</div>
            <div className='image-wrapper'>
              <img
                className='bike-card-image'
                src={bike.bikeImage}
                alt={bike.bikeModel}
              />
            </div>

            <div className='bike-info'>
              <header>
                <h4>{bike.manufacturer}</h4>
                <h4>{bike.bikeModel}</h4>
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
