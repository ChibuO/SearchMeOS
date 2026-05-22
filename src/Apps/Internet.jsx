import React, { useState, useEffect, useImperativeHandle } from 'react';
// import './Music.css';

const videoSrc = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=1&mute=1"

export const InternetApp = ({ ref, isMaximized }) => {
    const [src, setSrc] = useState('');

    useEffect(() => {
        if (isMaximized) {
            setSrc(videoSrc);
        } else {
            setSrc('');
        }
    }, [isMaximized]);

    useImperativeHandle(ref, () => {
        return {
            clearWindow() {
                setSrc('');
            }
        };
    }, []);

    return (
        <div className="internet-app">
            {src && <iframe style={{border: "none"}} id="internet-video" src={src} title="Got Ya"></iframe>}
        </div>
    );
};
