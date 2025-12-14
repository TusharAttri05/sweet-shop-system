// frontend/src/components/Layout/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get page title based on route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/collections')) return 'Sweet Collections';
    if (path.includes('/shop')) return 'Sweet Shop';
    if (path.includes('/dashboard')) return 'Dashboard';
    if (path.includes('/login')) return 'Login';
    if (path.includes('/register')) return 'Register';
    return 'Attri Sweet House';
  };

  // Get icon based on route
  const getPageIcon = () => {
    const path = location.pathname;
    if (path.includes('/collections')) return '🍭';
    if (path.includes('/shop')) return '🛍️';
    if (path.includes('/dashboard')) return '📊';
    if (path.includes('/login')) return '🔐';
    if (path.includes('/register')) return '📝';
    return '🍬';
  };

  return (
    <nav style={{
      background: scrolled ? 'rgba(211, 47, 47, 0.95)' : 'linear-gradient(135deg, #D32F2F 0%, #FF6F00 100%)',
      color: 'white',
      padding: scrolled ? '10px 20px' : '15px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      transition: 'all 0.3s ease',
      boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.1)' : 'none',
      backdropFilter: 'blur(10px)',
    }}>
      <Link to="/" style={{ 
        color: 'white', 
        textDecoration: 'none', 
        fontSize: '24px', 
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
      }}>
        <span style={{
          background: 'white',
          color: '#D32F2F',
          width: '45px',
          height: '45px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '22px',
          animation: 'bounceSweet 2s infinite'
        }}>
          {getPageIcon()}
        </span>
        <span>
          {getPageTitle()}
          {location.pathname === '/' && (
            <span style={{
              fontSize: '14px',
              fontWeight: 'normal',
              display: 'block',
              opacity: '0.9'
            }}>
              Since 1985
            </span>
          )}
        </span>
      </Link>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/" style={{ 
          color: 'white', 
          textDecoration: 'none',
          padding: '8px 16px',
          borderRadius: '20px',
          transition: 'all 0.3s',
          background: location.pathname === '/' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
          ':hover': {
            background: 'rgba(255, 255, 255, 0.2)'
          }
        }}>Home</Link>
        <Link to="/collections" style={{ 
          color: 'white', 
          textDecoration: 'none',
          padding: '8px 16px',
          borderRadius: '20px',
          transition: 'all 0.3s',
          background: location.pathname.includes('/collections') ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
          ':hover': {
            background: 'rgba(255, 255, 255, 0.2)'
          }
        }}>Collections</Link>
        <Link to="/shop" style={{ 
          color: 'white', 
          textDecoration: 'none',
          padding: '8px 16px',
          borderRadius: '20px',
          transition: 'all 0.3s',
          background: location.pathname === '/shop' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
          ':hover': {
            background: 'rgba(255, 255, 255, 0.2)'
          }
        }}>Shop</Link>
        <Link to="/login" style={{ 
          color: 'white', 
          textDecoration: 'none',
          padding: '8px 16px',
          borderRadius: '20px',
          transition: 'all 0.3s',
          background: location.pathname === '/login' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
          ':hover': {
            background: 'rgba(255, 255, 255, 0.2)'
          }
        }}>Login</Link>
        <Link to="/register" style={{ 
          color: '#D32F2F', 
          textDecoration: 'none', 
          background: 'white', 
          padding: '10px 20px',
          borderRadius: '25px',
          fontWeight: 'bold',
          transition: 'all 0.3s',
          boxShadow: '0 4px 15px rgba(255, 193, 7, 0.3)',
          ':hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(255, 193, 7, 0.5)'
          }
        }}>Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;