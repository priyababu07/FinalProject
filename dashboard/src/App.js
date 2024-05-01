import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Components/login';
import Dashboard from './Components/dashboard';
import Landing from './Components/Landing';
import About from './Components/about';
import NavigationBar from './Components/NavigationBar';
import Sidebar from './Components/sidebar';
import Home from './Components/home';
import Reports from './Components/report';
import Profile from './Components/profile';
import Automatic from './Components/automatic';
import Manual from './Components/manual';
import ProductionChart from './Components/production';
// import ServicesPage from './Components/service';
function App() {
  return (
    
     <Router>
        <NavigationBar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/service" element={<ServicesPage />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/production" element={<ProductionChart />} />
        <Route path="/automatic" element={<Automatic />} />
        <Route path="/manual" element={<Manual />} />
        <Route path="/report" element={<Reports />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
     </Router>
  );
}

export default App;
