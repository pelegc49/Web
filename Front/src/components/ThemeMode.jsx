import React, {useState} from 'react';
import sun from '../assets/sun.svg';
import moon from '../assets/moon.svg';

export const ThemeMode = () => ({handleChange, isChecked}) => {
    return(
        <button className="cursor-pointer">
            <img width="30px" src={sun/*should be changed to support light/dark mode*/} alt="Light" />
        </button>
    )
}