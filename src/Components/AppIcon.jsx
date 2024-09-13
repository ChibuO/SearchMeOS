import React from 'react';
import './AppIcon.css';

export const Shortcut = ({name, image, onClick, textColor}) => {
    return (
            <div className="shortcut" onDoubleClick={onClick}>
                <img draggable="false" src={image} alt={name}/>
                <p>{name}</p>
            </div>
    );
};

export const AppIcon = ({name, image, onClick, borderColor, textColor}) => {
    return (
        <div className="task-icon" onClick={onClick} style={{"borderColor": borderColor, "color": textColor}}>
            <div className='task-icon-space'>
                <img src={image} alt={name} draggable="false" />
            </div>
            <p>{name}</p>
        </div>
    );
};