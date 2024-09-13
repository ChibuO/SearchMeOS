import { React, useRef } from 'react';
import './Window.css';
import 'animate.css';
import appData from '../Resources/appData.json';
import { useDraggable } from '@dnd-kit/core';
import { AiOutlineClose } from "react-icons/ai";
import { TbArrowsDiagonalMinimize2 } from "react-icons/tb";
import { TbMaximize } from "react-icons/tb";
import { EmailApp } from '../Apps/Email';
import { NotesApp } from '../Apps/Notes';
import { ContactsApp } from '../Apps/Contacts';
import { CalendarApp } from '../Apps/Calendar';
import { PhotosApp } from '../Apps/Photos';
import { DocumentsApp } from '../Apps/Documents';
import { MessengerApp } from '../Apps/Messenger';
import { MusicApp } from '../Apps/Music';
import computerData from '../Resources/computerData.json';

const Window = ({ window, windowState, setWindowsState, hideWindow, bringToFront, app }) => {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform } = useDraggable({
    id: `${window}-draggable`,
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

  const setFullScreen = () => {
    if(!windowState.fullScreen) {
      // setWindowsState({
      //   ...windowsState,
      //   [window]: {
      //     ...windowsState[window],
      //     maximized: !maximized,
      //   }
      // });
    } else {
      sizeStyle = {
        width: "60%",
        height: "60%"
      }
    }
  }

  const closeRef = useRef(null);

  function handleCloseWindow() {
    hideWindow(window, windowState, 'close');
    closeRef.current.clearWindow();
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
    <div id={`${window}-window`} className="desktop-window" onFocus={(event) => bringToFront(event.target.id)}
      ref={setNodeRef} style={{...positionStyle, ...transformStyle, ...sizeStyle}} {...attributes}>
      <div className="title-bar" style={{"backgroundColor": computerData.mainColor }}>
        <div className="title" ref={setActivatorNodeRef} {...listeners}>
          <p>{appData[window].name}</p>
        </div>
        <div className="window-controls">
          {/* need preventDefault because button interferes with onFocus */}
          <button 
            className="control-button" 
            onMouseDown={(event) => {event.preventDefault()}} 
            onClick={() => hideWindow(window, windowState, 'minimize')}>
              <TbArrowsDiagonalMinimize2 />
          </button>
          <button 
            className="control-button" 
            onMouseDown={(event) => {event.preventDefault()}}
            onClick={setFullScreen}>
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
        {displayContent(app)}
      </div>
    </div>
  );
};

export default Window;
