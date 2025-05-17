import React, {useState} from 'react';
import {sun, moon, guest_user} from "../assets/svgs.jsx"
import "../index.css"
export default function Header(){

    const [darkMode, setDarkMode] = useState(false);
    return(
        <header className={"flex justify-between text-white p-4 duration-200 ease-in-out "+ (darkMode ? "bg-gray-500" : "bg-gray-300")}>
            <div className="cursor-pointer">
                Tx2Class
            </div>
            <div>
                {/*light/dark mode*/}
                <div className="cursor-pointer"
                  onClick={() => setDarkMode(!darkMode)}>
                  <img className="duration-200 ease-in-out hover:opacity-30" width="30px" src={darkMode ? moon : sun} alt={darkMode ? "Dark" : "Light"} />
                    <img width="30px" src={guest_user} alt="UserPic" />
                </div>
            </div>
        </header>
    )
}