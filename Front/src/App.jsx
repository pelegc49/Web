import './index.css'
import Header from "./components/Header.jsx"
import { Outlet } from 'react-router-dom'
import SyntaxHelp from "./components/SyntaxHelp.jsx"
 

function App() {
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
