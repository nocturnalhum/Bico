import React, { createContext, useState } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export const SnackbarContext = createContext();

export default function RenderSnackbar({ children }) {
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    severity: '',
    message: '',
  });

  const setStateSnackbarContext = (open, message, severity) => {
    setSnackbarState({ ...snackbarState, open, message, severity });
  };

  const handleClose = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };

  const { open, severity, message } = snackbarState;

  return (
    <SnackbarContext.Provider value={setStateSnackbarContext}>
      <Stack spacing={10} sx={{ width: '100%' }}>
        <div>
          <Snackbar
            sx={{ top: '6vh' }}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity={severity}
              sx={{ width: '100%' }}
            >
              {message}
            </Alert>
          </Snackbar>
        </div>
      </Stack>
      {children}
    </SnackbarContext.Provider>
  );
}
