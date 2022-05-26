import React, { useEffect, useRef, useState } from 'react';
import './avatar.css';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { IconButton } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Link } from 'react-router-dom';
import ImageUpload from '../cropper/Cropper';

const RenderAvatar = () => {
  const [showCropper, setShowCropper] = useState(false);
  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState('');
  const anchorRef = useRef(null);

  const handleImageUpload = () => {
    setShowCropper((prev) => !prev);
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

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className='avatar-screen'>
      <div className='avatar'>
        <img src={avatar ? avatar : '/noAvatar.jpg'} alt='' />
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
              <PhotoCameraIcon />
            </div>
          </IconButton>
        </div>
      </div>

      <Popper
        className='avatar-popper'
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
                  <MenuItem
                    onClick={(event) => {
                      handleImageUpload();
                      handleClose(event);
                    }}
                  >
                    Change
                  </MenuItem>
                  <MenuItem onClick={handleClose}>Delete</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      {showCropper && (
        <ImageUpload
          className='image-upload'
          handleImageUpload={handleImageUpload}
          setAvatar={setAvatar}
        />
      )}
    </div>
  );
};

export default RenderAvatar;
