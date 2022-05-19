import React, { useState } from 'react';
import './avatar.css';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { Button, IconButton } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CameraIcon from '@mui/icons-material/Camera';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Link } from 'react-router-dom';

const RenderAvatar = () => {
  const [showCropper, setShowCropper] = useState(null);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className='avatar-container'>
      <div className='avatar'>
        <img src='/noAvatar.jpg' alt='' />
        <div className='camera-btn'>
          <IconButton
            ref={anchorRef}
            id='composition-button'
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup='true'
            onClick={handleToggle}
            sx={{ '&:hover': { backgroundColor: 'rgba(225, 225, 225, 0.0)' } }}
          >
            <div className='camera-icon'>
              <PhotoCameraIcon
                style={{
                  fontSize: '35px',
                  opacity: '100%',
                }}
              />
            </div>
          </IconButton>
        </div>
      </div>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement='bottom-start'
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id='composition-menu'
                  aria-labelledby='composition-button'
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleClose}>View</MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link to='/upload'>Change</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>Delete</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      {showCropper && <RenderAvatar />}
    </div>
  );
};

export default RenderAvatar;
