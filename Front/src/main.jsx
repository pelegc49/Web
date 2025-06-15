import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import HomePage from './components/HomePage.jsx'
import Help from './components/helpComponents/Help.jsx'
import SignUpHelp from './components/helpComponents/SignUpHelp.jsx'
import SyntaxHelp from './components/helpComponents/SyntaxHelp.jsx'
import WebHelp from './components/helpComponents/WebHelp.jsx'
import Application from './components/applicationComponents/Application.jsx'
import History from './components/historyComponents/History.jsx'

// define the router with all routes
const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  children: [
      { path: 'home', element: <HomePage /> },
      { path: 'app', element: <Application /> },
      { path: 'help', element: <Help />, children: [
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
      {path: 'history', element: <History />},
      {path: '*', element: <App />}
  ],
},]);

// Function to recursively get all paths from the router configuration
const getAllPaths = (routes, parentPath = '') => {
  let paths = [];
  
  routes.forEach(route => {
    const routePath = route.path?.startsWith('/') ? route.path.slice(1) : route.path || '';
    const fullPath = parentPath ? `${parentPath}/${routePath}` : `/${routePath}`;
    paths.push(fullPath.replace(/\/+/g, '/'));
    
    if (route.children) {
      paths = [...paths, ...getAllPaths(route.children, fullPath)];
    }
  });
  
  return paths;
};

export const allPaths = getAllPaths(router.routes);

// render the application with the router
createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
  </>,
)
