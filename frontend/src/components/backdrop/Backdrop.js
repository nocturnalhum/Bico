import React, { createContext, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

export const BackdropContext = createContext();

export default function SimpleBackdrop({ children }) {
  const [open, setOpen] = useState(false);

  const closeBackdrop = () => {
    setOpen(false);
  };
  const showBackdrop = () => {
    setOpen(!open);
  };

  return (
    <BackdropContext.Provider value={{ closeBackdrop, showBackdrop }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      {children}
    </BackdropContext.Provider>
  );
}
