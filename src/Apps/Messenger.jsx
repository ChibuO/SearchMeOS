import React, { useState, forwardRef, useImperativeHandle } from 'react';
import messages from '../Resources/messengerData.json';
import { ProfileIcon } from '../Components/ProfileIcon';
import { MdOutlineNavigateNext } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { capitlaizeWord, insertData } from '../utilites/helpers';
import './Messenger.css';

export const MessengerApp = forwardRef((props, ref) => {
    const [selectedCategory, setSelectedCategory] = useState(Object.keys(messages)[0]);
    const [selectedChannel, setSelectedChannel] = useState(messages[selectedCategory][0].name);
    const [selectedChannelId, setSelectedChannelId] = useState(0);
    const [showThread, setShowThread] = useState(false);

    useImperativeHandle(ref, () => {
        return {
            clearWindow() {
                setSelectedCategory(Object.keys(messages)[0]);
                setSelectedChannel(messages[selectedCategory][0].name);
                setSelectedChannelId(0);
                setShowThread(false);
            }
        };
    }, [selectedCategory]);


    return (
        <div className="messenger-app-container">
            <div className="messenger-sidebar">
                <div className='messenger-side-sidebar'>
                    <div className='messenger-pic'></div>
                    <div className='messenger-pic'></div>
                </div>
                <div className="messenger-sidebar-category-list">
                    <div className='messenger-company-name-div'>
                        <h3>Company Name</h3>
                    </div>
                    <ul className='messenger-category-ul'>
                        {messages && Object.keys(messages).map((category, index) => (
                            <li className='messenger-category-li' key={index}>
                                {capitlaizeWord(category)}
                                <ul className='messenger-channel-ul'>
                                    {messages[category].map((chat, i) => (
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
            </div>
            <ChatArea
                selectedCategory={selectedCategory}
                selectedChannel={selectedChannel}
                selectedChannelId={selectedChannelId}
                showThread={showThread}
                setShowThread={setShowThread}
            />
        </div>
    );
});

const ChatArea = ({ selectedCategory, selectedChannel, selectedChannelId, showThread, setShowThread }) => {
    const [selectedMessageId, setSelectedMessageId] = useState(0);

    return (
        <div className="messenger-chat-area">
            <div className="messenger-chat-header"># {selectedChannel}</div>
            <div className='messenger-chat-body'>
                <div className="messenger-messages-list">
                    {messages[selectedCategory][selectedChannelId].messages.map((chat, index) => (
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
        </div>
    );
}

const ChatReplySecion = ({ selectedCategory, selectedChannelId, selectedMessageId, setShowThread }) => {
    let chat = messages[selectedCategory][selectedChannelId].messages[selectedMessageId];

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
    return (
        <div className="messenger-message">
            <div className='messenger-message-pic'>
                <ProfileIcon name={insertData(chat.from)} borderRadius='5px' size='35' color='#3f0f40' />
            </div>
            <div className='messenger-message-text-div'>
                <p className='messenger-message-name'><strong>{insertData(chat.from)}</strong></p>
                <p className='messenger-message-content'>{insertData(chat.message)}</p>
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