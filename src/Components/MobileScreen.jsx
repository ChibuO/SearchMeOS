import React, { useState } from 'react';
import computerData from '../Resources/computerData.json';
import { IoMdShare as ShareIcon } from "react-icons/io";
import { MdKeyboardBackspace as BackIcon} from "react-icons/md";
import { FaPaperPlane as SendIcon } from "react-icons/fa";
import { ProfileIcon } from './ProfileIcon';
import './MobileScreen.css';
import { ca } from 'date-fns/locale';

export const MobileScreen = () => {
  const client = computerData.client;
  const [openContact, setOpenContact] = useState(false);

  return (
    <div id="mobile-screen-container" className='meta-font'>
      <p id="phone-label">Your Phone</p>
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
    if (input === "") {
      setShowContact(true);
      setContactInput("");
      return;
    }
    setContactInput(input);
    input = input.replace(/\s+/g, "").trim().toLowerCase();
    const ismatch = [
      contactFullName.replace(/\s+/g, "").toLowerCase(), 
      contactNumber].includes(input);
    if (ismatch) {
      setShowContact(true);
      return;
    }
    setShowContact(false);
  }

  return (
    <div className="phone-screen-container">
      <div className="phone-header-div">
        <ShareIcon className="phone-header-icon" id="phone-share-icon" />
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
                color={'var(--phone-bg-color)'}
                border={'1px solid var(--phone-accent-color)'}
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

  const [fileSent, setFileSent] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [showThanks2, setShowThanks2] = useState(false);

  const [inputText, setInputText] = useState("");

  const sendMessage = () => {
    const messageList = document.getElementById("phone-contact-body");

    if (!fileSent) {
      setFileSent(true);
      setTimeout(() => {
        setShowThanks(true);
      }, 1000);
      setTimeout(() => {
        setShowThanks2(true);
        setInputText("No problem");
        if (messageList) {
          messageList.scrollTop = (0, messageList.scrollHeight*3);
        }
      }, 2000);
    } else {
      try {
        shootConfetti();
      } catch (error) {
        console.error("Confetti failed to load:", error);
      }
      setInputText("");
      setTimeout(() => {
        window.alert("Thank you for playing SearchMe!");
      }, 1500);
    }
  }

  const colors = ["#cf3d00ff", "#e825be", "#ffffff"];
  const shootConfetti = () => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0.3, y: .8 },
      colors
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: .7, y: .8 },
      colors
    });
  };

  return (
    <div className="phone-screen-container">
      <div className="phone-header-div">
        <BackIcon className="phone-header-icon" id="phone-back-icon" onClick={() => {setOpenContact(false)}}/>
        <div>
          <ProfileIcon
            letter={contactEmoji}
            size={35}
            color={'var(--phone-bg-color)'}
            border={'1px solid var(--phone-accent-color)'}
          />
        </div>
        <div id="phone-contact-header-info-div">
          <h3 className="phone-header-text" id="phone-contact-header-text">{contactFullName}</h3>
          <p id="phone-contact-header-number">{contactNumber}</p>
        </div>
      </div>
      <div className="phone-body" id="phone-contact-body">
        {showThanks2 && <div className="phone-message-div phone-message-left">
          <p>{contactThanks2}</p>
        </div> }
        {showThanks && <div className="phone-message-div phone-message-left phone-message-cont">
          <p>{contactThanks}</p>
        </div>}
        {fileSent && 
        <div className="phone-message-div phone-message-right">
          <p>{contactDeliverable}</p>
        </div>}
        <div className="phone-message-div phone-message-left">
          <p>{contactMessage}</p>
        </div>
      </div>
      <div id='phone-message-input-div'>
        <input
            className='meta-font'
            type="text"
            placeholder=""
            value={!fileSent ? contactDeliverable : showThanks2 ? inputText : ""}
            id="phone-message-input"
            disabled={!showThanks2}
            onChange={(e) => setInputText(e.target.value)}/>
        <button id="phone-message-input-send" onClick={sendMessage}><SendIcon id="phone-send-icon"/></button>
    </div>
    </div>
  );
}