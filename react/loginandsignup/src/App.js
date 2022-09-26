import './App.css';
import React from 'react';
import Nav from './component/Nav/Nav';
import Main from './component/Main/Main';
import Login from './component/Login/Login';
import Signup from './component/Signup/Signup';

import {BrowserRouter, Routes, Route, Switch, Link } from 'react-router-dom';

function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
        {/* <Switch> */}
          <div className='login-div'>
            <Link to = "login">
              <span className='auth'> Login </span>
            </Link>
            <Link to = "signup">
              <span className='auth'> signup </span>
            </Link>
          </div>
          <Nav />
          <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/view/:type' element={<Main/>}/>
          </Routes>
        {/* </Switch> */}
      </div>
    </BrowserRouter>
    
  );
}

export default App;
