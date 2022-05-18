import React, { useRef, useState } from 'react';
import './imageUpload.css';
import Cropper from 'react-easy-crop';
import { Slider, Button } from '@mui/material';
import { generateDownload } from '../utils/cropImage';

const ImageUpload = () => {
  const inputRef = useRef();

  const triggerFileSelectPopup = () => inputRef.current.click();

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

  return (
    <div className='upload-container'>
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
        <Button
          sx={{ width: '120px' }}
          variant='contained'
          onClick={triggerFileSelectPopup}
        >
          Choose
        </Button>
        <Button sx={{ width: '120px' }} variant='contained'>
          Download
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
