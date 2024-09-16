import React from 'react';
import Img from './CustomImage';
import './AppIcon.css';

export const Shortcut = ({name, image, onClick, textColor}) => {
    return (
            <div className="shortcut" onDoubleClick={onClick}>
                <Img draggable="false" imageName={image} alt={name} />
                <p style={{"color": textColor}}>{name}</p>
            </div>
    );
};

export const AppIcon = ({name, image, onClick, borderColor, textColor}) => {
    return (
        <div className="task-icon" onClick={onClick} style={{"borderColor": borderColor, "color": textColor}}>
            <div className='task-icon-space'>
                <Img imageName={image} alt={name} draggable="false" />
            </div>
            <p>{name}</p>
        </div>
    );
};