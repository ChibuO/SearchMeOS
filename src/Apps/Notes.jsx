import React, { useState, useRef, useImperativeHandle } from 'react';
import { Modal } from '../Components/Modal';
import notes from '../Resources/noteData.json';
import './Notes.css';

export const NotesApp = ({ref}) => {
  const [selectedNote, setSelectedNote] = useState(null);

  const [showNote, setShowNote] = useState(false);

  const noteRef = useRef(null);
  
  useImperativeHandle(ref, () => {
    return {
      clearWindow() {
        setSelectedNote(null);
        setShowNote(false);
      }
    };
  }, []);

  const onClickOutside = () => {
    setShowNote(false);
  }

  return (
    <div id="notes-app-container">
      {showNote &&
        <Modal id="notes-modal" childRef={noteRef} onClickOutside={onClickOutside}>
          <NoteModal note={notes[selectedNote]} noteRef={noteRef} />
        </Modal>
      }
      <div id="notes-app">
        <div className='notes-header-div'>
            <h1 id='notes-header'>NOTES</h1>
        </div>
        <div className="notes-list">
          {notes.map((note, index) => (
            <div key={index} className="notes-note display-note"
              onClick={() => {
                setSelectedNote(index)
                setShowNote(true)}
              }>
              <h3 className='note-text note-title'>{note.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const NoteModal = ({ note, noteRef }) => {
  return (
    <div className="notes-note modal-note" ref={noteRef}>
      <h3 className='note-text note-title'>{note.title}</h3>
      <p className='note-text note-content'>{note.content}</p>
    </div>
  );
}