import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/option2.png';
import { Toaster, toast } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute } from '../Routes/APIRoutes.js';

function Login() {
  const BrandStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    justifyContent: 'center',
  };

  const FormContainerStyle = {
    height: '100vh',
    width: '100wh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    // backgroundColor: '#131324',
  };

  const FormStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    borderRadius: '2rem',
    padding: '3rem 5rem',
    background:
      'linear-gradient(360deg, rgba(32,49,69,1) 0%, rgba(40,80,135,1) 40%, rgba(38,63,98,1) 100%)',
    border: '2px solid gold',
    boxShadow: '0px 0px 16px 0px rgba(0,0,0,0.77)',
  };

  const ToastStyle = {
    style: {
      border: '2px solid gold',
      backgroundColor: '#fdf6ec',
      color: 'rgb(49, 53, 120)',
    },
  };

  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  //redirect to login if user is not logged in / found in local storage
  useEffect(() => {
    if (localStorage.getItem('chat-user')) {
      navigate('/');
    }
  }, []);

  //check db for user, set local storage item, and redirect to chat
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      console.log('in login validation', loginRoute);
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      console.log('data is', data);
      if (data.status === false) {
        toast.error(data.msg, ToastStyle);
      }
      if (data.status === true) {
        localStorage.setItem('chat-user', JSON.stringify(data.user));
        navigate('/');
      }
    }
  };

  //handle inputted letter etc appearing in form
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  //handle if login fields are not completed correctly
  const handleValidation = () => {
    const { username, password } = values;
    if (password === '') {
      toast.error('username and password is required', ToastStyle);
      return false;
    } else if (username === '') {
      toast.error('username and password is required', ToastStyle);
      return false;
    }
    return true;
  };

  return (
    <>
      <Toaster position='bottom-center' />
      <div style={FormContainerStyle}>
        <form style={FormStyle} onSubmit={(event) => handleSubmit(event)}>
          <div style={BrandStyle}>
            <img
              className='logo'
              style={{ height: '15rem' }}
              src={Logo}
              alt='Logo'
            />
          </div>
          <input
            className='inputs'
            type='text'
            placeholder='Username'
            name='username'
            onChange={(e) => handleChange(e)}
            min='3'
          />
          <input
            className='inputs'
            type='password'
            placeholder='Password'
            name='password'
            onChange={(e) => handleChange(e)}
          />
          <button className='regButton' type='submit'>
            Log In
          </button>
          <span
            style={{
              display: 'flex',
              justifyContent: 'center',
              color: 'white',
              textTransform: 'uppercase',
            }}
          >
            {' '}
            Don't Have an Account ?
            <Link
              style={{
                paddingLeft: '10px',
                fontWeight: 'bold',
                color: 'gold',
              }}
              to='/register'
            >
              Register Now
            </Link>
          </span>
        </form>
      </div>
    </>
  );
}

export default Login;
