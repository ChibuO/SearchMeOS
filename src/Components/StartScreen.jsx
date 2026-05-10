import React from 'react';
import './StartScreen.css';
import computerData from '../Resources/computerData.json';

export const StartScreen = ({onScreenClick, bgImagePath}) => {
  return (
    <div className='start-screen' onClick={onScreenClick} style={{"backgroundImage": `url(${bgImagePath})`}}>
      <div id="start-screen-text-div">
        <p id="start-screen-text" className="meta-font">{computerData.introText.join('')}</p>
      </div>
    </div>
  )
}
