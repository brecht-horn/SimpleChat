import React, { useState, useEffect, useRef } from 'react';
import Logout from './Logout';
import ChatInput from './ChatInput';
import axios from 'axios';
import { sendMessageRoute, getAllMessagesRoute } from '../Routes/APIRoutes';
import { v4 as uuidv4 } from 'uuid';

function ChatContainer({ currentChat, currentUser, socket }) {
  const ChatContainerStyle = {
    padding: '1rem',
    display: 'grid',
    gridTemplateRows: '10% 78% 12%',
    gap: '0.1rem',
    overflow: 'hidden',
    backgroundColor: '#fdf6ec',
    borderRadius: '0px 10px 10px 0px',
  };

  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    //get all pre-existing messages from current chat selected
    const fetchData = async () => {
      if (currentChat) {
        const data = await JSON.parse(localStorage.getItem('chat-user'));
        const response = await axios.post(getAllMessagesRoute, {
          from: data._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      }
    };

    fetchData();
  }, [currentChat]);

  //get current chat
  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(localStorage.getItem('chat-user'))._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  //handle sending message and live socket update
  const handleSendMessage = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit('send-msg', {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  //get live messages from other user
  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-receive', (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  //add new messages to list of messages
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  //scroll to bottom of messages
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {currentChat && currentUser && (
        <>
          <div style={ChatContainerStyle}>
            <div className='chat-header'>
              <div className='user-details'>
                <div className='avatar' style={{ height: '3rem' }}>
                  <img
                    style={{
                      height: '4rem',
                      maxInlineSize: '100%',
                    }}
                    src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                    alt='avatar'
                  />
                </div>
                <div
                  className='username'
                  style={{ color: '#1f9637', paddingTop: '1rem' }}
                >
                  <h3
                    style={{
                      color: '#203758',
                      fontSize: '26px',
                      fontWeight: '500',
                    }}
                  >
                    {currentChat.username}
                  </h3>
                </div>
              </div>
              <Logout id="logout"/>
            </div>
            <div className='chat-messages'>
              {messages.map((message) => {
                return (
                  <div ref={scrollRef} key={uuidv4()}>
                    <div
                      className={`message ${
                        message.fromSelf ? 'sended' : 'received'
                      }`}
                    >
                      <div className='content'>
                        <p>{message.message}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <ChatInput handleSendMessage={handleSendMessage} />
          </div>
        </>
      )}
    </>
  );
}

export default ChatContainer;
