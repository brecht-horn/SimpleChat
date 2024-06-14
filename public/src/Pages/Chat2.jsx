import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUsersRoute, host } from '../Routes/APIRoutes';
import Contacts from '../Components/Contacts';
import Welcome from '../Components/Welcome';
import ChatContainer from '../Components/ChatContainer';
import { io } from 'socket.io-client';

function Chat() {
  const ContainerStyle = {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '1rem',
    alignItems: 'center',
  };

  const navigate = useNavigate();
  const socket = useRef();

  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  //if user not stored in local storage/logged in, send to login page,
  useEffect(() => {
    async function fetchData() {
      if (!localStorage.getItem('chat-user')) {
        navigate('/login');
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem('chat-user')));
        setIsLoaded(true);
      }
    }
    fetchData();
  }, []);

  //add user to live socket
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit('add-user', currentUser._id);
    }
  });

  //if user hase no set profile picture, redirect to choose icon page
  useEffect(() => {
    async function fetchData() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          console.log('data data is', data.data);
          setContacts(data.data);
        } else {
          navigate('/seticon');
        }
      }
    }
    fetchData();
  }, [currentUser]);

  //handle changing chat users
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <div style={ContainerStyle}>
        <div
          className='container'
          style={{
            border: '1px solid gold',
            borderRadius: '10px',
            boxShadow: '0px 0px 16px 0px rgba(0,0,0,0.77)',
          }}
        >
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
          {isLoaded && currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <ChatContainer
              currentChat={currentChat}
              currentUser={currentUser}
              socket={socket}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Chat;
