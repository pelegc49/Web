// Header.jsx
// This component renders the top navigation bar for the app, including logo, navigation icons, dark mode toggle, and user login/logout.
// It uses context for dark mode and receives user/auth handlers as props.

import React, { useContext } from 'react';
import { sun, moon, guest_user, help, createNew, history } from "../assets/svgs.jsx";
import "../index.css";
import { Link, useLocation } from 'react-router-dom';
import { headerContainer, logo, icon } from "../assets/Style.jsx";
import { darkModeContext } from "../App.jsx";

export default function Header({ onLoginClick, onLogout, user }) {
    const location = useLocation();
    // Get dark mode state and toggle function from context
    const { darkMode, toggleDarkMode } = useContext(darkModeContext);

    return (
        <header className={headerContainer(darkMode)}>
            {/* Logo links to home page */}
            <Link to="/home">
                <div className={logo}>
                    Tx2Class
                </div>
            </Link>
            <div>
                <div className="flex items-center">
                    {/* Help icon: disables link if already on /help */}
                    <Link className={icon} to={location.pathname.startsWith("/help") ? "#" : "/help"} >
                        <img width="30px" src={help} alt="help" />
                    </Link>
                    {/* Dark mode toggle icon: switches between sun/moon */}
                    <img onClick={_ => toggleDarkMode(d => !d)}
                        className={icon}
                        width="30px" src={darkMode ? moon : sun}
                        alt={darkMode ? "Dark" : "Light"} />
                    {/* Create new project/app icon */}
                    <Link className={icon} to={"/app"} >
                        <img width="30px" src={createNew} alt="app" />
                    </Link>
                    {/* History icon: navigates to project history */}
                    <Link className={icon} to={"/history"} >
                        <img width="30px" src={history} alt="history" />
                    </Link>
                    {/* User icon: triggers login or logout depending on user state */}
                    <img className={icon}
                        width="30px" src={guest_user} alt="UserPic"
                        style={{ cursor: "pointer" }}
                        onClick={user ? onLogout : onLoginClick}
                    />
                </div>
            </div>
        </header>
    );
}