import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { MdKeyboardBackspace } from "react-icons/md";
import Img from '../Components/CustomImage';
import photos from '../Resources/photoData.json';
import './Photos.css';

export const PhotosApp = forwardRef((props, ref) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [showPhoto, setShowPhoto] = useState(false);

  const openPhoto = (index) => {
    setSelectedPhotoIndex(index);
    setShowPhoto(true);
  }

  useImperativeHandle(ref, () => {
    return {
      clearWindow() {
        setSelectedPhotoIndex(0);
        setShowPhoto(false);
      }
    };
  }, []);

  return (
    <div className='photos-container'>
      {showPhoto && <PhotoModal setShowPhoto={setShowPhoto} photo={photos[selectedPhotoIndex]} />}
      <div className='photos-header-div'>
        <h1 id='photos-header'>PHOTOS</h1>
      </div>
      <div className='photos-sections-div'>
        {photos && [...new Set(photos.map((photo) => photo.date))].map((date, index) => (
          <div key={index} className='photos-section'>
            <h3 id='photos-section-header'>{date.toLowerCase()}</h3>
            <div className='photos-list'>
              {photos.filter(p => p.date === date).map((photo, i) => (
                <div key={i} className='photos-photo' onClick={() => openPhoto(photo.id)}>
                  <Img imageName={photo.photo} alt={photo.alt} title={photo.alt} draggable="false" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
});

const PhotoModal = ({ photo, setShowPhoto }) => {
  return (
    <div className='photo-modal'>
      <MdKeyboardBackspace id="photo-x-icon" onClick={() => setShowPhoto(false)} />
      <Img imageName={photo.photo} alt={photo.alt} draggable="false" />
    </div>
  );
}