// frontend/src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { getSweets } from '../services/api';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [floatingSweets, setFloatingSweets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    
    fetchSweets();
    
    // Create floating sweets
    const sweetsEmoji = ['🍬', '🍭', '🍫', '🥮'];
    const newFloatingSweets = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      emoji: sweetsEmoji[Math.floor(Math.random() * sweetsEmoji.length)],
      left: Math.random() * 85 + 5,
      top: Math.random() * 80 + 10,
      size: Math.random() * 25 + 15,
    }));
    setFloatingSweets(newFloatingSweets);
  }, [navigate]);

  const fetchSweets = async () => {
    try {
      const data = await getSweets();
      const sweetsWithINR = data.map(sweet => ({
        ...sweet,
        priceINR: sweet.price * 75
      }));
      setSweets(sweetsWithINR);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching sweets:', error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const stats = {
    totalSweets: sweets.length,
    totalValue: sweets.reduce((sum, sweet) => sum + (sweet.priceINR * sweet.quantity), 0),
    lowStock: sweets.filter(sweet => sweet.quantity < 10).length,
    outOfStock: sweets.filter(sweet => sweet.quantity === 0).length,
    categories: [...new Set(sweets.map(sweet => sweet.category))].length,
  };

  const styles = {
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '20px',
      minHeight: '100vh',
      position: 'relative',
      zIndex: 2,
      background: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '25px',
      marginTop: '20px',
      marginBottom: '20px',
      boxShadow: '0 8px 32px rgba(255, 193, 7, 0.15)',
    },
    welcomeBanner: {
      background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.9) 0%, rgba(74, 20, 140, 0.9) 100%)',
      borderRadius: '25px',
      padding: '50px',
      color: 'white',
      marginBottom: '50px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      backdropFilter: 'blur(10px)',
      position: 'relative',
      overflow: 'hidden',
    },
    welcomeText: {
      flex: 1,
      minWidth: '300px',
    },
    welcomeTitle: {
      fontSize: '40px',
      fontWeight: '800',
      marginBottom: '15px',
    },
    welcomeSubtitle: {
      fontSize: '20px',
      opacity: '0.9',
      maxWidth: '600px',
    },
    bannerDecor: {
      position: 'absolute',
      right: '30px',
      bottom: '20px',
      fontSize: '120px',
      opacity: '0.2',
      animation: 'bounceSweet 3s infinite',
    },
    logoutButton: {
      background: 'rgba(255, 255, 255, 0.2)',
      color: 'white',
      border: '2px solid white',
      padding: '15px 40px',
      borderRadius: '30px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '16px',
      transition: 'all 0.3s',
      backdropFilter: 'blur(10px)',
      ':hover': {
        background: 'rgba(255, 255, 255, 0.3)',
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(255, 255, 255, 0.2)',
      },
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '30px',
      marginBottom: '50px',
    },
    statCard: {
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 248, 225, 0.95))',
      borderRadius: '20px',
      padding: '35px',
      textAlign: 'center',
      boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
      transition: 'transform 0.3s, box-shadow 0.3s',
      cursor: 'pointer',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 204, 128, 0.3)',
      ':hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 20px 40px rgba(255, 193, 7, 0.2)',
      },
    },
    statIcon: {
      fontSize: '50px',
      marginBottom: '20px',
    },
    statNumber: {
      fontSize: '42px',
      fontWeight: '800',
      color: '#4A148C',
      marginBottom: '15px',
    },
    statLabel: {
      fontSize: '18px',
      color: '#718096',
      fontWeight: '600',
    },
    sectionTitle: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#2D3748',
      marginBottom: '35px',
      paddingBottom: '15px',
      borderBottom: '3px solid #FFCC80',
    },
    sweetsTable: {
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 248, 225, 0.95))',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 204, 128, 0.3)',
    },
    tableHeader: {
      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%)',
      color: 'white',
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
      padding: '25px',
      fontWeight: '600',
      fontSize: '16px',
      backdropFilter: 'blur(10px)',
    },
    tableRow: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
      padding: '25px',
      borderBottom: '2px solid #FFE0B2',
      alignItems: 'center',
      transition: 'all 0.3s',
      ':hover': {
        background: 'rgba(255, 248, 225, 0.7)',
      },
    },
    categoryBadge: {
      background: 'rgba(247, 250, 252, 0.9)',
      color: '#4A148C',
      padding: '8px 20px',
      borderRadius: '25px',
      fontSize: '14px',
      fontWeight: '600',
      display: 'inline-block',
      border: '1px solid #E2E8F0',
    },
    stockBadge: (quantity) => ({
      background: quantity === 0 ? 'rgba(254, 215, 215, 0.9)' : 
                 quantity < 10 ? 'rgba(254, 252, 191, 0.9)' : 
                 'rgba(198, 246, 213, 0.9)',
      color: quantity === 0 ? '#C53030' : quantity < 10 ? '#744210' : '#22543D',
      padding: '8px 20px',
      borderRadius: '25px',
      fontSize: '14px',
      fontWeight: '600',
      border: `2px solid ${quantity === 0 ? '#FED7D7' : quantity < 10 ? '#FEFCBF' : '#C6F6D5'}`,
    }),
    emptyState: {
      textAlign: 'center',
      padding: '80px 20px',
      color: '#718096',
      background: 'rgba(255, 248, 225, 0.5)',
      borderRadius: '20px',
    },
    emptyIcon: {
      fontSize: '80px',
      marginBottom: '30px',
      opacity: '0.4',
      animation: 'pulseSweet 3s infinite',
    },
    emptyText: {
      fontSize: '22px',
      color: '#718096',
    },
    loading: {
      textAlign: 'center',
      padding: '150px 0',
      fontSize: '24px',
      color: '#795548',
    },
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={{ fontSize: '60px', marginBottom: '30px', animation: 'spinSweet 2s linear infinite' }}>🍬</div>
        Loading your sweet dashboard...
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Floating Sweets */}
      {floatingSweets.map(sweet => (
        <div
          key={sweet.id}
          style={{
            position: 'fixed',
            left: `${sweet.left}%`,
            top: `${sweet.top}%`,
            fontSize: `${sweet.size}px`,
            opacity: '0.1',
            zIndex: 1,
            pointerEvents: 'none',
            animation: `floatSweet ${Math.random() * 10 + 15}s infinite ease-in-out`,
            animationDelay: `${Math.random() * 5}s`
          }}
        >
          {sweet.emoji}
        </div>
      ))}

      {/* Welcome Banner */}
      <div style={styles.welcomeBanner}>
        <div style={styles.welcomeText}>
          <h1 style={styles.welcomeTitle}>Welcome back, {user?.email.split('@')[0]}! 👋</h1>
          <p style={styles.welcomeSubtitle}>
            Manage your sweet shop inventory and track sales in real-time
          </p>
        </div>
        <div style={styles.bannerDecor}>💰</div>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>🍬</div>
          <div style={styles.statNumber}>{stats.totalSweets}</div>
          <div style={styles.statLabel}>Total Sweets</div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statIcon}>💰</div>
          <div style={styles.statNumber}>₹{stats.totalValue.toLocaleString()}</div>
          <div style={styles.statLabel}>Total Value</div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statIcon}>📊</div>
          <div style={styles.statNumber}>{stats.lowStock}</div>
          <div style={styles.statLabel}>Low Stock Items</div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statIcon}>🏷️</div>
          <div style={styles.statNumber}>{stats.categories}</div>
          <div style={styles.statLabel}>Categories</div>
        </div>
      </div>

      {/* Sweets Table */}
      <h2 style={styles.sectionTitle}>Inventory Overview</h2>
      
      {sweets.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>📦</div>
          <h3 style={styles.emptyText}>No sweets in inventory</h3>
          <p style={{ fontSize: '18px', marginTop: '10px' }}>Add sweets to get started</p>
        </div>
      ) : (
        <div style={styles.sweetsTable}>
          <div style={styles.tableHeader}>
            <div>Sweet Name</div>
            <div>Category</div>
            <div>Price (₹)</div>
            <div>Quantity</div>
            <div>Status</div>
          </div>
          
          {sweets.map((sweet, index) => (
            <div key={sweet._id || index} style={styles.tableRow}>
              <div style={{ fontWeight: '600', color: '#2D3748', fontSize: '16px' }}>
                {sweet.name}
              </div>
              <div>
                <span style={styles.categoryBadge}>{sweet.category}</span>
              </div>
              <div style={{ fontWeight: '700', color: '#4A148C', fontSize: '20px' }}>
                ₹{sweet.priceINR}
              </div>
              <div>
                <span style={styles.stockBadge(sweet.quantity)}>
                  {sweet.quantity} pcs
                </span>
              </div>
              <div>
                {sweet.quantity === 0 ? (
                  <span style={{ color: '#C53030', fontWeight: '600' }}>Out of Stock</span>
                ) : sweet.quantity < 10 ? (
                  <span style={{ color: '#744210', fontWeight: '600' }}>Low Stock</span>
                ) : (
                  <span style={{ color: '#22543D', fontWeight: '600' }}>In Stock</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;