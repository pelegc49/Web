import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import HomePage from './components/HomePage.jsx'
import UserProfile from './components/UserProfile.jsx'
import Help from './components/Help.jsx'
import SignUpHelp from './components/SignUpHelp.jsx'
import SyntaxHelp from './components/SyntaxHelp.jsx'
import WebHelp from './components/WebHelp.jsx'
import Application from './components/Application.jsx'

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  children: [
      { path: '/home', element: <HomePage /> },
      { path: '/user', element: <UserProfile /> },
      { path: '/app', element: <Application /> },
      { path: '/help', element: <Help />, children: [
        {
          path: 'sign-up',
          element: <SignUpHelp />,
        },
        {
          path: 'syntax',
          element: <SyntaxHelp />,
        },
        {
          path: 'web-help',
          element: <WebHelp />,
        }
        ]
      }
  ],
},])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
