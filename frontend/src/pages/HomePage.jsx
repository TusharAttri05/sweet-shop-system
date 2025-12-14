// frontend/src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [floatingSweets, setFloatingSweets] = useState([]);

  useEffect(() => {
    // Create floating sweets for empty spaces
    const sweets = ['🍬', '🍭', '🍫', '🥮', '🍰', '🧁', '🍩', '🍪'];
    const newFloatingSweets = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      emoji: sweets[Math.floor(Math.random() * sweets.length)],
      left: Math.random() * 90 + 5,
      top: Math.random() * 80 + 10,
      size: Math.random() * 30 + 20,
      animationDelay: Math.random() * 5,
      animationDuration: Math.random() * 10 + 15
    }));
    setFloatingSweets(newFloatingSweets);
  }, []);

  const categories = [
    { id: 'all', name: 'All Sweets', icon: '🍬', color: '#FF6B6B' },
    { id: 'mithai', name: 'Traditional Mithai', icon: '🥮', color: '#4ECDC4' },
    { id: 'chocolate', name: 'Chocolate Sweets', icon: '🍫', color: '#45B7D1' },
    { id: 'dryfruit', name: 'Dry Fruit Sweets', icon: '🌰', color: '#96CEB4' },
    { id: 'namkeen', name: 'Namkeen & Snacks', icon: '🥨', color: '#FFEAA7' },
    { id: 'bakery', name: 'Bakery Items', icon: '🍰', color: '#DDA0DD' },
    { id: 'sugarfree', name: 'Sugar-Free', icon: '🩺', color: '#98D8C8' },
    { id: 'festival', name: 'Festival Special', icon: '🎉', color: '#F7DC6F' },
  ];

  const allSweets = {
    mithai: [
      { id: 1, name: 'Gulab Jamun', price: '₹250/kg', description: 'Soft, syrupy delight' },
      { id: 2, name: 'Rasgulla', price: '₹200/kg', description: 'Bengali specialty' },
      { id: 3, name: 'Ladoo', price: '₹300/kg', description: 'Festival favorite' },
      { id: 4, name: 'Jalebi', price: '₹180/kg', description: 'Crispy and sweet' },
      { id: 5, name: 'Rasmalai', price: '₹350/kg', description: 'Creamy milk dessert' },
      { id: 6, name: 'Barfi', price: '₹400/kg', description: 'Milk-based sweet' },
      { id: 7, name: 'Halwa', price: '₹280/kg', description: 'Semolina dessert' },
      { id: 8, name: 'Peda', price: '₹450/kg', description: 'Milk fudge' },
    ],
    chocolate: [
      { id: 9, name: 'Chocolate Truffle', price: '₹500/kg', description: 'Rich chocolate balls' },
      { id: 10, name: 'Chocolate Barfi', price: '₹550/kg', description: 'Chocolate milk sweet' },
      { id: 11, name: 'Chocolate Ladoo', price: '₹480/kg', description: 'Chocolate coated' },
      { id: 12, name: 'Chocolate Cake', price: '₹600/kg', description: 'Moist chocolate cake' },
      { id: 13, name: 'Chocolate Cookies', price: '₹350/kg', description: 'Crispy cookies' },
      { id: 14, name: 'Chocolate Peda', price: '₹520/kg', description: 'Chocolate milk fudge' },
      { id: 15, name: 'Chocolate Roll', price: '₹580/kg', description: 'Chocolate coated roll' },
    ],
    dryfruit: [
      { id: 16, name: 'Kaju Katli', price: '₹900/kg', description: 'Cashew diamond sweet' },
      { id: 17, name: 'Pista Roll', price: '₹850/kg', description: 'Pistachio roll' },
      { id: 18, name: 'Badam Barfi', price: '₹800/kg', description: 'Almond sweet' },
      { id: 19, name: 'Dry Fruit Mix', price: '₹1200/kg', description: 'Mixed dry fruits' },
    ],
    namkeen: [
      { id: 20, name: 'Mathri', price: '₹200/kg', description: 'Crispy savory' },
      { id: 21, name: 'Namak Para', price: '₹180/kg', description: 'Salty crackers' },
      { id: 22, name: 'Chiwda', price: '₹220/kg', description: 'Flattened rice mix' },
      { id: 23, name: 'Bhujia', price: '₹250/kg', description: 'Crispy snack' },
    ],
    bakery: [
      { id: 24, name: 'Cake Rusk', price: '₹150/pack', description: 'Crispy cake slices' },
      { id: 25, name: 'Biscuits', price: '₹120/pack', description: 'Assorted biscuits' },
      { id: 26, name: 'Toast', price: '₹100/pack', description: 'Sweet toast' },
    ],
    sugarfree: [
      { id: 27, name: 'Sugar-Free Ladoo', price: '₹400/kg', description: 'Diabetic friendly' },
      { id: 28, name: 'Sugar-Free Barfi', price: '₹450/kg', description: 'No sugar added' },
    ],
    festival: [
      { id: 29, name: 'Diwali Special', price: '₹999/kg', description: 'Festival combo' },
      { id: 30, name: 'Holi Gujiya', price: '₹350/kg', description: 'Festival sweet' },
    ],
  };

  const getSweetsToShow = () => {
    if (activeCategory === 'all') {
      return Object.values(allSweets).flat();
    }
    return allSweets[activeCategory] || [];
  };

  return (
    <div style={styles.container}>
      {/* Floating Sweets in Background */}
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
            animation: `floatSweet ${sweet.animationDuration}s infinite ease-in-out`,
            animationDelay: `${sweet.animationDelay}s`
          }}
        >
          {sweet.emoji}
        </div>
      ))}

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroDecoration}>🎂</div>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Welcome to <span style={styles.highlight}>Attri Sweet House</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Serving traditional Indian sweets with love and authenticity since 1985.
            Experience the legacy of taste passed down through generations.
          </p>
          <div style={styles.heroButtons}>
            <Link to="/shop" style={styles.primaryButton}>
              🛍️ Shop Now
            </Link>
            <Link to="/register" style={styles.secondaryButton}>
              🎁 Join Sweet Club
            </Link>
          </div>
          <div style={styles.awards}>
            <span style={styles.awardBadge}>🏆 Best Sweet Shop 2023</span>
            <span style={styles.awardBadge}>⭐ 4.9/5 Rating</span>
            <span style={styles.awardBadge}>👨‍👩‍👧‍👦 Family Owned</span>
          </div>
        </div>
        <div style={styles.heroImage}>
          <div style={styles.sweetDisplay}>
            <span style={{ animation: 'bounceSweet 2s infinite' }}>🥮</span>
            <span style={{ animation: 'bounceSweet 2s infinite 0.2s' }}>🍬</span>
            <span style={{ animation: 'bounceSweet 2s infinite 0.4s' }}>🍫</span>
            <span style={{ animation: 'bounceSweet 2s infinite 0.6s' }}>🍰</span>
          </div>
        </div>
      </section>

      // In the HomePage.jsx component, update the categories section:

{/* Categories Section */}
<section style={styles.section}>
  <h2 style={styles.sectionTitle}>Our Sweet Collections</h2>
  <p style={styles.sectionSubtitle}>Click on categories to view sweets</p>
  
  <div style={styles.categoriesGrid}>
    {categories.map((category) => (
      <Link 
        key={category.id}
        to={`/collections/${category.id}`}
        style={{
          ...styles.categoryButton,
          textDecoration: 'none',
        }}
      >
        <span style={{
          ...styles.categoryIcon,
          animation: activeCategory === category.id ? 'bounceSweet 1s infinite' : 'none'
        }}>
          {category.icon}
        </span>
        <span style={styles.categoryName}>{category.name}</span>
      </Link>
    ))}
  </div>
</section>

      {/* Sweets Display */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>
          {activeCategory === 'all' ? 'All Sweets' : `${categories.find(c => c.id === activeCategory)?.name}`}
          <span style={styles.countBadge}> ({getSweetsToShow().length} items)</span>
        </h2>
        
        {getSweetsToShow().length > 0 ? (
          <div style={styles.sweetsGrid}>
            {getSweetsToShow().map((sweet) => (
              <div key={sweet.id} style={styles.sweetCard}>
                <div style={styles.sweetImage}>
                  {sweet.name.includes('Chocolate') ? '🍫' : 
                   sweet.name.includes('Dry') ? '🌰' : 
                   sweet.name.includes('Namkeen') ? '🥨' : '🥮'}
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
            <p>No sweets found in this category</p>
          </div>
        )}
      </section>

      {/* Offers Section */}
      <section style={styles.offersSection}>
        <h2 style={styles.sectionTitle}>Special Offers & Diwali Discounts</h2>
        <div style={styles.offersGrid}>
          <div style={styles.offerCard}>
            <div style={styles.offerIcon}>🎉</div>
            <h3>Diwali Dhamaka</h3>
            <p>Flat 20% off on all festival sweets</p>
            <small>Valid till Nov 15</small>
          </div>
          <div style={styles.offerCard}>
            <div style={styles.offerIcon}>🎁</div>
            <h3>Combo Offer</h3>
            <p>Buy 2kg sweets, get 500g free</p>
            <small>On selected items</small>
          </div>
          <div style={styles.offerCard}>
            <div style={styles.offerIcon}>🚚</div>
            <h3>Free Delivery</h3>
            <p>Free home delivery on orders above ₹1000</p>
            <small>Across Delhi NCR</small>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section style={styles.aboutSection}>
        <h2 style={styles.sectionTitle}>About Attri Sweet House</h2>
        <div style={styles.aboutContent}>
          <div style={styles.aboutText}>
            <p>
              Established in 1985, Attri Sweet House has been serving authentic Indian sweets 
              to generations of families. Our sweets are made using traditional recipes passed 
              down through our family, ensuring the same authentic taste that our customers love.
            </p>
            <p>
              We use only the finest ingredients - pure desi ghee, fresh milk, and premium dry fruits. 
              No preservatives, no artificial colors, just pure sweetness made with love.
            </p>
            <div style={styles.contactInfo}>
              <p><span style={styles.contactIcon}>📍</span> Shop No. 45, Main Market, Delhi</p>
              <p><span style={styles.contactIcon}>📞</span> +91 9876543210</p>
              <p><span style={styles.contactIcon}>⏰</span> 9:00 AM - 10:00 PM (7 days a week)</p>
            </div>
          </div>
          <div style={styles.aboutImage}>
            <div style={styles.imagePlaceholder}>🏪</div>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    position: 'relative',
    zIndex: 2,
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(255, 215, 0, 0.15)',
    marginTop: '20px',
    marginBottom: '20px',
  },
  heroSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '50px 20px',
    background: 'linear-gradient(135deg, rgba(255, 224, 178, 0.9), rgba(255, 204, 128, 0.9), rgba(255, 193, 7, 0.9))',
    borderRadius: '25px',
    marginBottom: '50px',
    position: 'relative',
    overflow: 'hidden',
  },
  heroDecoration: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    fontSize: '100px',
    opacity: '0.1',
    animation: 'spinSweet 30s linear infinite',
  },
  heroContent: {
    maxWidth: '800px',
    position: 'relative',
    zIndex: 2,
  },
  heroTitle: {
    fontSize: '52px',
    fontWeight: 'bold',
    color: '#5D4037',
    marginBottom: '20px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
  },
  highlight: {
    color: '#D32F2F',
    background: 'linear-gradient(45deg, #D32F2F, #FF6F00)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroSubtitle: {
    fontSize: '20px',
    color: '#795548',
    marginBottom: '35px',
    lineHeight: '1.6',
  },
  heroButtons: {
    display: 'flex',
    gap: '25px',
    justifyContent: 'center',
    marginBottom: '35px',
    flexWrap: 'wrap',
  },
  primaryButton: {
    background: 'linear-gradient(45deg, #D32F2F, #FF6F00)',
    color: 'white',
    padding: '18px 40px',
    borderRadius: '50px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '20px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 6px 20px rgba(211, 47, 47, 0.3)',
    ':hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 10px 25px rgba(211, 47, 47, 0.4)',
    },
  },
  secondaryButton: {
    background: 'transparent',
    color: '#D32F2F',
    padding: '18px 40px',
    borderRadius: '50px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '20px',
    border: '3px solid #D32F2F',
    cursor: 'pointer',
    transition: 'all 0.3s',
    ':hover': {
      background: '#D32F2F',
      color: 'white',
      transform: 'translateY(-3px)',
    },
  },
  awards: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  awardBadge: {
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '12px 25px',
    borderRadius: '30px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#5D4037',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    transition: 'all 0.3s',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
    },
  },
  heroImage: {
    marginTop: '40px',
  },
  sweetDisplay: {
    fontSize: '80px',
    display: 'flex',
    gap: '30px',
    justifyContent: 'center',
  },
  section: {
    marginBottom: '60px',
  },
  sectionTitle: {
    fontSize: '40px',
    fontWeight: 'bold',
    color: '#5D4037',
    marginBottom: '20px',
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: '20px',
    color: '#795548',
    marginBottom: '40px',
    textAlign: 'center',
  },
  countBadge: {
    fontSize: '24px',
    color: '#D32F2F',
    marginLeft: '15px',
  },
  categoriesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
    marginBottom: '50px',
  },
  categoryButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '25px 15px',
    border: '2px solid',
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    },
  },
  categoryIcon: {
    fontSize: '50px',
    marginBottom: '15px',
  },
  categoryName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#5D4037',
  },
  sweetsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
  },
  sweetCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '25px',
    boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
    transition: 'all 0.3s',
    border: '1px solid #FFE0B2',
    ':hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 15px 35px rgba(255, 193, 7, 0.2)',
    },
  },
  sweetImage: {
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
    padding: '12px 25px',
    borderRadius: '25px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '16px',
    transition: 'all 0.3s',
    ':hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 5px 15px rgba(76, 175, 80, 0.3)',
    },
  },
  noItems: {
    textAlign: 'center',
    padding: '60px',
    color: '#795548',
    background: 'rgba(255, 248, 225, 0.5)',
    borderRadius: '20px',
  },
  noItemsIcon: {
    fontSize: '80px',
    marginBottom: '20px',
    opacity: '0.5',
  },
  offersSection: {
    background: 'linear-gradient(135deg, rgba(255, 243, 224, 0.9), rgba(255, 224, 178, 0.9))',
    padding: '50px 40px',
    borderRadius: '25px',
    marginBottom: '60px',
  },
  offersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '30px',
  },
  offerCard: {
    background: 'white',
    padding: '35px',
    borderRadius: '20px',
    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
    textAlign: 'center',
    transition: 'all 0.3s',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 15px 35px rgba(255, 193, 7, 0.2)',
    },
  },
  offerIcon: {
    fontSize: '50px',
    marginBottom: '20px',
    animation: 'bounceSweet 2s infinite',
  },
  aboutSection: {
    background: 'white',
    padding: '50px',
    borderRadius: '25px',
    boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
  },
  aboutContent: {
    display: 'flex',
    gap: '50px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  aboutText: {
    flex: 2,
    minWidth: '300px',
  },
  aboutImage: {
    flex: 1,
    textAlign: 'center',
    minWidth: '250px',
  },
  imagePlaceholder: {
    fontSize: '120px',
    color: '#FFCC80',
    animation: 'pulseSweet 3s infinite',
  },
  contactInfo: {
    marginTop: '30px',
    padding: '25px',
    background: 'linear-gradient(135deg, #FFF8E1, #FFECB3)',
    borderRadius: '15px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
  },
  contactIcon: {
    marginRight: '10px',
    fontSize: '20px',
  },
};

export default HomePage;