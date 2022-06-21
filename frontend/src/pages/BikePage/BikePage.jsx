import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './BikePage.css';

const BikePage = () => {
  const [bike, setBike] = useState({});
  const { bikeid } = useParams();
  const username = localStorage.getItem('username');

  useEffect(() => {
    (async function getBikeById() {
      const config = {
        header: {
          'Content-Type': 'application/json',
        },
      };
      const response = await Axios.get(
        `/bike/getbikebyid/${bikeid}`,
        {},
        config
      );
      setBike(response.data);
    })();
  }, [bikeid]);

  return (
    <div className='bikepage-container'>
      <img
        className='bikepage-image'
        src={bike.bikeImage}
        alt={bike.bikeModel}
      />
      <div
        className={`bikepage-item ${
          bike.status === 'found' ? 'found' : 'lost'
        }`}
      >
        <span className='label'>Status:</span> {bike.status}
      </div>
      <div className='bikepage-details'>
        <div className='bikepage-item'>
          <span className='label'>Manufacturer:</span> {bike.manufacturer}
        </div>
        <hr />
        <div className='bikepage-item'>
          <span className='label'>Bike Model:</span> {bike.bikeModel}
        </div>
        <hr />
        <div className='bikepage-item'>
          <span className='label'>Colour:</span> {bike.color}
        </div>
        <hr />
        <div className='bikepage-item'>
          <span className='label'>Bike Type:</span> {bike.bikeType}
        </div>
        <hr />
        <div className='bikepage-item'>
          <div className='bikepage-description'>
            <span className='label'>Description:</span>
          </div>
        </div>
        <div className='bikepage-item'>
          <p>{bike.description}</p>
        </div>
        <hr />
        {bike.username === username ? (
          <button className='btn btn-primary'>Edit</button>
        ) : (
          <button className='btn btn-primary'>
            <Link to='/messages'>Send Message</Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default BikePage;
