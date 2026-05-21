import React, { useState, useImperativeHandle, useEffect, useRef } from 'react';
import messages from '../Resources/messengerData.json';
import computerData from '../Resources/computerData.json';
import { ProfileIcon } from '../Components/ProfileIcon';
import { MdOutlineNavigateNext } from "react-icons/md";
import { FaPaperPlane } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { capitlaizeWord, insertGlobalData } from '../utilities/helpers';
import './Messenger.css';

export const MessengerApp = ({ref}) => {
    const [selectedCategory, setSelectedCategory] = useState("channels" || Object.keys(messages.chats)[0]);
    const [selectedChannel, setSelectedChannel] = useState("general"|| messages.chats[selectedCategory][0].name);
    const [selectedChannelId, setSelectedChannelId] = useState(0);
    const [showThread, setShowThread] = useState(false);
    const [inputText, setInputText] = useState("");

    useImperativeHandle(ref, () => {
        return {
            clearWindow() {
                setSelectedCategory("channels" || Object.keys(messages.chats)[0]);
                setSelectedChannel("general" || messages.chats[selectedCategory][0].name);
                setSelectedChannelId(0);
                setShowThread(false);
                setInputText("");
            }
        };
    }, [selectedCategory]);


    return (
        <div className="messenger-app-container">
            <div className="messenger-sidebar">
                <div className='messenger-company-name-div'>
                    <h3 className='messenger-company-name chat-font-bold'>{messages && messages.companyName}</h3>
                    <ProfileIcon 
                        size={35}
                        color={'var(--messages-accent-color-2)'}
                        img={computerData.profileImagePath}
                        borderRadius='5px'
                    />
                </div>
                <ul className='messenger-category-ul'>
                    {messages && Object.keys(messages.chats).map((category, index) => (
                        <li className='messenger-category-li' key={index}>
                            <span className='chat-font-bold'>{capitlaizeWord(category)}</span>
                            <ul className='messenger-channel-ul chat-font-reg'>
                                {messages.chats[category].map((chat, i) => (
                                    <li
                                        key={i}
                                        className={`messenger-channel-li ${selectedChannel === chat.name ? 'selected' : ''}`}
                                        onClick={() => {
                                            if (chat.name !== selectedChannel) {
                                                setSelectedCategory(category);
                                                setSelectedChannel(chat.name);
                                                setSelectedChannelId(i);
                                                setShowThread(false);
                                            }
                                        }}
                                    ># {chat.name}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
            <ChatArea
                selectedCategory={selectedCategory}
                selectedChannel={selectedChannel}
                selectedChannelId={selectedChannelId}
                showThread={showThread}
                setShowThread={setShowThread}
                inputText={inputText}
                setInputText={setInputText}
            />
        </div>
    );
};

const ChatArea = ({ selectedCategory, selectedChannel, selectedChannelId, showThread, setShowThread, inputText, setInputText }) => {
    const [selectedMessageId, setSelectedMessageId] = useState(0);
    const selectedMessages = messages.chats[selectedCategory][selectedChannelId].messages;
    const messagesListRef = useRef(null);

    useEffect(() => {
        const pressEnter = (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                setInputText("");
            }
        }

        const messengerInput = document.getElementById("messenger-input");
        messengerInput?.addEventListener('keypress', pressEnter);

        return () => {
            messengerInput?.removeEventListener('keypress', pressEnter);
        }
    }, [setInputText]);

    useEffect(() => {
        const messagesList = messagesListRef.current;
        if (messagesList) {
            messagesList.scrollTop = messagesList.scrollHeight;
        }
    }, [selectedCategory, selectedChannelId]);

    return (
        <div className="messenger-chat-area">
            <div className="messenger-chat-header chat-font-bold"># {selectedChannel}</div>
            <div className='messenger-chat-body chat-font-reg'>
                <div className="messenger-messages-list" ref={messagesListRef}>
                    {selectedMessages.map((chat, index) => (
                        <SingleChatMessage key={index} chat={chat} index={index} setSelectedMessageId={setSelectedMessageId} showThread={showThread} setShowThread={setShowThread} />
                    ))}
                </div>
                {showThread && <ChatReplySecion
                    selectedCategory={selectedCategory}
                    selectedChannelId={selectedChannelId}
                    selectedMessageId={selectedMessageId}
                    setShowThread={setShowThread}
                />}
            </div>
            <div className='messenger-input-div'>
                <input
                    className='chat-font-reg'
                    type="text"
                    autoFocus
                    placeholder="Type here..."
                    value={inputText}
                    id="messenger-input"
                    onChange={(e) => setInputText(e.target.value)} />
                <button className="messenger-input-send" onClick={() => setInputText("")}>{<FaPaperPlane />}</button>
            </div>
        </div>
    );
}

const ChatReplySecion = ({ selectedCategory, selectedChannelId, selectedMessageId, setShowThread }) => {
    let chat = messages.chats[selectedCategory][selectedChannelId].messages[selectedMessageId];

    return chat.replies && (
        <div className='messenger-thread-div'>
            <div className='close-replies-div' onClick={() => { setShowThread(false) }}>
                <AiOutlineClose className='close-replies-icon' />
            </div>
            <div className='messenger-thread-orig-msg'>
                <SingleChatMessage chat={chat} index={selectedMessageId} copy={true} />
            </div>
            <div className='messenger-thread-list'>
                {chat.replies.map((reply, index) => (
                    <SingleChatMessage key={index} chat={reply} index={index} />
                ))}
            </div>
        </div>
    );
}

const SingleChatMessage = ({ chat, index, setSelectedMessageId, showThread, setShowThread, copy = false }) => {
    const isOsName = chat.from.includes("%FIRSTNAME%");
    return (
        <div className="messenger-message">
            {/* <div className='messenger-message-pic'>
                <ProfileIcon name={insertGlobalData(chat.from)} borderRadius='5px' size='35' color='var(--messages-accent-color-2)' />
            </div> */}
            <div className='messenger-message-text-div'>
                <p className={`messenger-message-name ${isOsName ? 'messenger-message-os-name' : ''}`}><strong>{insertGlobalData(chat.from)}</strong></p>
                <p className='messenger-message-content'>{insertGlobalData(chat.message)}</p>
                {chat.replies && !copy &&
                    <div className='messenger-message-replies-box'
                        onClick={() => {
                            setSelectedMessageId(index);
                            setShowThread(!showThread);
                        }}>
                        <p>...replies</p>
                        <MdOutlineNavigateNext className='replies-box-next-icon' />
                    </div>}
            </div>
        </div>
    );
}