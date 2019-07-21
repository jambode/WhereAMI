import React from 'react';
import '../Hamburger/HamburgerToggle';
import './Toolbar.css';
import hamburgerToggle from '../Hamburger/HamburgerToggle';

const toolbar = props => (



    <header className="toolbar">
        <nav className="toolbar_navigation">
            <div></div>
            <div className="toolbar_logo">
                <a href="/">LOGO</a></div>
                <div className="spacer" />
            <div className="toolbar_navigation-items">
                <ul>
                    <li><a href="/">logo</a></li>
                    
                    <li><a href="/">menu 1</a></li>
                    <li><a href="/">logo</a></li>
                    <li><a href="/">logo</a></li>
                </ul>
            </div>
        </nav>
    </header>
);
export default toolbar;