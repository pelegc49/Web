import {React,useContext,useEffect} from 'react';
import SyntaxHelp from "./SyntaxHelp.jsx"
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { toolbarContainer, toolbarNav, toolbarLink, toolbarDivider } from './Style.jsx';
import {darkModeContext} from "../App.jsx"
export default function Help() {
  const navigate = useNavigate();

  const { darkMode, toggleDarkMode } = useContext(darkModeContext);
  // const isDark = useContext(darkModeContext);

  useEffect(() => {
    // Redirect to web-help by default
    navigate('web-help');
  }, []);

  return (
    <div>
      <nav className={toolbarContainer(darkMode)}>
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



  // return (
  //   <div>
  //     <nav >
  //       <div>
  //         <Link to="web-help" >Web Help</Link>
  //         <span >|</span>
  //         <Link to="sign-up" >Sign Up Help</Link>
  //         <span >|</span>
  //         <Link to="syntax" >Syntax Help</Link>
  //       </div>
  //     </nav>
  //     <Outlet />
  //   </div>
  // );
}