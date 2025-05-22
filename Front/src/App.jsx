import './index.css'
import Header from "./components/Header.jsx"
import { Outlet, useNavigate } from 'react-router-dom'
import SyntaxHelp from "./components/SyntaxHelp.jsx"
import { createContext, useContext,useLayoutEffect, useEffect,useState } from 'react'
import ClassNodeTest from './components/ClassNodeTest.jsx'
import axios from 'axios'

export const darkModeContext = createContext({darkMode: true, toggleDarkMode: () => {}});

function App() {
    const [data, setData] = useState({});
    useLayoutEffect(()=>{
        axios.get("/api").then(res=>{setData(res.data)})
    },[]);

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
              {/* <p>{JSON.stringify(data)}</p> */}
              <div className={isDark?'bg-gray-900 text-white':'bg-gray-100 text-black'}>
                <Outlet />
              </div>
          </div>
      </darkModeContext.Provider>
  )
}

export default App
