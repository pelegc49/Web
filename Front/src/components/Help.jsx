import React from 'react';
import SyntaxHelp from "./SyntaxHelp.jsx"
import { Link, Outlet } from 'react-router-dom';

export default function Help() {
  return (
      <>
      <button><Link to="sign-up">Sign Up Help</Link></button>
      <button><Link to="syntax">Syntax Help</Link></button>
      <button><Link to="web-help">Web Help</Link> </button>
       <Outlet />
      </>
  )
}