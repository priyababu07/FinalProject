import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BsGrid1X2Fill, 
  BsFillArchiveFill, 
  BsListCheck, 
  BsMenuButtonWideFill, 
  BsFillGearFill, 
  BsPeopleFill, 
  BsRobot, 
  BsTools 
} from 'react-icons/bs'; // Corrected import path for Bootstrap icons

import { FaBell } from 'react-icons/fa'; // Corrected import for FontAwesome icons
import './settings.css'; // Ensure the CSS path is correct

function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <aside id="sidebar" className={showSidebar ? '' : 'hidden'}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          FULMINE
        </div>
        <button onClick={toggleSidebar}>×</button> {/* Close button for toggling */}
      </div>
      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/">
            <BsGrid1X2Fill className="icon" /> {/* Corrected icon class */}
            Dashboard
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/automatic">
            <BsRobot className="icon" /> {/* Corrected icon class */}
            Automatic
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/manual">
            <BsTools className="icon" /> {/* Corrected icon class */}
            Manual
          </Link>
        </li>
        
        <li className="sidebar-list-item">
          <Link to="/production">
            <BsListCheck className="icon" /> {/* Corrected icon class */}
            Production rate
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/report">
            <BsMenuButtonWideFill className="icon" /> {/* Corrected icon class */}
            Reports
          </Link>
        </li>
      </ul>
      <ul className="sidebar-list">
       
        <li className="sidebar-list-item">
          <Link to="/profile">
            <BsPeopleFill className="icon" /> {/* Corrected icon class */}
            Profile
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
