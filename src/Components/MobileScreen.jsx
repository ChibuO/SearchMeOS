import React, { useState } from 'react';
import computerData from '../Resources/computerData.json';
import { MdKeyboardBackspace } from "react-icons/md";
import { FaPaperPlane } from "react-icons/fa";
import { ProfileIcon } from './ProfileIcon';
import './MobileScreen.css';

export const MobileScreen = () => {
  const client = computerData.client;
  const [openContact, setOpenContact] = useState(false);

  return (
    <div id="mobile-screen-container" className='meta-font'>
      <div id="phone-container">
        {!openContact ? 
          <ShareScreen setOpenContact={setOpenContact} client={client}/> 
          : <ContactScreen setOpenContact={setOpenContact} client={client} />}
      </div>
    </div>
  );
};

const ShareScreen = ({ setOpenContact, client }) => {
  const contactFullName = client.fullName;
  const contactNumber = client.phoneNumber;
  const contactEmoji = client.emoji;
  const contactMessage = client.message;

  const [showContact, setShowContact] = useState(false);
  const [contactInput, setContactInput] = useState("");

  const checkContact = (input) => {
    setContactInput(input);
    input = input.trim().toLowerCase();
    const ismatch = [
      contactFullName.toLowerCase(), 
      contactNumber].includes(input);
    if (ismatch || input == "red") {
      setShowContact(true);
      setContactInput("");
      return;
    }
    setShowContact(false);
  }

  return (
    <div className="phone-screen-container">
      <div className="phone-header-div">
        <MdKeyboardBackspace className="phone-header-icon" id="phone-share-icon" />
        <h3 className="phone-header-text" id="phone-share-header-text">Send to...</h3>
      </div>
      <div className="phone-body" id="phone-share-body">
        <input
          type='text'
          placeholder="Enter full name or number"
          className="meta-font"
          id="phone-contact-input"
          value={contactInput}
          onChange={(e) => checkContact(e.target.value)} />
        <p id="phone-contacts-label">Contacts</p>
        {showContact && 
          <div id='phone-contact-card' onClick={setOpenContact}>
            <div>
              <ProfileIcon
                letter={contactEmoji}
                size={40}
                color={'var(--phone-accent-color)'}
              />
            </div>
            <div id="phone-contact-card-info-div">
              <p id="phone-contact-card-name">{contactFullName}</p>
              <p id="phone-contact-card-preview">{contactMessage}</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

const ContactScreen = ({setOpenContact, client}) => {
  const contactFullName = client.fullName;
  const contactNumber = client.phoneNumber;
  const contactEmoji = client.emoji;
  const contactMessage = client.message;
  const contactDeliverable = client.deliverable;
  const contactThanks = client.thanks;
  const contactThanks2 = client.thanks2;

  const [inputText, setInputText] = useState("no problem");

  const sendMessage = () => {
    setInputText("")
    window.alert("Thank you for playing SearchMe!");
  }

  return (
    <div className="phone-screen-container">
      <div className="phone-header-div">
        <MdKeyboardBackspace className="phone-header-icon" id="phone-back-icon" onClick={() => setOpenContact(false)}/>
        <div>
          <ProfileIcon
            letter={contactEmoji}
            size={35}
            color={'var(--phone-accent-color)'}
          />
        </div>
        <div id="phone-contact-header-info-div">
          <h3 className="phone-header-text" id="phone-contact-header-text">{contactFullName}</h3>
          <p id="phone-contact-header-number">{contactNumber}</p>
        </div>
      </div>
      <div className="phone-body" id="phone-contact-body">
        <div className="phone-message-div phone-message-left">
          <p>{contactMessage}</p>
        </div>
        <div class="phone-message-div phone-message-right">
          <p>{contactDeliverable}</p>
        </div>
        <div class="phone-message-div phone-message-left phone-message-cont">
          <p>{contactThanks}</p>
        </div>
        <div class="phone-message-div phone-message-left">
          <p>{contactThanks2}</p>
        </div>
      </div>
      <div id='phone-message-input-div'>
        <input
            className='meta-font'
            type="text"
            placeholder=""
            value={inputText}
            id="phone-message-input"
            onChange={(e) => setInputText(e.target.value)}/>
        <button id="phone-message-input-send" onClick={sendMessage}><FaPaperPlane /></button>
    </div>
    </div>
  );
}