import React, { useState, useEffect } from 'react';
import { StartScreen } from './StartScreen';
import windows_icon from '../Images/2N.jpg';
import { PiEyeClosedLight } from "react-icons/pi";
import { PiEye } from "react-icons/pi";
import { MdKeyboardBackspace } from "react-icons/md";
import computerData from '../Resources/computerData.json';
import { fadeLockScreen, slideStartScreen, getFullName } from '../utilites/helpers';
import './LockScreen.css';

const LockScreen = ({ isLoggedIn, setIsLoggedIn, bgImagePath }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [showLogin, setShowLogin] = useState(false);

  const checkPassword = () => {
    let isCorrect = password === computerData.password;
    if (isCorrect) {
      fadeLockScreen();
      setIsLoggedIn(true);
    }
    setPassword("");
  }

  useEffect(() => {
    const pressEnter = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        checkPassword();
      }
    }

    const loginInput = document.getElementById('login-input');
    loginInput?.addEventListener('keypress', pressEnter);

    return () => {
      loginInput?.removeEventListener('keypress', pressEnter);
    }
  });

  const goBack = () => {
    slideStartScreen();
    setShowPassword(false);
    setPassword("");
  }

  const loginScreen = () => {
    return (
      <div className="lock-screen" style={{"backgroundColor": computerData.mainColor, "color": computerData.textColor }}>
        <MdKeyboardBackspace id="lock-screen-back-btn" onClick={goBack}/>
        <div className="lock-screen-content">
          <div className="lock-screen-header">
            <div className="windows-logo-div">
              <img src={windows_icon} alt="Windows Logo" className="windows-logo" draggable="false" />
            </div>
            <h3 className="lock-screen-title">{getFullName()}</h3>
          </div>
          <div className="lock-screen-main">
            <div className="lock-screen-form">
              <input
                type={`${showPassword ? 'text' : 'password'}`}
                placeholder="Password"
                id="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
              <button className="visibility-toggle" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <PiEye /> : <PiEyeClosedLight />}</button>
              <button className="unlock-button" onClick={checkPassword}>⇥</button>
            </div>
            <p className='lock-screen-hint'>Hint: You love this</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='login-screen-container'>
      <StartScreen 
        bgImagePath={bgImagePath}
        onScreenClick={() => {
          slideStartScreen();
        }} />
      {loginScreen()}
    </div>
  );
};

export default LockScreen;
