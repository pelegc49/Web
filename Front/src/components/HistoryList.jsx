import {React, useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {darkModeContext} from "../App.jsx"
import {
  historyListContainer,
  historyItemContainer,
  historyItemText,
  historyButtonsContainer,
  historyOpenButton,
  historyDeleteButton,
  historyLoadingContainer,
  historyLoadingSpinner,
  historyEmptyContainer,
  historyCreateButton
} from './Style.jsx';

export default function HistoryList() {
  const { darkMode } = useContext(darkModeContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simple list of project names
    const fakeProjects = ['proj1', 'proj2', 'proj3', 'proj4', 'proj5'];
    // const fakeProjects = [];
    // Simulate fetching data
    setTimeout(() => {
      setProjects(fakeProjects);
      setLoading(false);
    }, 500);
  }, []); // Empty dependency array as fakeProjects is now inside the effect

  if (loading) {
    return (
      <div className={historyLoadingContainer}>
        <div className={historyLoadingSpinner}></div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className={historyEmptyContainer(darkMode)}>
        <p>No projects found.</p>
        <Link to="/app">
          <button className={historyCreateButton(darkMode)}>
            Create Project
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className={historyListContainer}>
      {projects.map((project, index) => (
        <div 
          key={index} 
          className={historyItemContainer(darkMode)}
        >
          <span className={historyItemText(darkMode)}>
            {project}
          </span>
          <div className={historyButtonsContainer}>
            <Link to="/app">
              <button className={historyOpenButton(darkMode)}>
                Open
              </button>
            </Link>
            <button 
              className={historyDeleteButton(darkMode)}
              onClick={() => setProjects(projects.filter(p => p !== project))}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}