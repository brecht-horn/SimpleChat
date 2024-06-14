import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Chat from './Pages/Chat2';
import ChooseIcon from './Pages/ChooseIcon';

export default function App() {
  return (
    //use browser router to navigate to different pages
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/seticon' element={<ChooseIcon />} />
        <Route path='/' element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}
