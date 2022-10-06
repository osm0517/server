import React from "react";
import './Nav.css';
import {BrowserRouter, Routes, Route, Switch, Link} from 'react-router-dom';

function Nav() {

    return(
        <div className="nav">
            <span ><a className="list" href="/view/top">TOP</a></span>
            <span ><a className="list" href="/view/bottom">BOTTOM</a></span>
            <span ><a className="list" href="/view/accessories">ACC</a></span>
            <span ><a className="list" href="/view/beauty">BEAUTY</a></span>
            <div className="nav-button">
                <div />
                <div />
                <div />
            </div>
        </div>
    )
}

export default Nav;