import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import RenderAvatar from '../../components/avatar/RenderAvatar';
import './registerBike.css';

const styles = [
  "child's bike",
  'electric',
  'hybrid',
  'mountain',
  'road',
  'scooter',
  'tricycle',
  'other',
];
const colors = [
  'black',
  'blue',
  'brown',
  'cyan',
  'green',
  'orange',
  'pink',
  'purple',
  'red',
  'silver',
  'white',
  'yellow',
  'other...',
];

const RegisterBike = () => {
  const [bikeModel, setBikeModel] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [serialNum, setSerialNum] = useState('');
  const [color, setColor] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [bikeImage, setBikeImage] = useState('');

  return (
    <div className='registerbike-screen'>
      <form className='registerbike-screen__form'>
        {/* =========<<< Screen Title >>>====================================== */}
        <div className='registerbike-screen__title'>Bike Registration</div>
        {/* =========<<< Bike Image >>>======================================== */}
        <div className='form-group'>
          <RenderAvatar
            profilePicture={bikeImage}
            setProfilePicture={setBikeImage}
          />
        </div>

        {/* =========<<< Bike Status >>>======================================= */}

        {/* =========<<< Bike Model >>>======================================== */}
        <div className='form-group'>
          <label htmlFor='bikeModel'>Bike Model: </label>
          <input
            required
            type='text'
            id='bikeModel'
            placeholder='Enter Bike Model'
            value={bikeModel}
            onChange={(e) => setBikeModel((prev) => e.target.value)}
          />
        </div>
        {/* =========<<< Manufacturer >>>====================================== */}
        <div className='form-group'>
          <label htmlFor='manufacturer'>Bike Manufacturer: </label>
          <input
            required
            type='text'
            id='manufacturer'
            placeholder='Enter Bike Manufacturer'
            value={manufacturer}
            onChange={(e) => setManufacturer((prev) => e.target.value)}
          />
        </div>
        {/* =========<<< Serial Number >>>===================================== */}
        <div className='form-group'>
          <label htmlFor='serialNum'>Serial Number: </label>
          <input
            required
            type='text'
            id='serialNum'
            placeholder='Enter Bike Manufacturer'
            value={serialNum}
            onChange={(e) => setSerialNum((prev) => e.target.value)}
          />
        </div>

        <div className='form-group__select'>
          {/* =========<<< Bike Colour Select >>>============================== */}
          <div className='form-group'>
            <InputLabel htmlFor='color' sx={{ color: 'black' }}>
              Bike Colour:{' '}
            </InputLabel>
            <FormControl sx={{ textTransform: 'capitalize' }}>
              <Select
                className='select color'
                value={color}
                onChange={(e) => setColor(e.target.value)}
                displayEmpty
              >
                {colors.map((color) => {
                  return (
                    <MenuItem
                      className='bike-menu-item'
                      key={color}
                      value={color}
                    >
                      {color}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          {/* =========<<< Bike Type Select >>>=============================== */}
          <div className='form-group'>
            <InputLabel htmlFor='type' sx={{ color: 'black' }}>
              Bike Type:{' '}
            </InputLabel>
            <FormControl sx={{ textTransform: 'capitalize' }}>
              <Select
                className='select type'
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                }}
                displayEmpty
              >
                {styles.map((type) => {
                  return (
                    <MenuItem
                      key={type}
                      value={type}
                      className='bike-menu-item'
                    >
                      {type}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </div>
        {/* =========<<< Description and Details >>>=========================== */}
        <div className='form-group '>
          <div className='description'>
            <label htmlFor='description'>Description: </label>
            <textarea
              type='text'
              id='description'
              placeholder='Provide description and details ...'
              value={description}
              onChange={(e) => setDescription(e.target.vaule)}
            />
          </div>
        </div>
        {/* =========<<< Register Bike Button >>>============================== */}

        <input
          type='submit'
          value='Register Bike'
          className='btn btn-primary'
        />
      </form>
    </div>
  );
};

export default RegisterBike;
