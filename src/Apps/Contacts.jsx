import React, { useState, forwardRef, useImperativeHandle } from 'react';
import contacts from '../Resources/contactData.json';
import { ProfileIcon } from '../Components/ProfileIcon';
import './Contacts.css';

export const ContactsApp = forwardRef((props, ref) => {
  const [selectedContact, setSelectedContact] = useState(null);

  // Function to select a contact
  const selectContact = (contact) => {
    setSelectedContact(contact);
  };

  useImperativeHandle(ref, () => {
    return {
      clearWindow() {
        setSelectedContact(null);
      }
    };
  }, []);

  return (
    <div className="contacts-app">
      <div className="contacts-sidebar">
        <h2>Contacts</h2>
        <div className='contacts-list'>
          <ul>
            {contacts.map((contact) => (
              <li key={contact.id} className={selectedContact === contact ? 'contacts-selected' : ''} onClick={() => selectContact(contact)}>
                {contact.contactName}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="contacts-main">
        {selectedContact ? (
          <div className="contacts-contact">
            <div className='contact-pic-container'>
              <ProfileIcon name={selectedContact.contactName} borderRadius='5px'/>
              {/* <div className="contact-pic">
                <img src="" alt="pic" className="contact-img" draggable="false" />
              </div> */}
            </div>
            <h2 className='contact-name'>{selectedContact.contactName}</h2>
            <div className='contact-info'>
              <p className='contact-text'>Email: {selectedContact.email}</p>
              <p className='contact-text'>Phone: 555-5555</p>
              {selectedContact.note && 
                <>
                  <p className='contact-text'>Notes:</p>
                  <p className='contact-note'>{selectedContact?.note}</p>
                </>
              }
            </div>
          </div>
        ) : (
          <div className="contacts-no-contact-selected">
            <p>Select a contact to view or add a new one.</p>
          </div>
        )}
      </div>
    </div>
  );
});
