import './App.css';
import React from 'react';
import Nav from './component/Nav/Nav';
import Main from './component/Main/Main';
import Login from './component/Login/Login';

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
            <span className='auth'> signup </span>
          </div>
          <Nav />
          <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/view/:type' element={<Main/>}/>
          </Routes>
        {/* </Switch> */}
      </div>
    </BrowserRouter>
    
  );
}

export default App;
