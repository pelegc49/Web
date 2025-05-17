import React, {useState,useEffect, use} from 'react';
import {sun, moon, guest_user} from "../assets/svgs.jsx"
import "../index.css"
import { Link } from 'react-router-dom';
import {headerContainer, logo, icon} from "./Style.jsx"

export default function Header(){
    const isdarkMode = localStorage.getItem("darkMode") === "true";
    const [darkMode, setDarkMode] = useState(isdarkMode);
    useEffect(() => {
        localStorage.setItem("darkMode", darkMode);
    },[darkMode]);
    return(
        <header className={headerContainer(darkMode)}>
            <Link to="/home">
                <div className={logo}>
                    Tx2Class
                </div>
            </Link>
            <div>
                <div className="flex items-center gap-1 pr-2">
                    <img onClick={_=>setDarkMode(d=>!d)}
                         className={icon}
                         width="30px" src={darkMode ? moon : sun}
                         alt={darkMode ? "Dark" : "Light"} />
                    <img className={icon} 
                         width="30px" src={guest_user} alt="UserPic" />
                </div>
            </div>
        </header>
    )
}