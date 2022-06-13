import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { EmailRounded, PedalBikeRounded } from '@mui/icons-material';
import { Settings, Logout } from '@mui/icons-material';
import { Avatar, Menu, MenuItem, ListItemIcon } from '@mui/material';
import { Divider, IconButton, Typography, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import { Link, useNavigate } from 'react-router-dom';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState({});
  const [firstLetter, setFirstLetter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    (async function getUser() {
      const config = {
        headers: {
          Authorization: localStorage.getItem('authToken'),
        },
      };
      try {
        const id = localStorage.getItem('id');
        const getUser = await Axios.get(`/auth/getuser/${id}`, config);
        setUser(getUser);
        setFirstLetter(getUser.data.username[0].toUpperCase());
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const logoutHandler = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload(false);
  };

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Typography sx={{ minWidth: 150 }}>
          <PedalBikeRounded
            sx={{ color: 'white', verticalAlign: 'middle', marginRight: '3px' }}
          />
          My Bikes
        </Typography>
        <Typography sx={{ minWidth: 100 }}>
          <EmailRounded
            sx={{ color: 'white', verticalAlign: 'middle', marginRight: '3px' }}
          />
          Messages
        </Typography>
        <Tooltip title='Account settings'>
          <IconButton
            onClick={handleClick}
            size='small'
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ background: 'orange', width: 32, height: 32 }}>
              {firstLetter ? firstLetter : null}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',

            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> Profile
        </MenuItem>

        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PedalBikeRounded fontSize='small' />
          </ListItemIcon>

          <Link to='/registerbike'>Register Bike</Link>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize='small' />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={logoutHandler}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
