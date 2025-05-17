import React, {useState} from 'react';
import {sun,moon} from '../assets/svgs.jsx';
export const ThemeMode = () => ({handleChange, isChecked}) => {
    return(
        <button className="cursor-pointer">
            <img width="30px" src={sun/*should be changed to support light/dark mode*/} alt="Light" />
        </button>
    )
}