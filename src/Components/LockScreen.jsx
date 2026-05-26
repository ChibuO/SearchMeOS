import React, { useState } from 'react';
import { StartScreen } from './StartScreen';
import { ProfileIcon } from './ProfileIcon';
import { PiEyeClosedLight } from "react-icons/pi";
import { PiEye } from "react-icons/pi";
import { MdKeyboardBackspace } from "react-icons/md";
import computerData from '../Resources/computerData.json';
import { PasswordForm } from './PasswordForm';
import { fadeLockScreen, slideStartScreen, getFullName, compareStrings } from '../utilities/helpers';
import './LockScreen.css';

const LockScreen = ({ isLoggedIn, setIsLoggedIn, bgImagePath }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [showLogin, setShowLogin] = useState(false);

  const checkPassword = (entry) => {
    let isCorrect = compareStrings(entry, computerData.password);
    if (isCorrect) {
      fadeLockScreen();
      setIsLoggedIn(true);
    }
  }

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
            <ProfileIcon size={70} img={computerData.profileImagePath}/>
            <h3 className="lock-screen-title bold-font">{getFullName()}</h3>
          </div>
          <PasswordForm handlePassword={checkPassword} inputId={'computer-login'} hint={computerData.hint} />
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
