import React, { useState, useEffect } from 'react';
import Logo from '../assets/option2.png';

function Contacts({ contacts, currentUser, changeChat }) {
  const ContainerStyle = {
    display: 'grid',
    gridTemplateRows: '10% 75% 15%',
    overflow: 'hidden',
    backgroundColor: '#314D74',
    borderRadius: '10px 0 0 10px',
    userSelect:"none"
  };

  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  //once user selects a chat user set user for chatting
  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  // change chat selected
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserName && currentUserImage ? (
        <div style={ContainerStyle}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              justifyContent: 'center',
            }}
          >
            <img src={Logo} style={{ height: '4rem' }} alt='logo' />
          </div>
          <div className='contacts'>
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelected ? 'selected' : ''
                  }`}
                  key={index}
                  style={{ display: 'flex', flexDirection: 'row',
                  userSelect:"none" }}
                  onClick={() => {
                    changeCurrentChat(index, contact);
                  }}
                >
                  <div className='avatar'>
                    <img
                      style={{ height: '4rem' }}
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt='avatar'
                    />
                  </div>
                  <div className='username'>
                    <h3 style={{ color: 'white', fontWeight: '400' }}>
                      {contact.username}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className='current-user'>
            <div className='avatar'>
              <img
                style={{
                  height: '5rem',
                  maxInlineSize: '100%',
                }}
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt='avatar'
              />
              <div
                className='username'
                style={{
                  color: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                }}
              >
                <h2
                  style={{
                    color: 'white',
                    justifyContent: 'center',
                    textAlign: 'center',
                    fontWeight: '400',
                  }}
                >
                  {currentUserName}
                </h2>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Not Loaded</div>
      )}
    </>
  );
}

export default Contacts;
