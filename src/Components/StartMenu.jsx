import React from 'react';
import computerData from '../Resources/computerData.json';
import { ProfileIcon } from './ProfileIcon';
import { getFullName } from '../utilites/helpers';
import './StartMenu.css';

export const StartMenu = ({menuRef, logOut}) => {
    return (
        <div ref={menuRef} id="start-menu">
            <div className="menu-header" style={{"backgroundColor": computerData.secondColor, "color": computerData.textColor  }}>
                <div className="menu-logo">OS 76</div>
                <div className="menu-user">
                    <ProfileIcon name={getFullName()} size={30} textColor='white' color={computerData.mainColor} />
                    <div className="user-name">{computerData && getFullName()}</div>
                </div>
            </div>
            <div className="menu-body">
                <div className='menu-body-buttons-div'>
                    <MenuItem label="Settings" icon="⚙️" />
                    <MenuItem label="Log Out" icon="↩︎" onClick={logOut}/>
                </div>
                <div className='menu-body-info-div'>
                    <p>Welcome.</p>
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