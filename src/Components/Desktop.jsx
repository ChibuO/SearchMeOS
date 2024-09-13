import { React } from 'react';
import './Desktop.css';
import Window from './Window';
import { Shortcut } from './AppIcon';
import { toggleWindow } from '../animate';
import appData from '../Resources/appData.json';
import { DndContext } from '@dnd-kit/core';
// import { restrictToParentElement, restrictToWindowEdges } from '@dnd-kit/modifiers';

const Desktop = ({ windowsState, setWindowsState, openWindows, bringToFront, setOpenWindows, bgImagePath }) => {
  const showWindows = (window, windowState) => {
    bringToFront(`${window}-window`);
    const { open, maximized } = windowState;
    //not open and not max -> add to task and max
    //open and not max -> don't add to task and max
    if (!open && !maximized) {
      setOpenWindows([...openWindows, window]);
      setWindowsState({
        ...windowsState,
        [window]: {
          ...windowsState[window],
          open: !open,
          maximized: !maximized,
        }
      });
      toggleWindow(window, maximized);
    } else if (open && !maximized) {
      toggleWindow(window, maximized);
      setWindowsState({
        ...windowsState,
        [window]: {
          ...windowsState[window],
          maximized: !maximized,
        }
      });
    }
  }

  //for the window control buttons (minimize and close)
  const hideWindow = (window, windowState, option) => {
    bringToFront(`${window}-window`);
    const { open, maximized } = windowState;

    if (open && maximized) {
      if (option === 'close') setOpenWindows(openWindows.filter(w => w !== window));
      setWindowsState({
        ...windowsState,
        [window]: {
          ...windowsState[window],
          open: option === 'close' ? false : true,
          maximized: false,
        }
      });
      toggleWindow(window, maximized);
    }
  }

  function handleDragEnd(event) {
    let window = event.active.id.split("-")[0];
    let delta = event.delta;

    setWindowsState({
      ...windowsState,
      [window]: {
        ...windowsState[window],
        x: windowsState[window].x + delta.x,
        y: windowsState[window].y + delta.y,
      }
    });
  }

  return (
    <DndContext onDragEnd={handleDragEnd} modifiers={[]}>
      <div className="desktop" style={{"backgroundImage": `url(${bgImagePath})`}}>
        <div className="desktop-icons">
          {appData &&
            Object.keys(appData).map((app, index) => 
              <Shortcut key={index} name={appData[app].name} image={require(`../Images/${appData[app].icon}`)} 
                onClick={() => {
                  if (app === 'internet') {
                    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Got Ya');
                  } else {
                    showWindows(app, windowsState[app]);
                  }
                }}/>)}
        </div>
        {appData &&
          Object.keys(appData).map((app, index) => 
            <Window key={index} window={app} setWindowsState={setWindowsState} windowState={windowsState[app]} 
              hideWindow={hideWindow} bringToFront={bringToFront} app={app}/>
            )}
      </div>
    </DndContext>
  );
};

export default Desktop;
