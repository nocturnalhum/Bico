import {
  bottomNavigationActionClasses,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
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
  const [style, setStyle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [bikeImage, setBikeImage] = useState('');
  const [open, setOpen] = useState(false);

  return (
    <div className='registerbike-screen'>
      <form className='registerbike-screen__form'>
        <div className='registerbike-screen__title'>Bike Registration</div>

        <RenderAvatar
          profilePicture={bikeImage}
          setProfilePicture={setBikeImage}
        />
        {/* =========<<< Bike Model >>>======================================== */}
        <div className='form-group'>
          <label htmlFor='bikeModel'>Bike Model: </label>
          <input
            required
            type='text'
            id='bikeModel'
            placeholder='Enter Bike Model'
            value={bikeModel}
            onChange={(e) => setBikeModel(e.target.vaule)}
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
            onChange={(e) => setManufacturer(e.target.vaule)}
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
            onChange={(e) => setSerialNum(e.target.vaule)}
          />
        </div>

        <div className='form-group__select'>
          {/* =========<<< Bike Colour Select >>>============================== */}
          <div className='form-group'>
            <InputLabel htmlFor='color' sx={{ color: 'black' }}>
              Bike Colour:{' '}
            </InputLabel>
            <FormControl sx={{ width: '95%' }}>
              <Select
                className='select'
                value={color}
                onChange={(e) => setColor(e.target.value)}
                displayEmpty
                // sx={{ background: 'white', textTransform: 'capitalize' }}
              >
                {colors.map((color) => {
                  return (
                    <MenuItem
                      key={color}
                      value={color}
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {color}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          {/* =========<<< Bike Style Select >>>=============================== */}
          <div className='form-group'>
            <InputLabel htmlFor='style' sx={{ color: 'black' }}>
              Bike Style:{' '}
            </InputLabel>
            <FormControl sx={{ width: '95%' }}>
              <Select
                className='select'
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                displayEmpty
                // sx={{ background: 'white', textTransform: 'capitalize' }}
              >
                {styles.map((style) => {
                  return (
                    <MenuItem
                      key={style}
                      value={style}
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {style}
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
