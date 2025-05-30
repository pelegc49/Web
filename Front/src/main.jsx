import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import HomePage from './components/HomePage.jsx'
import UserProfile from './components/userComponents/UserProfile.jsx'
import Help from './components/helpComponents/Help.jsx'
import SignUpHelp from './components/helpComponents/SignUpHelp.jsx'
import SyntaxHelp from './components/helpComponents/SyntaxHelp.jsx'
import WebHelp from './components/helpComponents/WebHelp.jsx'
import Application from './components/applicationComponents/Application.jsx'
import History from './components/historyComponents/History.jsx'

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
      },
      {path: '/history', element: <History />}
  ],
},])

createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
  </>,
)
