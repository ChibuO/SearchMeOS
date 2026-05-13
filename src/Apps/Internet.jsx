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

    const stopVideo = () => {
        const videoIframe = document.getElementById("internet-video");
        videoIframe.src = "";
        videoIframe.src = videoSrc;
        // video.pause();
        // video.currentTime = 0;
    }

    return (
        <div className="internet-app">
            <iframe id="internet-video" src={src} title="Got Ya" frameborder="0"></iframe>
            {/* <iframe width="1340" height="754" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Rick Astley - Never Gonna Give You Up (Official Video) (4K Remaster)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
        </div>
    );
};
