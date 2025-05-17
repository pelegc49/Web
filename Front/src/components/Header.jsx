import React, {useState} from 'react';
import {sun, moon, guest_user} from "../assets/svgs.jsx"
import "../index.css"
export default function Header(){
    const [darkMode, setDarkMode] = useState(false);
    return(
        <header className={"p-4 flex justify-between text-white duration-200 ease-in-out "+ (darkMode ? "bg-gray-500" : "bg-gray-300")}>
            <div className="cursor-pointer text-black font-bold text-2xl duration-300 ease-in-out hover:opacity-30">
                Tx2Class
            </div>
            <div>
                <div className="cursor-pointer flex items-center gap-1 pr-2">
                    <img onClick={() => setDarkMode(!darkMode)}
                         className="duration-300 ease-in-out hover:opacity-30"
                         width="30px" src={darkMode ? moon : sun}
                         alt={darkMode ? "Dark" : "Light"} />
                    <img className="duration-300 ease-in-out hover:opacity-30" 
                         width="30px" src={guest_user} alt="UserPic" />
                </div>
            </div>
        </header>
    )
}