import React from 'react';
import SyntaxHelp from "./SyntaxHelp.jsx"
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { toolbarContainer, toolbarNav, toolbarLink, toolbarDivider } from './Style.jsx';

export default function Help() {
  const navigate = useNavigate();

  React.useEffect(() => {
    // Redirect to web-help by default
    navigate('web-help');
  }, []);

  return (
    <div>
      <nav className={toolbarContainer}>
        <div className={toolbarNav}>
          <Link to="web-help" className={toolbarLink}>Web Help</Link>
          <span className={toolbarDivider}>|</span>
          <Link to="sign-up" className={toolbarLink}>Sign Up Help</Link>
          <span className={toolbarDivider}>|</span>
          <Link to="syntax" className={toolbarLink}>Syntax Help</Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}