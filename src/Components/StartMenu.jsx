import computerData from '../Resources/computerData.json';
import { ProfileIcon } from './ProfileIcon';
import { getFullName } from '../utilities/helpers';
import './StartMenu.css';

export const StartMenu = ({menuRef, logOut, resetWindowsState }) => {

    const fullscreenButtonHandler = () => {
    if (document.fullscreenElement) {
        document.exitFullscreen()
    } else {
        document.documentElement.requestFullscreen()
    }
    }

    return (
        <div ref={menuRef} id="start-menu">
            <div className="menu-header" style={{"backgroundColor": computerData.thirdColor, "color": computerData.textColor  }}>
                <div className="menu-logo bold-font">SM OS</div>
                <div className="menu-user">
                    <ProfileIcon name={getFullName()} size={30} textColor='white' color={computerData.mainColor} img={computerData.profileImagePath} />
                    <div className="user-name secondary-font">{computerData && getFullName()}</div>
                </div>
            </div>
            <div className="menu-body secondary-font-light">
                <div className='menu-body-buttons-div'>
                    <MenuItem label="Toggle Fullscreen" icon="⚙️" onClick={fullscreenButtonHandler}/>
                    <MenuItem label="Log Out" icon="↩︎" onClick={logOut}/>
                    <MenuItem label="Start Game Over" icon="🔄" onClick={resetWindowsState} />
                </div>
                <div className='menu-body-info-div'>
                    <p>Welcome.</p>
                    <hr/>
                    <p>Daily Reminder: call dani</p>
                    <p>Daily Reminder: text danny</p>
                    <p>Weekly Reminder: phone home</p>
                    <p>Monthly Reminder: wash bedsheets</p>
                    <hr/>
                    <br />
                    <p>System up to date</p>
                </div>
            </div>
        </div>
    );
};

const MenuItem = ({ label, icon, onClick }) => {
    return (
        <div className="menu-item" onClick={onClick}>
            <span className="menu-item-icon">{icon}</span>
            <span className="menu-item-label">{label}</span>
        </div>
    );
};