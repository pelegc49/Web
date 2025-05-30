import './index.css'
import Header from "./components/Header.jsx"
import { Outlet, useNavigate } from 'react-router-dom'
import { createContext, useEffect, useState } from 'react'
import Login from "./components/userComponents/Login.jsx"
import SignUp from "./components/userComponents/SignUp.jsx"

export const darkModeContext = createContext({darkMode: true, toggleDarkMode: () => {}});

function App() {
    const currentDarkMode = localStorage.getItem('darkMode') === 'true' ? true : false;
    const [isDark, setDark] = useState(currentDarkMode);
    const [user, setUser] = useState(null);
    
    const toggleDarkMode = () => {
        setDark(d=>!d);
    }
    
    useEffect(() => {
        localStorage.setItem('darkMode', isDark);
    }, [isDark]);

    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);

    const navigate = useNavigate()
    
    useEffect(() => {
        navigate('/home');
    }, []);

    // Simple handlers for showing/hiding modals
    const handleShowLogin = () => {
        setShowSignUp(false); // Close signup if open
        setShowLogin(true);
    };

    const handleShowSignUp = () => {
        setShowLogin(false); // Close login if open
        setShowSignUp(true);
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
        console.log('Authentication successful:', userData);
        // You can add additional logic here like redirecting to a dashboard
    };

    return (
        <darkModeContext.Provider value={{darkMode: isDark, toggleDarkMode}}>
            <div className="App">
                <Header 
                    onLoginClick={handleShowLogin} 
                    user={user}
                    onLogout={() => setUser(null)}
                />
                <div className={isDark?'bg-gray-900 text-white':'bg-gray-100 text-black'}>
                    <Outlet context={{
                        onLoginClick: handleShowLogin,
                        onSignUpClick: handleShowSignUp,
                        user: user
                    }} />
                </div>
                
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