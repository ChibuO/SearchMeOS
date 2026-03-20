import { React, useState } from 'react';
import appData from '../Resources/appData.json';
import './PasswordScreen.css';
import { PasswordForm } from './PasswordForm';

export const PasswordScreen = ({ appName, bgColor, unlockWindow, givenEntry = "", givenHint = "", unlockFunction = null }) => {
  const hint = givenHint ?? appData[appName].hint;
  const checkPassword = (entry) => {
    const expectedEntry = givenEntry ?? appData[appName].entry;
    const isCorrect = entry === expectedEntry;

    if (isCorrect) {
      if (unlockFunction) {
        unlockFunction();
      } else {
        unlockWindow(appName);
      }
    }
  }

  return (
    <div className='pw-screen-div' style={{ "backgroundColor": bgColor }}>
      <div className='pw-screen-inner'>
      <h3 id="pw-title">Enter Password</h3>
      <PasswordForm handlePassword={checkPassword} inputId={`${appName}-login`} hint={hint} />
      </div>
    </div>
  )
}
