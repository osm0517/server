import React from "react";
import './Nav.css';
import {BrowserRouter, Routes, Route, Switch, Link} from 'react-router-dom';

function Nav() {

    return(
        <div className="nav">
            <Link to= '/view/top'>
                <span className="list"> 상의 </span>
            </Link>
            <Link to= '/view/bottom'>
                <span className="list"> 하의 </span>
            </Link>
            <Link to= '/view/accessories'>
                <span className="list"> 악세사리 </span>
            </Link>
            <Link to= '/view/beauty'>
                <span className="list"> 뷰티 </span>
            </Link>
            <div className="nav-button">
                <div />
                <div />
                <div />
            </div>
        </div>
    )
}

export default Nav;