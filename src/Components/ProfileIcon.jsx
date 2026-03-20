import React from 'react'
import './ProfileIcon.css';
import computerData from '../Resources/computerData.json';

export const ProfileIcon = ({ name, letter="", size = 40, color, textColor = "#ffffff", borderRadius = "50%", img = "", border = "" }) => {
    const symbol = letter || (name ? name.slice(0, 1) : '~');
    // console.log("ProfileIcon rendered with name:", name, "and symbol:", symbol);
    return (
        <div
            style={{
                width: `${size}px`,
                height: `${size}px`,
                background: color || computerData.secondColor,
                border: border || 'none',
                color: textColor,
                borderRadius: borderRadius,
                overflow: 'hidden',
                fontSize: `${size / 2}px`,
            }}
            className="profile-icon">
            {img && img !== "" ? <img src={img} alt="Profile Pic" className='profile-img' draggable="false" /> :
                <span className='initials'>
                    {symbol}
                </span>
            }
        </div>
    )
}
