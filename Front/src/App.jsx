import './index.css'
import Header from "./components/Header.jsx"
import { Outlet } from 'react-router-dom'


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
