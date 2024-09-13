import React, { useEffect } from 'react';
import './Modal.css';

export const Modal = ({ childRef, onClickOutside, id, children }) => {
  const handleClickOutside = (e) => {
    if (childRef && !childRef.current?.contains(e.target)) {
      onClickOutside();
    }
  }

  useEffect(() => {
    const modalElement = document.getElementById(id);
    modalElement.addEventListener("click", handleClickOutside, true);
  })

  return (
    <div className='modal-background' id={id}>
      <div className='modal-content'>
        {children}
      </div>
    </div>
  );
}