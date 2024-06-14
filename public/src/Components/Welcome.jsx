import React, { useState, useEffect } from 'react';
import WelcomeImage from '../assets/welcome.png';

function Welcome({ currentUser }) {
  const ContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    color: '#314D74',
    backgroundColor: '#fdf6ec',
    userSelect: 'none',
    borderRadius: '0px 10px 10px 0px',
  };

  const [currentUserName, setCurrentUserName] = useState(undefined);

  //set current username for display
  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  return (
    <>
      <div style={ContainerStyle}>
        <img
          src={WelcomeImage}
          alt='welcome'
          style={{ height: '11rem', padding: '0 0 10px 0', userSelect: 'none' }}
        />
        <h1 style={{ color: '#314D74', fontWeight: '800', userSelect: 'none' }}>
          <span>{currentUserName}</span>
        </h1>
        <br></br>
        <h3
          style={{
            textTransform: 'uppercase',
            fontWeight: '400',
            userSelect: 'none',
          }}
        >
          please select someone to begin chatting
        </h3>
      </div>
    </>
  );
}

export default Welcome;
