import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/option2.png';
import { Toaster, toast } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from '../Routes/APIRoutes.js';

function Register() {
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
    color: 'white',
  };

  const FormStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    background:
      'linear-gradient(360deg, rgba(32,49,69,1) 0%, rgba(40,80,135,1) 40%, rgba(38,63,98,1) 100%)',
    borderRadius: '2rem',
    padding: '3rem 5rem',
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
    email: '',
    password: '',
    confirmPassword: '',
  });

  //if user is logged in, redirect to chat
  useEffect(() => {
    if (localStorage.getItem('chat-user')) {
      navigate('/');
    }
  }, []);

  //handle submitting new user info to db, then set local stoarge item and redirect to chat
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      console.log('in validation', registerRoute);
      const { username, email, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, ToastStyle);
      }
      if (data.status === true) {
        localStorage.setItem('chat-user', JSON.stringify(data.user));
        navigate('/');
      }
    }
  };

  //handle showing letters etc as form is filled out
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  //handle if user does not fill out registration fields correctly
  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      toast.error('passwords must match!', ToastStyle);
      return false;
    } else if (username.length < 3) {
      toast.error('username must be longer than 3 characters!', ToastStyle);
      return false;
    } else if (password.length < 8) {
      toast.error('password must be greater than 7 characters!', ToastStyle);
      return false;
    } else if (email === '') {
      toast.error('email address is required!', ToastStyle);
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
            <img style={{ height: '15rem' }} src={Logo} alt='Logo' />
          </div>
          <input
            className='inputs'
            type='text'
            placeholder='Username'
            name='username'
            onChange={(e) => handleChange(e)}
          />
          <input
            className='inputs'
            type='email'
            placeholder='Email Address'
            name='email'
            onChange={(e) => handleChange(e)}
          />
          <input
            className='inputs'
            type='password'
            placeholder='Password'
            name='password'
            onChange={(e) => handleChange(e)}
          />
          <input
            className='inputs'
            type='password'
            placeholder='Confirm Password'
            name='confirmPassword'
            onChange={(e) => handleChange(e)}
          />
          <button className='regButton' type='submit'>
            Create User
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
            Already Have an Account ?
            <Link
              style={{
                paddingLeft: '10px',
                fontWeight: 'bold',
                color: 'gold',
              }}
              to='/login'
            >
              Login
            </Link>
          </span>
        </form>
      </div>
    </>
  );
}

export default Register;
