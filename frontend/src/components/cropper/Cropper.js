import React, { useContext, useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import ClearIcon from '@mui/icons-material/Clear';
import { Slider, Button, IconButton } from '@mui/material';
import { SnackbarContext } from '../snackbar/Snackbar';
import getCroppedImg from '../../utils/cropImage';
import { dataURLtoFile } from '../../utils/dataURLtoFile';
import './cropper.css';

const ImageUpload = ({ handleImageUpload }) => {
  const inputRef = useRef();

  const triggerFileSelectPopup = () => inputRef.current.click();

  const setStateSnackbarContext = useContext(SnackbarContext);

  const [image, setImage] = useState(null);
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onSelectFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener('load', () => {
        setImage(reader.result);
      });
    }
  };

  const onClear = () => {
    if (!image) {
      return setStateSnackbarContext(true, 'Please select an image', 'warning');
    }
    setImage(null);
  };

  const onUpload = async () => {
    if (!image) {
      return setStateSnackbarContext(true, 'Please select an image', 'warning');
    }

    const canvas = await getCroppedImg(image, croppedArea);
    const canvasDataUrl = canvas.toDataURL('image/jpeg');
    const convertedUrlToFile = dataURLtoFile(
      canvasDataUrl,
      'profile-image.jpeg'
    );
    console.log(convertedUrlToFile);

    try {
      const formdata = new FormData();
      formdata.append('croppedImage', convertedUrlToFile);

      const res = await fetch(
        'http://localhost:5000/api/v1/auth/setprofileimg',
        {
          method: 'POST',
          body: formdata,
        }
      );
      const res2 = await res.json();
      console.log(res2);
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div className='upload-screen'>
      <IconButton className='clear-container' onClick={handleImageUpload}>
        <ClearIcon className='clear-icon' />
      </IconButton>
      <div className='container-cropper'>
        {image ? (
          <>
            <div className='cropper'>
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className='slider'>
              <Slider
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e, zoom) => setZoom(zoom)}
                sx={{
                  color: '#3880ff',
                  '& .MuiSlider-thumb': {
                    height: 24,
                    width: 24,
                    backgroundColor: '#fff',
                    opacity: '80%',
                    border: '2px solid currentColor',
                    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                      boxShadow: 'inherit',
                    },
                  },
                }}
              />
            </div>
          </>
        ) : null}
      </div>
      <div className='container-buttons'>
        <input
          type='file'
          accept='image/*'
          ref={inputRef}
          style={{ display: 'none' }}
          onChange={onSelectFile}
        />
        <Button variant='contained' onClick={triggerFileSelectPopup}>
          Choose
        </Button>
        <Button variant='contained' onClick={onClear}>
          Clear
        </Button>
        <Button variant='contained' onClick={onUpload}>
          Upload
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
