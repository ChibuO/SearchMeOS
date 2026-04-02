import React, { useState, forwardRef, useImperativeHandle } from 'react';
import computerData from '../Resources/computerData.json';
import appData from '../Resources/appData.json';
import initialEmails from '../Resources/emailData.json';
import contacts from '../Resources/contactData.json';
import { ProfileIcon } from '../Components/ProfileIcon';
import { IoMdArrowDropdown } from "react-icons/io";
import { PasswordScreen } from '../Components/PasswordScreen';
import { capitlaizeWord, insertGlobalData, getFullName, parseDate } from '../utilites/helpers';
import './Email.css'

const sent = "departed";
const drafts = "planned";
const inbox = "arriving";
const trash = "canceled";

export const EmailApp = forwardRef((props, ref) => {
  const [selectedCategory, setSelectedCategory] = useState(inbox);
  const [selectedEmailId, setSelectedEmailId] = useState(0);
  const [trashUnlocked, setTrashUnlocked] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      clearWindow() {
        setSelectedEmailId(0);
        setSelectedCategory(inbox);
      }
    };
  }, []);
  
  return (
    <div className="email-app">
      <div className="email-sidebar">
        <h3 id="email-welcome">Welcome Aboard!</h3>
        <ul>
          {initialEmails && Object.keys(initialEmails).map((category, index) => (
            <li className={`${selectedCategory === category ? 'selected' : ''}`} key={index} onClick={() => {
              if (category !== selectedCategory) {
                setSelectedEmailId(0);
                setSelectedCategory(category);
              }

            }}>{capitlaizeWord(category)}</li>
          ))}
        </ul>
      </div>
      {selectedCategory === trash && !trashUnlocked ? 
      <div style={{width: '82%', padding: '0'}}>
        <PasswordScreen 
          appName="emailTrash" 
          bgColor={computerData.secondColor} 
          unlockFunction={() => setTrashUnlocked(true)}
          givenHint={appData["email"]["hint2"]}
          givenEntry={appData["email"]["entry2"]} />
      </div>
      : <div className='email-main-app'>
        <div className="email-list-container">
          <h2 id="email-list-header">{capitlaizeWord(selectedCategory)}</h2>
          <div className="email-list">
            {initialEmails && sortEmailsByDateDesc(initialEmails[selectedCategory]).map((email, index) => (
              <div key={index}
                className={`email-item ${selectedEmailId === index ? 'selected' : ''}`}
                onClick={() => setSelectedEmailId(index)}>
                <p id="email-list-from">
                  <b>
                    {![sent, drafts].includes(selectedCategory) ?
                      parseEmail(email, 'from') :
                      parseEmail(email, 'to')}
                  </b>
                </p>
                <p id="email-list-subject">{parseEmail(email, 'subject')}</p>
                <p id='email-message-preview'>{parseEmail(email, 'message')}</p>
              </div>
            ))}
          </div>
        </div>
        {initialEmails && <EmailDisplay
          selectedCategory={selectedCategory}
          selectedEmailId={selectedEmailId} />}
        </div> 
      }
    </div>
  );
});

const EmailDisplay = ({ selectedCategory, selectedEmailId }) => {
  const [showFullDetail, setShowFullDetail] = useState(false);
  const categoryEmails = initialEmails[selectedCategory];
  const selectedEmail = categoryEmails[selectedEmailId];
  const selectedEmailString = selectedEmail.from.email;
  const selectedEmailFrom = parseEmail(selectedEmail, 'from') || selectedEmailString;
  const selectedEmailFromEmoji = getContactEmoji(selectedEmailString, selectedEmailFrom)
  
  const getFullToList = () => {
    let fullListString = "";

    if (![sent, drafts].includes(selectedCategory)) {
      fullListString += 'Me';
    }

    const fullToList = categoryEmails[selectedEmailId].to.concat(categoryEmails[selectedEmailId].cc);

    if (fullToList.length > 0 && ![sent, drafts].includes(selectedCategory)) fullListString += ', ';

    fullListString += fullToList.map(toEmail => (
      toEmail.name !== "" ? toEmail.name : toEmail.email
    )).join(", ");

    return fullListString;
  }

  return (
    <div className='email-side'>
      <div className="email-container">
          <div className='email-header'>
            <h2>{parseEmail(selectedEmail, 'subject')}</h2>
            <div className='email-contact'>
              <p id="email-contact-date" className="email-contact-faded">
                {readableDate(selectedEmail.date)}
              </p>
              <div className='email-contact-grid'>
                <div className='email-img-div'>
                  <ProfileIcon 
                    letter={selectedEmailFromEmoji} 
                    size={25}
                    color={'var(--email-accent-color)'}
                    img={[sent, drafts].includes(selectedCategory) ? computerData.profileImagePath : ""}
                  />
                </div>
                <p id="email-contact-from">
                    {[sent, drafts].includes(selectedCategory) ? 'Me' :
                      selectedEmailFrom}
                </p>
                <div id="email-contact-to-container">
                  <p id="email-contact-to">
                    <span className='email-contact-faded'>to:</span> {getFullToList()}
                  </p>
                  <IoMdArrowDropdown className={`arrow ${showFullDetail ? 'clicked' : ''}`} onClick={() => setShowFullDetail(!showFullDetail)} />
                </div>
              </div>
            </div>
            <EmailContactBox showFullDetail={showFullDetail} selectedCategory={selectedCategory} selectedEmail={selectedEmail} />
          </div>
          <div className='email-body'>
            {selectedEmail.message.length > 0 ?
              selectedEmail.message.map((p, index) => (
                <p key={index}>{p}</p>
              )) :
              '[no message]'}
          </div>
        </div>
    </div>
  );
}

const EmailContactBox = ({ showFullDetail, selectedCategory, selectedEmail }) => {
  const userContactString = `${getFullName()} [${computerData.vars.EMAIL}]`;
  const fromContactString = `${parseEmail(selectedEmail, 'from')} [${selectedEmail.from.email}]`

  return (
    <div className={`email-contact-full ${showFullDetail ? '' : 'show'}`}>
      <p className='email-contact-label'>from: </p>
      <div>
      <p className='email-contact-value'>
        {[sent, drafts].includes(selectedCategory) ? userContactString : fromContactString}
      </p>
      </div>
      <p className='email-contact-label'>to:</p>
      <div className='email-contact-value'>
        <p className={[sent, drafts].includes(selectedCategory) ? `is-empty`: ''}>
          {![sent, drafts].includes(selectedCategory) ? userContactString : ''}
        </p>
        {selectedEmail.to.map((toEmail, index) => (
          <p key={index}>
            {`${toEmail.name !== "" ? toEmail.name : ""} [${toEmail.email}]`}
          </p>
        ))}
      </div>
      <p className='email-contact-label'>cc:</p>
      <div className='email-contact-value'>
        {selectedEmail.cc.map((ccEmail, index) => (
          <p key={index}>
            {`${ccEmail.name !== "" ? ccEmail.name : ""} [${ccEmail.email}]`}
          </p>
        ))}
      </div>
    </div>
  );
}

const parseEmail = (emailObject, type) => {
  switch (type) {
    case "subject":
      return emailObject.subject !== "" ? insertGlobalData(emailObject.subject) : "[no subject]";
    case "from":
      if (emailObject.from.email !== "") {
        const contactAppName = getContactName(emailObject.from.email);
        if (contactAppName) {
          return contactAppName;
        } 
        return emailObject.from.name !== "" ? insertGlobalData(emailObject.from.name) : "";
      }
      return "[no sender]";
    case "to":
      return emailObject.to.map(toEmail => (
        toEmail.name !== "" ? toEmail.name : toEmail.email
      )).join(", ");
    case "cc":
      return emailObject.cc.map(ccEmail => (
        ccEmail.name !== "" ? ccEmail.name : ccEmail.email
      )).join(", ");
    case "message":
      return emailObject.message !== "" ? insertGlobalData(emailObject.message) : "[no message]";
    default:
      return null;
  }
}

const getContactName = (email) => {
  const contact = contacts.find(contact => contact.email === email);
  return contact ? contact.name : null;
}

const getContactEmoji = (email, backup) => {
  const contact = contacts.find(contact => contact.email === email);
  if (!contact) {
    return backup ? backup.slice(0, 1) : '~';
  }
  return contact.emoji;
}

const readableDate = (dateString) => {
  const date = parseDate(dateString);
  return Intl.DateTimeFormat("en-US").format(date)
}

const sortEmailsByDateDesc = (emails) => {
  return emails.sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return dateB - dateA;
  });
}