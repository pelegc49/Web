import {React, useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {darkModeContext} from "../../App.jsx"
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
} from '../../assets/Style.jsx';

export default function HistoryList() {
  const { darkMode } = useContext(darkModeContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);  useEffect(() => {
    // Project data with name and text
    const fakeProjects = [
      { name: 'proj1', text: 'a person is a class.' },
      { name: 'proj2', text: 'a student is a class.' },
    //   { name: 'proj3', text: 'A teacher has students.' },
    //   { name: 'proj4', text: 'An employee works at a company.' },
    //   { name: 'proj5', text: 'A manager manages employees.' }
    ];
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
            {project.name}
          </span>          <div className={historyButtonsContainer}>
            <Link to="/app" state={{ projectText: project.text }}>
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