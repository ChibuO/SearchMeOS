import appData from '../Resources/appData.json';
import './PasswordScreen.css';
import { PasswordForm } from './PasswordForm';
import { compareStrings } from '../utilities/helpers';

export const PasswordScreen = ({ appName, bgColor, unlockWindow, givenEntry = "", givenHint = "", unlockFunction = null, clickForgotPassword = null, givenForgotPassword = null }) => {
  const inputId = `${appName}-login`;
  const hint = givenHint || appData[appName].hint;
  const forgotPassword = givenForgotPassword || appData[appName]?.forgotPassword;
  const expectedEntry = givenEntry || appData[appName].entry;

  const checkPassword = (entry) => {
    const isCorrect = compareStrings(entry, expectedEntry);

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
      <h3 id="pw-title" className="secondary-font">Enter Password</h3>
      <PasswordForm 
        handlePassword={checkPassword} 
        inputId={inputId} 
        hint={hint} 
        forgotPassword={forgotPassword} 
        clickForgotPassword={clickForgotPassword} />
      </div>
    </div>
  )
}
