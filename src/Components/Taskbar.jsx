import  React, { useState , useEffect } from 'react'
import { AppIcon } from './AppIcon';
import './Taskbar.css';
import { FiBatteryCharging } from "react-icons/fi";
import { IoIosWifi } from "react-icons/io";
import { RiVolumeMuteLine } from "react-icons/ri";
// import file_icon from '../Images/file_icon.png';
import start_icon from '../Images/start-icon.png';
import { toggleWindow } from '../utilities/animate';
import computerData from '../Resources/computerData.json';
import appData from '../Resources/appData.json';

let dayOptions = {
  weekday: "short",
  month: "short",
  day: "numeric"
};

let timeOptions = {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};

const Taskbar = ({windowsState, setWindowsState, openWindows, showStartMenu, setShowStartMenu, bringToFront}) => {
  const [systemTime, setSystemTime] = useState(new Intl.DateTimeFormat("en-US", timeOptions).format(new Date()));
  const [systemDay, setSystemDay] = useState(new Intl.DateTimeFormat("en-US", dayOptions).format(new Date()).replace(/,/g, ''));

  useEffect(() => {
    let timer = setInterval(() => {
      setSystemTime(new Intl.DateTimeFormat("en-US", timeOptions).format(new Date()));
      setSystemDay(new Intl.DateTimeFormat("en-US", dayOptions).format(new Date()).replace(/,/g, ''));
    }, 1000 );
    return function cleanup() {
        clearInterval(timer)
    }
  });

  const showWindow = (window, windowState) => {
    const maximized = windowState.maximized;
    const isLast = maximized && (Object.keys(appData).filter(app => windowsState[app].maximized).length === 1);
    
    // if last window max, don't bring to front
    // if window isn't active window, bring to front,
    // if window is not max, bring to front when maxing
    if(maximized && !isLast && document.querySelector(`#${window}-window`).style.zIndex !== 1) {
      bringToFront(`${window}-window`);
      return;
    } else if (!maximized) {
      bringToFront(`${window}-window`);
    }
    
    toggleWindow(window, maximized);
    setWindowsState({
      ...windowsState,
      [window]: {
        ...windowsState[window],
        maximized: !maximized,
      }
    });
  }

  const onStartClick = (e) => {
    // console.log(e.target.id, showStartMenu);
    let startBtn = document.getElementById(e.target.id);
    // startBtn.disabled = true;
    setShowStartMenu(!showStartMenu);
  }

  // const onStartUp = (e) => {
  //   if (!showStartMenu) {

  //   }
  //   console.log(e.target.id, showStartMenu);
  //   let startBtn = document.getElementById(e.target.id);
  //   // startBtn.disabled = true;
  //   setShowStartMenu(!showStartMenu);
  // }

  return (
    <div className="taskbar" style={{"backgroundColor": computerData.mainColor }}>
      <div className="start-icon-container">
        <button 
          id="start-button"
          onClick={(e) => onStartClick(e)}
          style={{"backgroundColor": computerData.secondColor }}>
          <img src={start_icon} alt="Start" className="start-img" draggable="false" />
        </button>
      </div>
      <div className="task-icons">
        {appData && openWindows && 
        openWindows.map((window, index) => (
          <AppIcon
            key={index}
            name={appData[window].name}
            image={appData[window].icon}
            onClick={() => showWindow(window, windowsState[window])}
            borderColor={computerData.secondColor}
            textColor={computerData.textColor} />
        ))}
      </div>
      <div className="system-tray">
        <div className="system-icons">
          <div className="system-icon">
            <RiVolumeMuteLine />
          </div>
          <div className="system-icon battery">
            <p>100%</p>
            <FiBatteryCharging />
          </div>
          <div className="system-icon">
            <IoIosWifi />
          </div>
        </div>
        <div className="system-date">
          <p className="system-day">{systemDay}</p>
          <div className="system-time-container">
            <p className="system-time hours">{systemTime.split(" ")[0].split(":")[0]}</p>
            <span className='system-time-colon'>:</span>
            <p className="system-time minutes">{systemTime.split(" ")[0].split(":")[1]}</p>
            <span className='system-time-colon'>:</span>
            <p className="system-time seconds">{systemTime.split(" ")[0].split(":")[2]}</p>
          </div>
          <p className="system-m">{systemTime.split(" ")[1]}</p>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
