import {React,useContext,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {darkModeContext} from "../App.jsx"
import HistoryList from './HistoryList.jsx';
import {plus} from '../assets/svgs.jsx';
import { 
  historyContainer, 
  historyContent, 
  historyHeader, 
  historyTitle, 
  historyAddLink, 
  historyAddIcon,
  tooltipContainer,
  tooltip
} from './Style.jsx';

export default function History() {
  const { darkMode } = useContext(darkModeContext);

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

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