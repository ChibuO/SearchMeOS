import React, { useState, useImperativeHandle } from 'react';
import contacts from '../Resources/contactData.json';
import { ProfileIcon } from '../Components/ProfileIcon';
import './Contacts.css';

export const ContactsApp = ({ref}) => {
  const [selectedContact, setSelectedContact] = useState(null);

  const profileBgColor = "rgba(20, 20, 20, 0.521)";
  const profileBorderColor = "1px solid rgba(255, 255, 255, 0.44)";

  // Sort contacts alphabetically by name in place
  const sortedContacts = contacts.sort((a, b) => a.contactName.localeCompare(b.contactName));

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
        <h2 className='contact-font-bold'>Population</h2>
        <div className='contacts-list contact-font-reg'>
          <ul>
            {sortedContacts.map((contact, index) => (
              <li key={index} className={selectedContact === contact ? 'contacts-selected' : ''} onClick={() => selectContact(contact)}>
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
              <ProfileIcon letter={selectedContact.emoji} borderRadius='5px' color={profileBgColor} border={profileBorderColor} />
            </div>
            <h2 className='contact-name contact-font-bold'>{selectedContact.contactName}</h2>
            <div className='contact-info contact-font-reg'>
              <p className='contact-text'>Email: {selectedContact.email}</p>
              <p className='contact-text'>Phone: {selectedContact.phone}</p>
              {selectedContact.note && 
                <>
                  <p className='contact-text'>Notes:</p>
                  <p className='contact-note'>{selectedContact?.note}</p>
                </>
              }
            </div>
          </div>
        ) : (
          <div className="contacts-no-contact-selected contact-font-reg">
            <p>Select a contact to view or add a new one.</p>
          </div>
        )}
      </div>
    </div>
  );
};
