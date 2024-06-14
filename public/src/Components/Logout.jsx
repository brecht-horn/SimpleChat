import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RiLogoutBoxRLine } from 'react-icons/ri';

function Logout() {
  const navigate = useNavigate();

  //handle click of logut and redirect to login page
  const handleClick = async () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div
      className='logout'
      onClick={handleClick}
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '.5rem',
        padding: '.2rem .5rem',
        borderRadius: '5px',
      }}
    >
      LOG OUT
      <RiLogoutBoxRLine style={{ fontSize: '1.6rem' }} />
    </div>
  );
}

export default Logout;
