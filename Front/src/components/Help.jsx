import {React,useContext,useEffect} from 'react';
import SyntaxHelp from "./SyntaxHelp.jsx"
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { toolbarContainer, toolbarNav, toolbarLink, toolbarDivider } from './Style.jsx';
import {darkModeContext} from "../App.jsx"
export default function Help() {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useContext(darkModeContext);
  // const isDark = useContext(darkModeContext);

  useEffect(() => {
    // Redirect to web-help by default on initial load
    if (location.pathname === '/help') {
      navigate('web-help');
    }
    // Scroll to top whenever the help route changes
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div>
      <nav className={toolbarContainer(darkMode)}>
        <div className={toolbarNav}>
          <Link to="web-help" className={toolbarLink(darkMode)}>Web Help</Link>
          <span className={toolbarDivider(darkMode)}>|</span>
          <Link to="sign-up" className={toolbarLink(darkMode)}>Sign Up Help</Link>
          <span className={toolbarDivider(darkMode)}>|</span>
          <Link to="syntax" className={toolbarLink(darkMode)}>Syntax Help</Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );

}