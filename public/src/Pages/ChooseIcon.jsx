import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../assets/loading.gif';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import { setIconRoute } from '../Routes/APIRoutes.js';
import { Buffer } from 'buffer';
import bg2 from '../assets/bg2.jpg';
import { v4 as uuidv4 } from 'uuid';

function ChooseIcon() {
  const ContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '3rem',
    height: '100vh',
    width: '100vw',
    color: 'white',
    paddingBottom: '0',
    textAlign: 'center',
    backgroundImage: bg2,
  };

  const loadingStyle = {
    height: '4rem',
    maxInlineSize: '100%',
  };

  // free use avatar api
  const api = 'https://api.dicebear.com/8.x/adventurer/svg?seed=';

  const navigate = useNavigate();

  const [icons, setIcons] = useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedIcon, setSelectedIcon] = useState(undefined);

  const ToastStyle = {
    style: {
      border: '2px solid gold',
      backgroundColor: '#fdf6ec',
      color: 'rgb(49, 53, 120)',
    },
  };
  // if user is not logged/local storage can't find, redirect to login page
  useEffect(() => {
    if (!localStorage.getItem('chat-user')) {
      navigate('/login');
    }
  }, []);

  //set profile pic and store in db, and then local storage
  const setProfilePicture = async () => {
    if (selectedIcon === undefined) {
      toast.error('Please select an icon', ToastStyle);
    } else {
      const user = await JSON.parse(localStorage.getItem('chat-user'));

      const { data } = await axios.post(`${setIconRoute}/${user._id}`, {
        image: icons[selectedIcon],
      });
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem('chat-user', JSON.stringify(user));
        navigate('/');
      } else {
        toast.error('Error setting icon. Please try again', ToastStyle);
      }
    }
  };

  const getIcons = async () => {
    //fixed array of endpoints for avatar api
    const iconOptions = [
      'Charlie',
      'Annie',
      'Gizmo',
      'Cuddles',
      'Chester',
      'Pumpkin',
      'Loki',
      'Buddy',
      'Sophie',
      'Angel',
      'Midnight',
      'Cleo',
      'Sophie',
      'Milo',
      'Coco',
      'Simba',
      'Sassy',
      'Boo',
      'Abby',
      'Sheba',
      'Harley',
      'Nala',
      'Molly',
      'Samantha',
    ];
    const data = [];
    for (let i = 0; i < 4; i++) {
      //randomly choose endpoints for avatar api and create string data for db storage
      const image = await axios.get(
        `${api}${iconOptions[Math.floor(Math.random() * 23) + 1]}`
      );
      const buffer = new Buffer.from(image.data);
      data.push(buffer.toString('base64'));
    }
    setIcons(data);
    setIsLoading(false);
  };

  //get avatar options on page load
  useEffect(() => {
    getIcons();
  }, []);

  return (
    <>
      <Toaster position='bottom-center' />
      {isLoading ? (
        <div style={ContainerStyle}>
          <img src={Loading} alt='loading' style={loadingStyle} />
        </div>
      ) : (
        <div style={ContainerStyle}>
          <div
            style={{
              padding: '2rem',
              background:
                'linear-gradient(360deg, rgba(32,49,69,1) 0%, rgba(40,80,135,1) 40%, rgba(38,63,98,1) 100%)',
              border: '2px solid gold',
              boxShadow: '0px 0px 16px 0px rgba(0,0,0,0.77)',
              borderRadius: '10px',
            }}
          >
            <div className='titleContainer'>
              <h1 style={{ color: 'white' }}>
                Please choose your profile picture
              </h1>
              <h4 style={{ paddingTop: '1rem', color: '#ffffff75' }}>
                {' '}
                ( refresh page for more options ){' '}
              </h4>

              <div style={{ height: '30px' }}></div>
            </div>
            <div className='icons' style={{ display: 'flex', gap: '2rem' }}>
              {icons.map((icon, index) => {
                return (
                  <div
                    className={`icon ${
                      selectedIcon === index ? 'selected' : ''
                    }`}
                    style={{
                      border: '0.4rem solid transparent',
                      padding: '0.4rem',
                      borderRadius: '5rem',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      transition: '0.5s ease-in-out',
                    }}
                    key={uuidv4()}
                  >
                    <img
                      src={`data:image/svg+xml;base64,${icon}`}
                      style={{ height: '6rem' }}
                      alt='icon'
                      key={uuidv4()}
                      onClick={() => setSelectedIcon(index)}
                    />
                  </div>
                );
              })}
            </div>
            <div style={{ height: '50px' }}></div>
            <button
              className='regButton'
              onClick={setProfilePicture}
              role='button'
            >
              Set Profile Picture
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChooseIcon;
