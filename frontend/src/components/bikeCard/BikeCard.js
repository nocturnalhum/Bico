import React from 'react';
import { Link } from 'react-router-dom';
import './BikeCard.css';

const Bikes = ({ bikes }) => {
  return (
    <div className='section-center'>
      {bikes.map((bike) => {
        const bikeImage = bike.bikeImage;
        return (
          <article className='bike-item' key={bike._id}>
            <Link to={`/bikepage/${bike._id}`}>
              <div className='bike-card-status'>status: {bike.status}</div>
              <div className='image-wrapper'>
                <img
                  className='bike-card-image'
                  src={bikeImage}
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
            </Link>
          </article>
        );
      })}
    </div>
  );
};

export default Bikes;
