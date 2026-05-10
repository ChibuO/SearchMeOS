import { React, useRef } from 'react';
import './Window.css';
import 'animate.css';
import appData from '../Resources/appData.json';
import { useDraggable } from '@dnd-kit/core';
import { AiOutlineClose } from "react-icons/ai";
import { TbArrowsDiagonalMinimize2 } from "react-icons/tb";
import { TbMaximize } from "react-icons/tb";
import { PasswordScreen } from './PasswordScreen';
import { EmailApp } from '../Apps/Email';
import { NotesApp } from '../Apps/Notes';
import { ContactsApp } from '../Apps/Contacts';
import { CalendarApp } from '../Apps/Calendar';
import { PhotosApp } from '../Apps/Photos';
import { DocumentsApp } from '../Apps/Documents';
import { MessengerApp } from '../Apps/Messenger';
import { MusicApp } from '../Apps/Music';
import computerData from '../Resources/computerData.json';
import initialEmails from '../Resources/emailData.json';
import forgotEmail from '../Resources/forgotEmail.json';

const Window = ({ windowName, windowState, unlockWindow, hideWindow, bringToFront, resizeWindow }) => {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform } = useDraggable({
    id: `${windowName}-draggable`,
  });

  const positionStyle = {
    left: windowState.x,
    top: windowState.y,
  }

  let sizeStyle = {
    width: windowState.w,
    height: windowState.h,
  }

  const transformStyle = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const toggleFullScreen = () => {
    // const { fullScreen } = windowState;
    // resizeWindow(windowName, windowState);
    // const w = document.getElementById(`${windowName}-window`);
    // console.log(fullScreen, w.classList);
    // if (!fullScreen) {
    //   w.classList.add('fullScreen');
    //   transform = `translate3d(${-positionStyle.left}px, ${-positionStyle.top}px, 0)`;
    // } else {
    //   w.classList.remove('fullScreen');
    // }
    
    // if(!windowState.fullScreen) {
    //   resizeWindow
    // } else {
    //   sizeStyle = {
    //     width: "60%",
    //     height: "60%"
    //   }
    // }
  }

  const closeRef = useRef(null);

  function handleCloseWindow() {
    hideWindow(windowName, windowState, 'close');
    if (windowState.unlocked) {
      closeRef.current.clearWindow();
    }
  }

  const clickForgotPassword = () => {
    if (windowName === 'docs' && initialEmails) {
      initialEmails.arriving.unshift(forgotEmail);
    }
  }

  const displayContent = (app) => {
    switch (app) {
      case "calendar":
        return <CalendarApp ref={closeRef}/>
      case "photos":
        return <PhotosApp ref={closeRef}/>
      case "contacts":
        return <ContactsApp ref={closeRef} />;
      case "messages":
        return <MessengerApp ref={closeRef}/>
      case "music":
        return <MusicApp ref={closeRef}/>
      case "docs":
        return <DocumentsApp ref={closeRef}/>
      case "notes":
        return <NotesApp ref={closeRef}/>;
      case "email":
        return <EmailApp ref={closeRef}/>;
      case "internet":
          break;
      default:
        break;
    }
  }

  return (
    <div id={`${windowName}-window`} className="desktop-window" onFocus={(event) => bringToFront(event.target.id)}
      ref={setNodeRef} style={{...positionStyle, ...transformStyle}} {...attributes}>
      <div className="title-bar" style={{"backgroundColor": computerData.mainColor }}>
        <div className="title" ref={setActivatorNodeRef} {...listeners}>
          <p className="bold-font">{appData[windowName].name}</p>
        </div>
        <div className="window-controls">
          {/* need preventDefault because button interferes with onFocus */}
          <button 
            className="control-button" 
            onMouseDown={(event) => {event.preventDefault()}} 
            onClick={() => hideWindow(windowName, windowState, 'minimize')}>
              <TbArrowsDiagonalMinimize2 />
          </button>
          <button 
            className="control-button" 
            onMouseDown={(event) => {event.preventDefault()}}
            onClick={toggleFullScreen}>
              <TbMaximize />
          </button>
          <button 
            className="control-button" 
            onMouseDown={(event) => {event.preventDefault()}} 
            onClick={handleCloseWindow}>
              <AiOutlineClose />
          </button>
        </div>
      </div>
      <div className="window-content">
        {windowState.unlocked ? 
          displayContent(windowName) : 
            <PasswordScreen 
              appName={windowName} 
              bgColor={computerData.secondColor} 
              unlockWindow={unlockWindow} 
              clickForgotPassword={clickForgotPassword} 
            />
        }
      </div>
    </div>
  );
};

export default Window;
