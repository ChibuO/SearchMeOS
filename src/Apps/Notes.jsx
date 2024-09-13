import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Modal } from '../Components/Modal';
import notes from '../Resources/noteData.json';
import './Notes.css';

export const NotesApp = forwardRef((props, ref) => {
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
          <NoteModal note={notes[selectedNote - 1]} noteRef={noteRef} />
        </Modal>
      }
      <div id="notes-app">
      <div className='notes-header'>
        <h3>All Notes</h3>
        <h4>Search</h4>
      </div>
      <div className="notes-list">
        {notes.map((note) => (
          <div key={note.id} className="notes-note small-note"
            onClick={() => {
              setSelectedNote(note.id)
              setShowNote(true)}
            }
          >
            <h3 className='note-title'>{note.title}</h3>
            <p className='note-content'>{note.content}</p>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
});

const NoteModal = ({ note, noteRef }) => {
  return (
    <div key={note.id} className="notes-note modal-note" ref={noteRef}>
      <h3 className='note-title'>{note.title}</h3>
      <p className='note-content'>{note.content}</p>
    </div>
  );
}