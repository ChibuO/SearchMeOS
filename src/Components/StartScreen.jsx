import React from 'react';
import './StartScreen.css';

export const StartScreen = ({onScreenClick, bgImagePath}) => {
  return (
    <div className='start-screen' onClick={onScreenClick} style={{"backgroundImage": `url(${bgImagePath})`}}>

    </div>
  )
}
