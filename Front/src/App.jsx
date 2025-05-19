import './index.css'
import Header from "./components/Header.jsx"
import { Outlet, useNavigate } from 'react-router-dom'
import SyntaxHelp from "./components/SyntaxHelp.jsx"
 import { createContext, useContext, useEffect,useState } from 'react'

export const darkModeContext = createContext({darkMode: true, toggleDarkMode: () => {}});

function App() {
    const currentDarkMode = localStorage.getItem('darkMode') === 'true' ? true : false;
    const [isDark, setDark] = useState(currentDarkMode);
    const toggleDarkMode = () => {
        setDark(d=>!d);
    }
    useEffect(() => {
        localStorage.setItem('darkMode', isDark);
    }, [isDark]);


    const navigate = useNavigate()
     useEffect(() => {
        navigate('/home');
      }, []);
    
  return (
      <darkModeContext.Provider value={{darkMode: isDark, toggleDarkMode}}>
          <div className="App">
              <Header />
              <div className={isDark?'bg-gray-900':'bg-gray-100'}>
                <Outlet />
              </div>
          </div>
      </darkModeContext.Provider>
  )
}

export default App
