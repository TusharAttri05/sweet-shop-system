// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import DancingSweets from './components/Effects/DancingSweets';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ShopPage from './pages/ShopPage';
import DashboardPage from './pages/DashboardPage';
import SweetCollectionsPage from './pages/SweetCollectionsPage'; // Add this
import './index.css';

function App() {
  return (
    <Router>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 25%, #FFE082 50%, #FFD54F 75%, #FFCA28 100%)',
        fontFamily: "'Poppins', sans-serif",
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Dancing Sweets Background Effect */}
        <DancingSweets count={25} />
        
        <div style={{ position: 'relative', zIndex: 10 }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/collections" element={<SweetCollectionsPage />} />
            <Route path="/collections/:categoryId" element={<SweetCollectionsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;