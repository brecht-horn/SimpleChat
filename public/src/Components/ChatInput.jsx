import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import { BsEmojiSmileFill } from 'react-icons/bs';
import { PiArrowElbowRightUpBold } from 'react-icons/pi';

function ChatInput({ handleSendMessage }) {
  const ChatInputContainerStyle = {
    display: 'grid',
    height: '10%',
    gridTemplateColumns: '5% 95%',
    alignItems: 'center',
    padding: '0 2rem',
  };

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState('');

  //show emoji picker on click
  const handleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  //add emoji to message and close emoji picker
  const handleEmojiClick = (emojiObject) => {
    setMsg((prevMsg) => prevMsg + emojiObject.emoji);
    setShowEmojiPicker(!showEmojiPicker);
  };

  //send msg and blank input field
  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMessage(msg);
      setMsg('');
    }
  };

  //add event listener to close emoji picker on press of escape key
  document.onkeydown = function (evt) {
    evt = evt || window.event;
    if (evt.keyCode === 27) {
      setShowEmojiPicker(false);
    }
  };

  return (
    <>
      <div style={ChatInputContainerStyle}>
        <div
          className='button-container'
          style={{
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            color: 'black',
            gap: '1rem',
          }}
        >
          <div className='emoji' role='emoji' style={{ position: 'relative' }}>
            <BsEmojiSmileFill
              style={{
                position: 'absolute',
                top: '-10px',
                fontSize: '1.5rem',
                color: '#e8e12d',
                cursor: 'pointer',
                border: '1px solid black',
                borderRadius: '15px',
                backgroundColor: 'black',
              }}
              onClick={handleEmojiPicker}
            />
            {showEmojiPicker && (
              <>
                <Picker
                  onEmojiClick={handleEmojiClick}
                  style={{
                    position: 'relative',
                    top: '-240px',
                    boxShadow: '0 5px 10px #20375850',
                    borderColor: 'grey',
                  }}
                />
              </>
            )}
          </div>
        </div>
        <form
          className='input-container'
          onSubmit={(e) => sendChat(e)}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            color: 'red',
            backgroundColor: '#ffffff34',
            border: '1.5px solid #00000054',
          }}
        >
          <input
            type='text'
            placeholder='type your message here'
            className='message-input'
            value={msg}
            onChange={(e) => {
              setMsg(e.target.value);
            }}
          />
          <button type='submit' className='send-button'>
            <PiArrowElbowRightUpBold
              style={{ fontSize: '1.9rem', color: 'white', margin: '0 0rem' }}
            />
          </button>
        </form>
      </div>
    </>
  );
}

export default ChatInput;
