import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import RenderAvatar from '../../components/avatar/RenderAvatar';
import './registerBike.css';
import { styles, colors, options } from './bikeData';

const RegisterBike = () => {
  const [bikeModel, setBikeModel] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [serialNum, setSerialNum] = useState('');
  const [color, setColor] = useState('');
  const [bikeType, setBikeType] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [bikeImage, setBikeImage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const registerBikeHandler = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        'Content-Type': 'application/jason',
      },
    };

    try {
      const { data } = await Axios.post(
        '/bike/registerbike',
        {
          manufacturer,
          bikeModel,
          serialNum,
          bikeImage,
          color,
          bikeType,
          description,
          status,
        },
        config
      );
      // console.log(data.data);
      setSuccess(data.data);
      navigate('/');
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  return (
    <div className='registerbike-screen'>
      <form
        onSubmit={registerBikeHandler}
        className='registerbike-screen__form'
      >
        {/* =========<<< Screen Title >>>====================================== */}
        <div className='registerbike-screen__title'>Bike Registration</div>
        {error && <span className='error-message'>{error}</span>}
        {success && (
          <span className='success-message'>
            {success} <Link to='/'>Login</Link>
          </span>
        )}

        {/* =========<<< Bike Status >>>======================================= */}
        <div className='form-group'>
          <TextField
            required
            className='bike-status'
            id='bike-status'
            select
            label='Bike Status'
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            helperText='Please select the current status of this bike'
            variant='standard'
            sx={{ color: 'red', textTransform: 'capitalize' }}
          >
            {options.map((option) => (
              <MenuItem
                key={option}
                value={option}
                sx={{ textTransform: 'capitalize' }}
              >
                {option}
              </MenuItem>
            ))}
          </TextField>
        </div>
        {/* =========<<< Bike Image >>>======================================== */}
        <div className='form-group'>
          <RenderAvatar
            profilePicture={bikeImage}
            setProfilePicture={setBikeImage}
          />
        </div>

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
            placeholder='Enter Serial Number'
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
                required
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
                      sx={{ textTransform: 'capitalize' }}
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
                required
                className='select type'
                value={bikeType}
                displayEmpty
                onChange={(e) => {
                  setBikeType(e.target.value);
                }}
              >
                {styles.map((type) => {
                  return (
                    <MenuItem
                      key={type}
                      value={type}
                      className='bike-menu-item'
                      sx={{ textTransform: 'capitalize' }}
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
              placeholder='Please do not include serial numbers or other information that you can use to confirm bike ownership ...'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        {/* =========<<< Register Bike Button >>>============================== */}

        <button type='submit' className='btn btn-primary'>
          Register Bike
        </button>
      </form>
    </div>
  );
};

export default RegisterBike;
