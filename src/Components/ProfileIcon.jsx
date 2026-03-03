import React from 'react'
import './ProfileIcon.css';
import computerData from '../Resources/computerData.json';

export const ProfileIcon = ({ name, size = 40, color, textColor = "#ffffff", borderRadius = "50%", img = "" }) => {
    return (
        <div
            style={{
                width: `${size}px`,
                height: `${size}px`,
                background: color || computerData.secondColor,
                color: textColor,
                borderRadius: borderRadius,
                overflow: 'hidden'
            }}
            className="profile-icon">
            {img && img !== "" ? <img src={img} alt="Profile Pic" className='profile-img' draggable="false" /> :
                <span className='initials'>
                    {name && name !== "" ? name.slice(0, 1) : '~'}
                </span>
            }
        </div>
    )
}
