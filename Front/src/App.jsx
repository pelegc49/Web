import './index.css'
import Header from "./components/Header.jsx"
import { Outlet, useNavigate,useLocation } from 'react-router-dom'
import { createContext, useEffect, useState } from 'react'
import Login from "./components/userComponents/Login.jsx"
import SignUp from "./components/userComponents/SignUp.jsx"
import Logout from "./components/userComponents/Logout.jsx"
import {allPaths} from './main.jsx'
export const darkModeContext = createContext({darkMode: true, toggleDarkMode: () => {}});

function App() {
    const currentDarkMode = localStorage.getItem('darkMode') === 'true' ? true : false;
    const [isDark, setDark] = useState(currentDarkMode);
    const [user, setUser] = useState(null);
    const location = useLocation()
    const toggleDarkMode = () => {
        setDark(d=>!d);
    }
    
    useEffect(() => {
        localStorage.setItem('darkMode', isDark);
    }, [isDark]);

    const [showLogin, setShowLogin] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);

    const navigate = useNavigate()
    
    // if the path is not a defined route, navigate to the haome page
    useEffect(() => {
        if(location.pathname ==="/" || allPaths.indexOf(location.pathname) === -1)
            navigate('/home');
    }, []);

    // Simple handlers for showing/hiding modals
    const handleShowLogin = () => {
        setShowSignUp(false); // Close signup if open
        setShowLogin(true);
    };
    const handleShowLogout = () => {
        setShowLogout(true);
    };

    const handleShowSignUp = () => {
        setShowLogin(false); // Close login if open
        setShowSignUp(true);
    };

    const handleCloseLogout = () => {
        setShowLogout(false);
    };
    const handleCloseLogin = () => {
        setShowLogin(false);
    };

    const handleCloseSignUp = () => {
        setShowSignUp(false);
    };

    // Handle successful authentication
    const handleAuthSuccess = (userData) => {
        setUser(userData);
        alert('login successful');
        console.log('Authentication successful:', userData);
        
    };

    return (
        <darkModeContext.Provider value={{darkMode: isDark, toggleDarkMode}}>
            <div className="App">
                <Header 
                    onLoginClick={handleShowLogin} 
                    user={user}
                    onLogout={handleShowLogout}
                />
                <div className={isDark?'bg-gray-900 text-white':'bg-gray-100 text-black'}>
                    <Outlet context={{
                        onLoginClick: handleShowLogin,
                        onSignUpClick: handleShowSignUp,
                        user: user
                    }} />
                </div>
                
                <Logout
                    user={user}
                    onClose={handleCloseLogout}
                    onLogoutClick={
                        () => {
                            setUser(null);
                            alert('logout successful');
                            console.log('User logged out');
                            handleCloseLogout();
                        }
                    }
                    open={showLogout}
                />
                {/* Login Modal */}
                <Login 
                    open={showLogin}
                    onClose={handleCloseLogin}
                    onSignUpClick={handleShowSignUp}
                    onSuccess={handleAuthSuccess}
                />
                
                {/* SignUp Modal */}
                <SignUp 
                    open={showSignUp}
                    onClose={handleCloseSignUp}
                    onSuccess={handleAuthSuccess}
                />
            </div>
        </darkModeContext.Provider>
    )
}

export default App