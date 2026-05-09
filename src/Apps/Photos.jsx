import React, { useState, useImperativeHandle, useMemo } from 'react';
import { MdKeyboardBackspace } from "react-icons/md";
import Img from '../Components/CustomImage';
import photos from '../Resources/photoData.json';
import './Photos.css';

export const PhotosApp = ({ref}) => {
  const [selectedPhotoKey, setSelectedPhotoKey] = useState("");
  const [showPhoto, setShowPhoto] = useState(false);

  const openPhoto = (photoKey) => {
    setSelectedPhotoKey(photoKey);
    setShowPhoto(true);
  }

  const parseRelativeDate = (dateStr) => {
    const now = new Date();
    const parts = dateStr.split(' ');
    const num = parseInt(parts[0]);
    const unit = parts[1];
    let date = new Date(now);
    if (unit.includes('year')) {
      date.setFullYear(date.getFullYear() - num);
    } else if (unit.includes('month')) {
      date.setMonth(date.getMonth() - num);
    } else if (unit.includes('week')) {
      date.setDate(date.getDate() - num * 7);
    } else if (unit.includes('day')) {
      date.setDate(date.getDate() - num);
    }
    return date;
  };

  useImperativeHandle(ref, () => {
    return {
      clearWindow() {
        setSelectedPhotoKey("");
        setShowPhoto(false);
      }
    };
  }, []);

  const uniqueDates = useMemo(() => [...new Set(Object.values(photos).map((photo) => photo.date))].sort((a, b) => parseRelativeDate(b) - parseRelativeDate(a)), []);

  return (
    <div className='photos-container'>
      <div className='photos-header-div'>
        <h1 id='photos-header'>PHOTOS</h1>
      </div>
      <div className='photos-sections-div'>
        {showPhoto && <PhotoModal setShowPhoto={setShowPhoto} photo={photos[selectedPhotoKey]} />}
        {photos && uniqueDates.map((date, dateIndex) => (
          <div key={dateIndex} className='photos-section'>
            <h3 id='photos-section-header'>{date.toLowerCase()}</h3>
            <div className='photos-list'>
              {Object.entries(photos).filter(([key, p]) => p.date === date).map(([photoKey, photo], index) => (
                <div key={index} className='photos-photo' onClick={() => openPhoto(photoKey)}>
                  <Img imageName={photo.photo} alt={photo.alt} title={photo.alt} draggable="false" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};

const PhotoModal = ({ photo, setShowPhoto }) => {
  return (
    <div className='photo-modal'>
      <MdKeyboardBackspace id="photo-x-icon" onClick={() => setShowPhoto(false)} />
      <Img imageName={photo.photo} alt={photo.alt} draggable="false" />
    </div>
  );
}