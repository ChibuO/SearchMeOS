import { React, useState, useRef, useEffect } from 'react';
import Taskbar from './Components/Taskbar';
import Desktop from './Components/Desktop';
import LockScreen from './Components/LockScreen';
import { StartMenu } from './Components/StartMenu';
import computerData from './Resources/computerData.json';
import { fadeLockScreen, slideStartScreen } from './utilites/helpers';
import './App.css';

const WINDOW_KEYS = ['calendar', 'email', 'photos', 'contacts', 'messages', 'music', 'docs', 'notes', 'internet'];

const initialWindowState = (position, size) => {
    return WINDOW_KEYS.reduce((acc, key) => {
        acc[key] = { open: false, maximized: false, fullScreen: false, unlocked: false, ...position, ...size };
        return acc;
    }, {});
};

export const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showStartMenu, setShowStartMenu] = useState(false);

    //(Math.ceil(window.innerWidth) - document.querySelector(".desktop-window")?.offsetWidth ) / 2
    const startingPosition = {
        x: Math.ceil(window.innerWidth / 18),
        y: Math.ceil(window.innerHeight / 28),
    };

    const startingSize = {
        w: '60%',
        h: '60%',
    };

    const [windowsState, setWindowsState] = useState(initialWindowState(startingPosition, startingSize));

    const [openWindows, setOpenWindows] = useState([]);

    const bringToFront = (id) => {
        document.querySelectorAll(".desktop-window").forEach((w) => {
            w.style.zIndex = "auto";
        });
        if (id !== '') document.querySelector(`#${id}`).style.zIndex = '1';
    }

    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef?.current && !menuRef.current?.contains(e.target)) {
                setShowStartMenu(false);
            }
        }

        const modalElement = document.getElementById('outside-container');
        modalElement.addEventListener('click', handleClickOutside, true);
        
        return () => {
            modalElement.removeEventListener('click', handleClickOutside);
        }
    }, []);

    const logOut = () => {
        setShowStartMenu(false);
        setIsLoggedIn(false);
        fadeLockScreen();
        slideStartScreen();
    }

    return (
        <div className='computer-screen-container'>
            {!isLoggedIn &&  <LockScreen isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} bgImagePath={computerData.lockScreenImagePath}/>}
            <div className='desktop-screen-container'>
                {showStartMenu && <StartMenu menuRef={menuRef} setShowStartMenu={setShowStartMenu} logOut={logOut}/>}
                <Desktop
                    windowsState={windowsState}
                    setWindowsState={setWindowsState}
                    openWindows={openWindows}
                    setOpenWindows={setOpenWindows}
                    bringToFront={bringToFront}
                    bgImagePath={computerData.desktopScreenImagePath} />
                <Taskbar
                    windowsState={windowsState}
                    setWindowsState={setWindowsState}
                    openWindows={openWindows}
                    showStartMenu={showStartMenu}
                    setShowStartMenu={setShowStartMenu}
                    bringToFront={bringToFront} />
            </div>
        </div>
    );
};
