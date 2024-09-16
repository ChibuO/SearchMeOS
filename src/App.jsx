import { React, useState, useRef, useEffect } from 'react';
import Taskbar from './Components/Taskbar';
import Desktop from './Components/Desktop';
import LockScreen from './Components/LockScreen';
import { StartMenu } from './Components/StartMenu';
import computerData from './Resources/computerData.json';
import { fadeLockScreen, slideStartScreen } from './utilites/helpers';
import './App.css';

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

    const [windowsState, setWindowsState] = useState({
        'calendar': { open: false, maximized: false, fullScreen: false, x: startingPosition.x, y: startingPosition.y, w: startingSize.w, h: startingSize.h },
        'email': { open: false, maximized: false, fullScreen: false, x: startingPosition.x, y: startingPosition.y, w: startingSize.w, h: startingSize.h },
        'photos': { open: false, maximized: false, fullScreen: false, x: startingPosition.x, y: startingPosition.y, w: startingSize.w, h: startingSize.h },
        'contacts': { open: false, maximized: false, fullScreen: false, x: startingPosition.x, y: startingPosition.y, w: startingSize.w, h: startingSize.h },
        'messages': { open: false, maximized: false, fullScreen: false, x: startingPosition.x, y: startingPosition.y, w: startingSize.w, h: startingSize.h },
        'music': { open: false, maximized: false, fullScreen: false, x: startingPosition.x, y: startingPosition.y, w: startingSize.w, h: startingSize.h },
        'docs': { open: false, maximized: false, fullScreen: false, x: startingPosition.x, y: startingPosition.y, w: startingSize.w, h: startingSize.h },
        'notes': { open: false, maximized: false, fullScreen: false, x: startingPosition.x, y: startingPosition.y, w: startingSize.w, h: startingSize.h },
        'internet': { open: false, maximized: false, fullScreen: false, x: startingPosition.x, y: startingPosition.y, w: startingSize.w, h: startingSize.h },
    });

    const [openWindows, setOpenWindows] = useState([]);

    const bringToFront = (id) => {
        document.querySelectorAll(".desktop-window").forEach((w) => {
            w.style.zIndex = "auto";
        });
        if (id !== '') document.querySelector(`#${id}`).style.zIndex = '1';
    }

    const menuRef = useRef(null);

    const handleClickOutside = (e) => {
        if (menuRef?.current && !menuRef.current?.contains(e.target)) {
            setShowStartMenu(false);
        }
    }

    useEffect(() => {
        // const modalElement = document.getElementById('outside-container');
        document.addEventListener('mousedown', handleClickOutside, true);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    });

    const logOut = () => {
        setShowStartMenu(false);
        setIsLoggedIn(false);
        fadeLockScreen();
        slideStartScreen();
    }

    const computer = () => {
        return (
            <div className='desktop-screen-container' id="outside-container">
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
        );
    }

    return (
        <div className='computer-screen-container'>
            {isLoggedIn && <LockScreen isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} bgImagePath={computerData.lockScreenImagePath}/>}
            {computer()}
        </div>
    );
};
