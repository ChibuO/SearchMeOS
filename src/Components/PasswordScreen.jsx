import { React, useState } from 'react';
import appData from '../Resources/appData.json';
import './PasswordScreen.css';
import { PasswordForm } from './PasswordForm';

export const PasswordScreen = ({ appName, bgColor, unlockWindow }) => {
  const checkPassword = (entry) => {
    let isCorrect = entry === appData[appName].entry;
    if (isCorrect) {
      unlockWindow(appName);
    }
  }

  return (
    <div className='pw-screen-div' style={{ "backgroundColor": bgColor }}>
      <div className='pw-screen-inner'>
      <h3 id="pw-title">Enter Password</h3>
      <PasswordForm handlePassword={checkPassword} inputId={`${appName}-login`} hint={appData[appName].hint} />
      </div>
    </div>
  )
}
