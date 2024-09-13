import React from 'react'
import './ProfileIcon.css';

export const ProfileIcon = ({ name, size = 40, color="#1a87af", textColor="#ffffff", borderRadius="50%" }) => {
    return (
        <div
            style={{
                width: `${size}px`,
                height: `${size}px`,
                background: color,
                color: textColor,
                borderRadius: borderRadius
            }}
            className="profile-icon">
            <span className='initials'>
                {name && name !== "" ? name.slice(0, 1) : '~'}
            </span>
        </div>
    )
}
