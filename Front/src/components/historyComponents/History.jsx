// History.jsx displays a list of user's saved UML diagram projects
// This component provides a view of all previous projects and options to create new ones
// It supports dark mode theming and includes a navigation header with project creation button

import {React,useContext,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {darkModeContext} from "../../App.jsx"
import HistoryList from './HistoryList.jsx';
import {plus} from '../../assets/svgs.jsx';
import { 
  historyContainer, 
  historyContent, 
  historyHeader, 
  historyTitle, 
  historyAddLink, 
  historyAddIcon,
  tooltipContainer,
  tooltip
} from '../../assets/Style.jsx';

// History component manages the display of saved projects
// It provides a clean interface for viewing project history and creating new projects
export default function History() {
  // Get dark mode context for theming
  const { darkMode } = useContext(darkModeContext);

  // Ensure page starts at the top when viewing history
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  // Render the history view with header and project list
  return (
    <div className={historyContainer(darkMode)}>
      <div className={historyContent(darkMode)}>
        <div className={historyHeader}>
          <h1 className={historyTitle(darkMode)}>Project History</h1>
          <div className={tooltipContainer()}>
            <Link to="/app" className={historyAddLink}>
              <img src={plus} alt="Create new" width="28" height="28" className={historyAddIcon(darkMode)} />
            </Link>
            <div className={tooltip(darkMode)}>Create new project</div>
          </div>
        </div>
        <HistoryList />
      </div>
    </div>
  );
}