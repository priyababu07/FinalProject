import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './sidebar';
import Home from './home';
import Reports from './report';
import Profile from './profile';
import Automatic from './automatic';
import Manual from './manual';
import ProductionChart from './production';

function Dashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const toggleSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className={`grid-container ${openSidebarToggle ? 'sidebar-open' : ''}`}>
      <Sidebar open={openSidebarToggle} toggleSidebar={toggleSidebar} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/production" element={<ProductionChart />} />
        <Route path="/automatic" element={<Automatic />} />
        <Route path="/manual" element={<Manual />} />
        <Route path="/report" element={<Reports />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default Dashboard;
