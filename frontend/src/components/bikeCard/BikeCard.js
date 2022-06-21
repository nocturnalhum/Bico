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
              <div
                className={`bike-card-status ${
                  bike.status === 'found' ? 'found' : 'lost'
                }`}
              >
                status: {bike.status}
              </div>
              <div className='image-wrapper'>
                <img
                  className='bike-card-image'
                  src={bikeImage}
                  alt={bike.bikeModel}
                />
              </div>

              <div className='bike-info'>
                <header>
                  <div className='bikecard-item'>
                    {bike.manufacturer} - {bike.bikeModel}
                  </div>
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
