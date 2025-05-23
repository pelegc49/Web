import './index.css'
import Header from "./components/Header.jsx"
import { Outlet, useNavigate } from 'react-router-dom'
import { createContext, useLayoutEffect, useEffect, useState } from 'react'
import axios from 'axios'
// import Login from './components/Login.jsx'
// import SignUp from './components/SignUp.jsx'

export const darkModeContext = createContext({darkMode: true, toggleDarkMode: () => {}});

function App() {
    const [data, setData] = useState({});
    useLayoutEffect(()=>{
        let user = {
            name: "John Doe",
            email: "john@doe",
            password: "123456",
            dob: "2000-01-01",
            signupDate: "2023-01-01",
            userId: "1234567890"
        }
        user = JSON.stringify(user);
        axios.post(`/api/users/${user}`).then(res=>{setData(res.data)})
    },[]);

    const currentDarkMode = localStorage.getItem('darkMode') === 'true' ? true : false;
    const [isDark, setDark] = useState(currentDarkMode);
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

    return (
        <darkModeContext.Provider value={{darkMode: isDark, toggleDarkMode}}>
            <div className="App">
                {/* <p>{JSON.stringify(data.name)}</p> */}
                <Header onLoginClick={() => setShowLogin(true)} />
                <div className={isDark?'bg-gray-900 text-white':'bg-gray-100 text-black'}>
                    <Outlet context={{
                        onLoginClick: () => setShowLogin(true),
                        onSignUpClick: () => setShowSignUp(true)
                    }} />
                </div>
                {/* <Login
                    open={showLogin}
                    onClose={() => setShowLogin(false)}
                    onSignUpClick={() => {
                        setShowLogin(false);
                        setShowSignUp(true);
                    }}
                />
                <SignUp
                    open={showSignUp}
                    onClose={() => setShowSignUp(false)}
                /> */}
            </div>
        </darkModeContext.Provider>
    )
}

export default App
