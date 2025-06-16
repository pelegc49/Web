// Help.jsx provides the navigation structure for all help-related content
// This component serves as the parent container for different help sections
// It includes a navigation bar and handles routing between help topics

import {React,useContext,useEffect} from 'react';
import SyntaxHelp from "./SyntaxHelp.jsx"
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { toolbarContainer, toolbarNav, toolbarLink, toolbarDivider } from '../../assets/Style.jsx';
import {darkModeContext} from "../../App.jsx"

// Help component manages the help section navigation and content display
// It provides links to different help topics and handles default routing
export default function Help() {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useContext(darkModeContext);
// const isDark = useContext(darkModeContext);


  // Handle initial navigation and scroll behavior
  useEffect(() => {
    // Redirect to web-help by default when accessing the help section
    if (location.pathname === '/help') {
      navigate('web-help');
    }
    // Ensure the page starts at the top when navigating between help sections
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Render the help navigation bar and content area
  return (
    <div className='min-h-screen'>
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