import React, { useState, forwardRef, useImperativeHandle } from 'react';
import initialEmails from '../Resources/emailData.json';
import { ProfileIcon } from '../Components/ProfileIcon';
import { IoMdArrowDropdown } from "react-icons/io";
import { capitlaizeWord, insertData, getFullName } from '../utilites/helpers';
import computerData from '../Resources/computerData.json';
import './Email.css'

export const EmailApp = forwardRef((props, ref) => {
  

  const [selectedCategory, setSelectedCategory] = useState('inbox');
  const [selectedEmailId, setSelectedEmailId] = useState(0);

  useImperativeHandle(ref, () => {
    return {
      clearWindow() {
        setSelectedEmailId(0);
        setSelectedCategory('inbox');
      }
    };
  }, []);
  
  return (
    <div className="email-app">
      <div className="email-sidebar">
        <h2>Email</h2>
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
      <div className="email-list-container">
        <h2>{capitlaizeWord(selectedCategory)}</h2>
        <div className="email-list">
          {initialEmails && initialEmails[selectedCategory].map((email, index) => (
            <div key={index}
              className={`email-item ${selectedEmailId === index ? 'selected' : ''}`}
              onClick={() => setSelectedEmailId(index)}>
              <p id="email-list-from">
                <b>
                  {!['sent', 'drafts'].includes(selectedCategory) ?
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
      <EmailDisplay
        selectedCategory={selectedCategory}
        selectedEmailId={selectedEmailId} />
    </div>
  );
});

const EmailDisplay = ({ selectedCategory, selectedEmailId }) => {
  const [showFullDetail, setShowFullDetail] = useState(false);

  const getFullToList = () => {
    let fullListString = "";

    if (!['sent', 'drafts'].includes(selectedCategory)) {
      fullListString += 'Me';
    }

    const fullToList = initialEmails[selectedCategory][selectedEmailId].to.concat(initialEmails[selectedCategory][selectedEmailId].cc);

    if (fullToList.length > 0 && !['sent', 'drafts'].includes(selectedCategory)) fullListString += ', ';

    fullListString += fullToList.map(toEmail => (
      toEmail.name !== "" ? toEmail.name.split(' ')[0] : toEmail.email
    )).join(", ");

    return fullListString;
  }

  return (
    <div className='email-side'>
      {initialEmails &&
        <div className="email-container">
          <div className='email-header'>
            <h2>{parseEmail(initialEmails[selectedCategory][selectedEmailId], 'subject')}</h2>
            <div className='email-contact'>
              <p id="email-contact-date">
                {initialEmails[selectedCategory][selectedEmailId].date}
              </p>
              <div className='email-contact-grid'>
                <div className='email-img-div'>
                  <ProfileIcon name={initialEmails[selectedCategory][selectedEmailId].from.name} size={30} />
                </div>
                <p id="email-contact-from">
                  <b>
                    {['sent', 'drafts'].includes(selectedCategory) ? 'Me' :
                      parseEmail(initialEmails[selectedCategory][selectedEmailId], 'from')}
                  </b>
                </p>
                <div id="email-contact-to-container">
                  <p id="email-contact-to">
                    to: {getFullToList()}
                  </p>
                  <IoMdArrowDropdown className={`arrow ${showFullDetail ? 'clicked' : ''}`} onClick={() => setShowFullDetail(!showFullDetail)} />
                </div>
              </div>
            </div>
            <EmailContactBox showFullDetail={showFullDetail} selectedCategory={selectedCategory} selectedEmailId={selectedEmailId} />
          </div>
          <div className='email-body'>
            {initialEmails[selectedCategory][selectedEmailId].message.length > 0 ?
              initialEmails[selectedCategory][selectedEmailId].message.map((p, index) => (
                <p key={index}>{p}</p>
              )) :
              '[no message]'}
          </div>
        </div>
      }
    </div>
  );
}

const EmailContactBox = ({ showFullDetail, selectedCategory, selectedEmailId }) => {
  const userContactString = `${getFullName()} [${computerData.vars.EMAIL}]`;

  return (
    <div className={`email-contact-full ${showFullDetail ? '' : 'show'}`}>
      <p className='email-contact-label'>from: </p>
      <p className='email-contact-value'>
        {['sent', 'drafts'].includes(selectedCategory) ? userContactString :
          parseEmail(initialEmails[selectedCategory][selectedEmailId], 'from')}
      </p>
      <p className='email-contact-label'>to:</p>
      <div className='email-contact-value'>
        <p className={['sent', 'drafts'].includes(selectedCategory) ? `is-empty`: ''}>
          {!['sent', 'drafts'].includes(selectedCategory) ? userContactString : ''}
        </p>
        {initialEmails[selectedCategory][selectedEmailId].to.map((toEmail, index) => (
          <p key={index}>
            {`${toEmail.name !== "" ? toEmail.name : ""} [${toEmail.email}]`}
          </p>
        ))}
      </div>
      <p className='email-contact-label'>cc:</p>
      <div className='email-contact-value'>
        {initialEmails[selectedCategory][selectedEmailId].cc.map((ccEmail, index) => (
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
      return emailObject.subject !== "" ? insertData(emailObject.subject) : "[no subject]";
    case "from":
      return emailObject.from.name !== "" ? insertData(emailObject.from.name) : insertData(emailObject.from.email);
    case "to":
      return emailObject.to.map(toEmail => (
        toEmail.name !== "" ? toEmail.name.split(' ')[0] : toEmail.email
      )).join(", ");
    case "cc":
      return emailObject.cc.map(ccEmail => (
        ccEmail.name !== "" ? ccEmail.name.split(' ')[0] : ccEmail.email
      )).join(", ");
    case "message":
      return emailObject.message !== "" ? insertData(emailObject.message) : "[no message]";
    default:
      return null;
  }
}