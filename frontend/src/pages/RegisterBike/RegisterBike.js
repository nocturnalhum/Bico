import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import {
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grow,
  ClickAwayListener,
  Paper,
  Popper,
  MenuList,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
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

const options = ['Bike Status', 'Found', 'Lost', 'My Bike'];

const RegisterBike = () => {
  const [bikeModel, setBikeModel] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [serialNum, setSerialNum] = useState('');
  const [color, setColor] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(0);
  const [bikeImage, setBikeImage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleClick = () => {
    console.info(`You clicked ${options[status]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setStatus(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const registerBikeHandler = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        'Content-Type': 'application/jason',
      },
    };

    try {
      console.log(bikeImage);
      const { data } = await Axios.post(
        '/bike/registerbike',
        {
          bikeModel,
          manufacturer,
          serialNum,
          color,
          type,
          description,
          status,
          bikeImage,
        },
        config
      );
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
        {/* =========<<< Bike Image >>>======================================== */}
        <div className='form-group'>
          <RenderAvatar
            profilePicture={bikeImage}
            setProfilePicture={setBikeImage}
          />
        </div>

        {/* =========<<< Bike Status >>>======================================= */}
        <div className='form-group'>
          <ButtonGroup
            variant='contained'
            ref={anchorRef}
            aria-label='split button'
          >
            <Button onClick={handleClick}>{options[status]}</Button>
            <Button
              size='small'
              aria-controls={open ? 'split-button-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-label='select merge strategy'
              aria-haspopup='menu'
              onClick={handleToggle}
            >
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList id='split-button-menu' autoFocusItem>
                      {options.map((option, index) => (
                        <MenuItem
                          key={option}
                          selected={index === status}
                          onClick={(event) => handleMenuItemClick(event, index)}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
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
