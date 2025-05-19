import './index.css'
import Header from "./components/Header.jsx"
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


function App() {
    const navigate = useNavigate()
     useEffect(() => {
        navigate('/home');
      }, []);
    
  return (
      <>
          <div className="App">
              <Header /> 
              <Outlet />
          </div>
      </>
  )
}

export default App
