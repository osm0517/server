import React from "react";
import './Nav.css';
import {BrowserRouter, Routes, Route, Switch, Link} from 'react-router-dom';

function Nav() {

    return(
        <div className="nav">
            <span ><a className="list" href="/view/top">상의</a></span>
            <span ><a className="list" href="/view/bottom">하의</a></span>
            <span ><a className="list" href="/view/accessories">악세사리</a></span>
            <span ><a className="list" href="/view/beauty">뷰티</a></span>
            <div className="nav-button">
                <div />
                <div />
                <div />
            </div>
        </div>
    )
}

export default Nav;