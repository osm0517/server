import './App.css';
import React from 'react';
import Nav from './component/Nav/Nav';
import Main from './component/Main/Main';
import Login from './component/Login/Login';
import Signup from './component/Signup/Signup';
import Side from './component/Side/Side';

import {BrowserRouter, Routes, Route, Switch, Link } from 'react-router-dom';

function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
        <div className='top'>
          <div id='logo'><a className='logo' href='/'><h1>LOGO</h1></a></div>
          <div id='login-box'>
            <span id='login'><a className='login-signup' href='/login'>login</a></span>
            <span><a className='login-signup' href='/signup'>signup</a></span>
          </div>
        </div>
        <div id='nav'>
          <Nav />
        </div>
        <div className='main'>
          <div className='main-main'>
            <Routes>
              <Route path='/login' element={<Login/>}/>
              <Route path='/signup' element={<Signup/>}/>
              <Route path='/view/:type' element={<Main/>}/>
            </Routes>
          </div>
          <Side />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
