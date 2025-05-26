import React, { useContext } from 'react';
import { sun, moon, guest_user, help, createNew, history } from "../assets/svgs.jsx";
import "../index.css";
import { Link, useLocation } from 'react-router-dom';
import { headerContainer, logo, icon } from "./Style.jsx";
import { darkModeContext } from "../App.jsx";

export default function Header({ onLoginClick }) {
    const location = useLocation();
    const { darkMode, toggleDarkMode } = useContext(darkModeContext);

    return (
        <header className={headerContainer(darkMode)}>
            <Link to="/home">
                <div className={logo}>
                    Tx2Class
                </div>
            </Link>
            <div>
                <div className="flex items-center">
                    <Link className={icon} to={location.pathname.startsWith("/help") ? "#" : "/help"} >
                        <img width="30px" src={help} alt="help" />
                    </Link>
                    <img onClick={_ => toggleDarkMode(d => !d)}
                        className={icon}
                        width="30px" src={darkMode ? moon : sun}
                        alt={darkMode ? "Dark" : "Light"} />
                    <Link className={icon} to={"/app"} >
                        <img width="30px" src={createNew} alt="app" />
                    </Link>
                    <Link className={icon} to={"/history"} >
                        <img width="30px" src={history} alt="history" />
                    </Link>
                    {/* <img className={icon}
                        width="30px" src={guest_user} alt="UserPic"
                        style={{ cursor: "pointer" }}
                        onClick={onLoginClick}
                    /> */}
                </div>
            </div>
        </header>
    );
}