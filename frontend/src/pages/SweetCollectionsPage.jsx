// frontend/src/pages/SweetCollectionsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const SweetCollectionsPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(categoryId || 'all');
  const [floatingSweets, setFloatingSweets] = useState([]);

  useEffect(() => {
    if (categoryId) {
      setSelectedCategory(categoryId);
    }
    
    // Create floating sweets
    const sweets = ['🍬', '🍭', '🍫', '🥮', '🍰', '🧁', '🍩', '🍪'];
    const newFloatingSweets = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      emoji: sweets[Math.floor(Math.random() * sweets.length)],
      left: Math.random() * 90 + 5,
      top: Math.random() * 80 + 10,
      size: Math.random() * 25 + 15,
    }));
    setFloatingSweets(newFloatingSweets);
  }, [categoryId]);

  const categories = [
    { 
      id: 'all', 
      name: 'All Sweets', 
      icon: '🍬', 
      color: '#FF6B6B',
      description: 'Browse all our delicious sweet varieties in one place'
    },
    { 
      id: 'mithai', 
      name: 'Traditional Mithai', 
      icon: '🥮', 
      color: '#4ECDC4',
      description: 'Authentic Indian sweets made with traditional recipes'
    },
    { 
      id: 'chocolate', 
      name: 'Chocolate Sweets', 
      icon: '🍫', 
      color: '#45B7D1',
      description: 'Rich chocolate-based sweets and desserts'
    },
    { 
      id: 'dryfruit', 
      name: 'Dry Fruit Sweets', 
      icon: '🌰', 
      color: '#96CEB4',
      description: 'Premium sweets made with nuts and dry fruits'
    },
    { 
      id: 'namkeen', 
      name: 'Namkeen & Snacks', 
      icon: '🥨', 
      color: '#FFEAA7',
      description: 'Savory snacks and crispy delights'
    },
    { 
      id: 'bakery', 
      name: 'Bakery Items', 
      icon: '🍰', 
      color: '#DDA0DD',
      description: 'Freshly baked cakes, cookies and pastries'
    },
    { 
      id: 'sugarfree', 
      name: 'Sugar-Free', 
      icon: '🩺', 
      color: '#98D8C8',
      description: 'Delicious sweets without added sugar'
    },
    { 
      id: 'festival', 
      name: 'Festival Special', 
      icon: '🎉', 
      color: '#F7DC6F',
      description: 'Special sweets for festivals and celebrations'
    },
  ];

  const categorySweets = {
    all: [
      { id: 1, name: 'Gulab Jamun', category: 'mithai', price: '₹250/kg', description: 'Soft, syrupy milk dumplings' },
      { id: 2, name: 'Chocolate Truffle', category: 'chocolate', price: '₹500/kg', description: 'Rich chocolate balls' },
      { id: 3, name: 'Kaju Katli', category: 'dryfruit', price: '₹900/kg', description: 'Cashew diamond sweet' },
      { id: 4, name: 'Mathri', category: 'namkeen', price: '₹200/kg', description: 'Crispy savory snack' },
      { id: 5, name: 'Cake Rusk', category: 'bakery', price: '₹150/pack', description: 'Crispy cake slices' },
      { id: 6, name: 'Sugar-Free Ladoo', category: 'sugarfree', price: '₹400/kg', description: 'Diabetic friendly sweet' },
      { id: 7, name: 'Diwali Special', category: 'festival', price: '₹999/kg', description: 'Festival combo pack' },
    ],
    mithai: [
      { id: 1, name: 'Gulab Jamun', price: '₹250/kg', description: 'Soft, syrupy milk dumplings' },
      { id: 2, name: 'Rasgulla', price: '₹200/kg', description: 'Soft cottage cheese balls in sugar syrup' },
      { id: 3, name: 'Ladoo', price: '₹300/kg', description: 'Round sweet balls made of flour and sugar' },
      { id: 4, name: 'Jalebi', price: '₹180/kg', description: 'Crispy, syrupy spiral sweets' },
      { id: 5, name: 'Rasmalai', price: '₹350/kg', description: 'Soft cheese patties in sweetened milk' },
      { id: 6, name: 'Barfi', price: '₹400/kg', description: 'Milk-based fudge-like sweet' },
      { id: 7, name: 'Halwa', price: '₹280/kg', description: 'Semolina-based sweet pudding' },
      { id: 8, name: 'Peda', price: '₹450/kg', description: 'Milk fudge sweet' },
    ],
    chocolate: [
      { id: 9, name: 'Chocolate Truffle', price: '₹500/kg', description: 'Rich chocolate balls with soft center' },
      { id: 10, name: 'Chocolate Barfi', price: '₹550/kg', description: 'Milk sweet with chocolate flavor' },
      { id: 11, name: 'Chocolate Ladoo', price: '₹480/kg', description: 'Chocolate coated sweet balls' },
      { id: 12, name: 'Chocolate Cake', price: '₹600/kg', description: 'Moist chocolate cake' },
      { id: 13, name: 'Chocolate Cookies', price: '₹350/kg', description: 'Crispy chocolate cookies' },
      { id: 14, name: 'Chocolate Peda', price: '₹520/kg', description: 'Chocolate flavored milk fudge' },
      { id: 15, name: 'Chocolate Roll', price: '₹580/kg', description: 'Chocolate coated sweet roll' },
    ],
    dryfruit: [
      { id: 16, name: 'Kaju Katli', price: '₹900/kg', description: 'Diamond shaped cashew sweet' },
      { id: 17, name: 'Pista Roll', price: '₹850/kg', description: 'Pistachio flavored sweet roll' },
      { id: 18, name: 'Badam Barfi', price: '₹800/kg', description: 'Almond-based sweet' },
      { id: 19, name: 'Dry Fruit Mix', price: '₹1200/kg', description: 'Assorted dry fruit sweets' },
      { id: 20, name: 'Akrod Katli', price: '₹950/kg', description: 'Walnut based sweet' },
      { id: 21, name: 'Mewa Peda', price: '₹880/kg', description: 'Mixed dry fruit fudge' },
    ],
    namkeen: [
      { id: 22, name: 'Mathri', price: '₹200/kg', description: 'Crispy savory crackers' },
      { id: 23, name: 'Namak Para', price: '₹180/kg', description: 'Salty diamond shaped snacks' },
      { id: 24, name: 'Chiwda', price: '₹220/kg', description: 'Flattened rice snack mix' },
      { id: 25, name: 'Bhujia', price: '₹250/kg', description: 'Crispy gram flour snack' },
      { id: 26, name: 'Dalmoth', price: '₹280/kg', description: 'Spicy lentil snack' },
      { id: 27, name: 'Khatta Meetha', price: '₹240/kg', description: 'Sweet and savory mix' },
    ],
    bakery: [
      { id: 28, name: 'Cake Rusk', price: '₹150/pack', description: 'Crispy toasted cake slices' },
      { id: 29, name: 'Biscuits', price: '₹120/pack', description: 'Assorted sweet biscuits' },
      { id: 30, name: 'Toast', price: '₹100/pack', description: 'Sweetened bread toast' },
      { id: 31, name: 'Cookies', price: '₹180/kg', description: 'Freshly baked cookies' },
      { id: 32, name: 'Puff Pastry', price: '₹220/kg', description: 'Flaky pastry with sweet fillings' },
    ],
    sugarfree: [
      { id: 33, name: 'Sugar-Free Ladoo', price: '₹400/kg', description: 'Sweet balls without sugar' },
      { id: 34, name: 'Sugar-Free Barfi', price: '₹450/kg', description: 'Milk sweet without sugar' },
      { id: 35, name: 'Sugar-Free Cake', price: '₹550/kg', description: 'Sugar-free cake' },
      { id: 36, name: 'Sugar-Free Peda', price: '₹480/kg', description: 'Sugar-free milk fudge' },
    ],
    festival: [
      { id: 37, name: 'Diwali Special', price: '₹999/kg', description: 'Assorted sweets for Diwali' },
      { id: 38, name: 'Holi Gujiya', price: '₹350/kg', description: 'Sweet dumplings for Holi' },
      { id: 39, name: 'Rakhi Special', price: '₹850/kg', description: 'Sweet box for Raksha Bandhan' },
      { id: 40, name: 'Eid Special', price: '₹750/kg', description: 'Assorted sweets for Eid' },
      { id: 41, name: 'Christmas Cake', price: '₹650/kg', description: 'Special fruit cake for Christmas' },
    ],
  };

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);
  const sweetsToShow = categorySweets[selectedCategory] || [];

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    navigate(`/collections/${categoryId}`);
  };

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
            opacity: '0.15',
            zIndex: 1,
            pointerEvents: 'none',
            animation: `floatSweet ${Math.random() * 10 + 15}s infinite ease-in-out`,
            animationDelay: `${Math.random() * 5}s`
          }}
        >
          {sweet.emoji}
        </div>
      ))}

      {/* Header with Back Button */}
      <div style={styles.header}>
        <Link to="/" style={styles.backButton}>
          ← Back to Home
        </Link>
        <div style={styles.headerTitle}>
          <span style={styles.headerIcon}>🍭</span>
          <h1 style={styles.mainTitle}>Attri Sweet Collections</h1>
        </div>
        <p style={styles.headerSubtitle}>Discover our wide variety of traditional and modern sweets</p>
      </div>

      <div style={styles.mainContent}>
        {/* Categories Section */}
        <section style={styles.categoriesSection}>
          <h2 style={styles.sectionTitle}>Our Sweet Collections</h2>
          <p style={styles.sectionSubtitle}>Click on categories to view sweets</p>
          
          <div style={styles.categoriesGrid}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                style={{
                  ...styles.categoryButton,
                  background: selectedCategory === category.id 
                    ? `linear-gradient(135deg, ${category.color}, ${category.color}DD)` 
                    : 'rgba(255, 255, 255, 0.9)',
                  borderColor: selectedCategory === category.id ? category.color : '#FFCC80',
                  animation: selectedCategory === category.id ? 'pulseSweet 2s infinite' : 'none',
                }}
              >
                <span style={{
                  ...styles.categoryIcon,
                  fontSize: selectedCategory === category.id ? '45px' : '40px',
                }}>
                  {category.icon}
                </span>
                <span style={styles.categoryName}>{category.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Selected Category Details */}
        <section style={styles.detailsSection}>
          {selectedCategoryData && (
            <div style={styles.categoryHeader}>
              <div style={{
                ...styles.categoryHeaderIcon,
                background: `linear-gradient(135deg, ${selectedCategoryData.color}, ${selectedCategoryData.color}DD)`
              }}>
                <span style={{ fontSize: '50px' }}>{selectedCategoryData.icon}</span>
              </div>
              <div style={styles.categoryHeaderInfo}>
                <h2 style={styles.categoryTitle}>
                  {selectedCategoryData.name}
                  <span style={styles.itemCount}> ({sweetsToShow.length} items)</span>
                </h2>
                <p style={styles.categoryDescription}>{selectedCategoryData.description}</p>
              </div>
            </div>
          )}

          {/* Sweets Grid */}
          {sweetsToShow.length > 0 ? (
            <div style={styles.sweetsGrid}>
              {sweetsToShow.map((sweet) => (
                <div key={sweet.id} style={styles.sweetCard}>
                  <div style={styles.sweetIcon}>
                    {selectedCategoryData?.icon || '🍬'}
                  </div>
                  <div style={styles.sweetInfo}>
                    <h3 style={styles.sweetName}>{sweet.name}</h3>
                    <p style={styles.sweetDescription}>{sweet.description}</p>
                    <div style={styles.sweetFooter}>
                      <div style={styles.sweetPrice}>{sweet.price}</div>
                      <button style={styles.addButton}>
                        🛒 Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.noItems}>
              <div style={styles.noItemsIcon}>🍬</div>
              <p style={styles.noItemsText}>No sweets found in this category</p>
            </div>
          )}
        </section>
      </div>

      {/* Quick Links */}
      <div style={styles.quickLinks}>
        <Link to="/shop" style={styles.quickLink}>
          🛍️ Shop All Sweets
        </Link>
        <Link to="/" style={styles.quickLink}>
          🏠 Back to Home
        </Link>
        <Link to="/dashboard" style={styles.quickLink}>
          📊 View Dashboard
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '20px',
    minHeight: '100vh',
    position: 'relative',
    zIndex: 2,
    background: 'linear-gradient(135deg, rgba(255, 248, 225, 0.9), rgba(255, 236, 179, 0.9))',
    borderRadius: '25px',
    marginTop: '20px',
    marginBottom: '20px',
    boxShadow: '0 15px 40px rgba(255, 193, 7, 0.2)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '50px',
    padding: '30px',
    background: 'linear-gradient(135deg, rgba(255, 224, 178, 0.9), rgba(255, 204, 128, 0.9))',
    borderRadius: '20px',
    backdropFilter: 'blur(10px)',
    border: '3px solid rgba(255, 193, 7, 0.4)',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: '30px',
    top: '30px',
    background: 'rgba(255, 255, 255, 0.9)',
    color: '#5D4037',
    textDecoration: 'none',
    padding: '12px 25px',
    borderRadius: '25px',
    fontWeight: '600',
    fontSize: '16px',
    border: '2px solid #FFCC80',
    transition: 'all 0.3s',
    ':hover': {
      background: '#FFCC80',
      transform: 'translateX(-5px)',
    },
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '15px',
  },
  headerIcon: {
    fontSize: '50px',
    animation: 'bounceSweet 2s infinite',
  },
  mainTitle: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#5D4037',
    textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
  },
  headerSubtitle: {
    fontSize: '20px',
    color: '#795548',
    maxWidth: '800px',
    margin: '0 auto',
  },
  mainContent: {
    display: 'grid',
    gridTemplateColumns: '350px 1fr',
    gap: '40px',
    marginBottom: '50px',
  },
  categoriesSection: {
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(255, 204, 128, 0.4)',
  },
  sectionTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#5D4037',
    marginBottom: '15px',
    paddingBottom: '15px',
    borderBottom: '3px solid #FFCC80',
  },
  sectionSubtitle: {
    fontSize: '18px',
    color: '#795548',
    marginBottom: '30px',
  },
  categoriesGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '15px',
  },
  categoryButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '20px',
    border: '3px solid',
    borderRadius: '15px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    textAlign: 'left',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
    },
  },
  categoryIcon: {
    fontSize: '40px',
    transition: 'all 0.3s',
  },
  categoryName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#5D4037',
  },
  detailsSection: {
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(255, 204, 128, 0.4)',
  },
  categoryHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
    marginBottom: '40px',
    paddingBottom: '30px',
    borderBottom: '3px solid #FFCC80',
  },
  categoryHeaderIcon: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
  },
  categoryHeaderInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#5D4037',
    marginBottom: '10px',
  },
  itemCount: {
    fontSize: '24px',
    color: '#D32F2F',
    marginLeft: '15px',
  },
  categoryDescription: {
    fontSize: '18px',
    color: '#795548',
    lineHeight: '1.6',
  },
  sweetsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '25px',
  },
  sweetCard: {
    background: 'linear-gradient(135deg, rgba(255, 243, 224, 0.9), rgba(255, 236, 179, 0.9))',
    borderRadius: '20px',
    padding: '25px',
    transition: 'all 0.3s',
    border: '2px solid #FFCC80',
    ':hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 15px 35px rgba(255, 193, 7, 0.3)',
    },
  },
  sweetIcon: {
    fontSize: '60px',
    textAlign: 'center',
    marginBottom: '20px',
    animation: 'pulseSweet 2s infinite',
  },
  sweetInfo: {
    textAlign: 'center',
  },
  sweetName: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#5D4037',
    marginBottom: '12px',
  },
  sweetDescription: {
    color: '#795548',
    fontSize: '15px',
    marginBottom: '20px',
    minHeight: '45px',
    lineHeight: '1.5',
  },
  sweetFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sweetPrice: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#D32F2F',
  },
  addButton: {
    background: 'linear-gradient(45deg, #4CAF50, #45B7D1)',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'all 0.3s',
    ':hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 5px 15px rgba(76, 175, 80, 0.3)',
    },
  },
  noItems: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#795548',
    background: 'rgba(255, 248, 225, 0.5)',
    borderRadius: '20px',
  },
  noItemsIcon: {
    fontSize: '80px',
    marginBottom: '20px',
    opacity: '0.5',
    animation: 'bounceSweet 3s infinite',
  },
  noItemsText: {
    fontSize: '22px',
    color: '#795548',
  },
  quickLinks: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '50px',
    paddingTop: '30px',
    borderTop: '3px solid #FFCC80',
    flexWrap: 'wrap',
  },
  quickLink: {
    background: 'linear-gradient(45deg, #D32F2F, #FF6F00)',
    color: 'white',
    textDecoration: 'none',
    padding: '15px 30px',
    borderRadius: '25px',
    fontWeight: '600',
    fontSize: '16px',
    transition: 'all 0.3s',
    ':hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 10px 25px rgba(211, 47, 47, 0.3)',
    },
  },
};

export default SweetCollectionsPage;