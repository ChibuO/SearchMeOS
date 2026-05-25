import { React, useState, useRef, useEffect, useContext } from 'react';
import Taskbar from './Components/Taskbar';
import Desktop from './Components/Desktop';
import LockScreen from './Components/LockScreen';
import { StartMenu } from './Components/StartMenu';
import computerData from './Resources/computerData.json';
import appData from './Resources/appData.json';
import { fadeLockScreen, slideStartScreen } from './utilities/helpers.js';
import { toggleWindow } from './utilities/animate.js';
import './App.css';

const WINDOW_KEYS = ['calendar', 'email', 'photos', 'contacts', 'messages', 'music', 'docs', 'notes', 'internet'];

const initialWindowState = (position, size) => {
    return WINDOW_KEYS.reduce((acc, key) => {
        let unlocked = appData[key]?.unlocked || false;
        acc[key] = { open: false, maximized: false, fullScreen: false, unlocked: unlocked, ...position, ...size };
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

    const getInitialWindowsState = () => {
        const storedState = localStorage.getItem('windowsState');
        if (storedState) {
            try {
                return JSON.parse(storedState);
            } catch (error) {
                console.error('Failed to parse stored windowsState:', error);
            }
        }
        return initialWindowState(startingPosition, startingSize);
    };

    const getOpenWindowsState = () => {
        const storedState = localStorage.getItem('openWindowsState');
        if (storedState) {
            try {
                return JSON.parse(storedState);
            } catch (error) {
                console.error('Failed to parse stored openWindowsState:', error);
            }
        }
        return []; // Default to an empty array if no state is stored
    };

    const [windowsState, setWindowsState] = useState(getInitialWindowsState);

    const [openWindows, setOpenWindows] = useState(getOpenWindowsState);

    const [windowsZMax, setWindowsZMax] = useState(0);

    const bringToFront = (id) => {
        if (id == '') return;
        let shiftDown = false;
        const maxZ = document.querySelectorAll(".maximized").length;
        // console.log("maxes: " + maxZ);
        let newZ = windowsZMax + 1;
        if (newZ > maxZ) {
            newZ = maxZ;
            shiftDown = true;
        }
        document.querySelector(`#${id}`).style.zIndex = newZ;
        setWindowsZMax(newZ);
        // console.log("newZ: " + newZ);
        document.querySelectorAll(".maximized").forEach((w) => {
            if (shiftDown && w.id !== id) {
                let prevZ = w.style.zIndex;
                if (prevZ - 1 >= 1) w.style.zIndex = prevZ - 1;
            }
            // console.log("z: " + w.style.zIndex + " " + w.id);
        });
        // console.log("------------------------");
    }

    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (e.target.id != "start-button" && menuRef?.current && !menuRef.current?.contains(e.target)) {
                setShowStartMenu(false);
            }
        }

        const desktopElement = document.getElementById('outside-container');
        const taskbarElement = document.getElementById('taskbar-container');
        const desktopScreenElement = document.getElementById('desktop-screen-container');
        desktopScreenElement.addEventListener('click', handleClickOutside, true);
        
        return () => {
            desktopScreenElement.removeEventListener('click', handleClickOutside);
        }
    }, []);

    const resetWindowsState = () => {
        if (window.confirm("Are you sure you want to start over?")) {
            openWindows.forEach(window => {
                if (windowsState[window]?.maximized) {
                toggleWindow(window, true);
                }
            });
            const newState = initialWindowState(startingPosition, startingSize);
            setWindowsState(newState);
            setOpenWindows([]);
            localStorage.setItem("windowsState", JSON.stringify(newState));
            localStorage.setItem("openWindowsState", JSON.stringify([]));
            localStorage.setItem("windowUnlocked", false);
            logOut();
        }
    }

    const logOut = () => {
        setShowStartMenu(false);
        setIsLoggedIn(false);
        fadeLockScreen();
        slideStartScreen();
    }

    return (
        <div className='computer-screen-container'>
            <LockScreen isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} bgImagePath={computerData.lockScreenImagePath}/>
            <div id='desktop-screen-container'>
                {showStartMenu && <StartMenu menuRef={menuRef} setShowStartMenu={setShowStartMenu} logOut={logOut} resetWindowsState={resetWindowsState} />}
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

export default App;