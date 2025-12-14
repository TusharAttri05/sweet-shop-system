// frontend/src/pages/ShopPage.jsx
import React, { useState, useEffect } from 'react';

const ShopPage = () => {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [floatingSweets, setFloatingSweets] = useState([]);

  useEffect(() => {
    const sweets = ['🍬', '🍭', '🍫', '🥮', '🍰', '🧁', '🍩', '🍪'];
    const newFloatingSweets = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      emoji: sweets[Math.floor(Math.random() * sweets.length)],
      left: Math.random() * 90 + 5,
      top: Math.random() * 80 + 10,
      size: Math.random() * 25 + 15,
    }));
    setFloatingSweets(newFloatingSweets);
  }, []);

  const sweetsData = [
    { id: 1, name: 'Gulab Jamun', category: 'mithai', price: 250, unit: 'kg' },
    { id: 2, name: 'Rasgulla', category: 'mithai', price: 200, unit: 'kg' },
    { id: 3, name: 'Ladoo', category: 'mithai', price: 300, unit: 'kg' },
    { id: 4, name: 'Jalebi', category: 'mithai', price: 180, unit: 'kg' },
    { id: 5, name: 'Rasmalai', category: 'mithai', price: 350, unit: 'kg' },
    { id: 6, name: 'Barfi', category: 'mithai', price: 400, unit: 'kg' },
    { id: 7, name: 'Halwa', category: 'mithai', price: 280, unit: 'kg' },
    { id: 8, name: 'Peda', category: 'mithai', price: 450, unit: 'kg' },
    { id: 9, name: 'Chocolate Truffle', category: 'chocolate', price: 500, unit: 'kg' },
    { id: 10, name: 'Chocolate Barfi', category: 'chocolate', price: 550, unit: 'kg' },
    { id: 11, name: 'Chocolate Ladoo', category: 'chocolate', price: 480, unit: 'kg' },
    { id: 12, name: 'Chocolate Cake', category: 'chocolate', price: 600, unit: 'kg' },
    { id: 13, name: 'Chocolate Cookies', category: 'chocolate', price: 350, unit: 'kg' },
    { id: 14, name: 'Chocolate Peda', category: 'chocolate', price: 520, unit: 'kg' },
    { id: 15, name: 'Chocolate Roll', category: 'chocolate', price: 580, unit: 'kg' },
    { id: 16, name: 'Kaju Katli', category: 'dryfruit', price: 900, unit: 'kg' },
    { id: 17, name: 'Pista Roll', category: 'dryfruit', price: 850, unit: 'kg' },
    { id: 18, name: 'Badam Barfi', category: 'dryfruit', price: 800, unit: 'kg' },
    { id: 19, name: 'Dry Fruit Mix', category: 'dryfruit', price: 1200, unit: 'kg' },
    { id: 20, name: 'Mathri', category: 'namkeen', price: 200, unit: 'kg' },
    { id: 21, name: 'Namak Para', category: 'namkeen', price: 180, unit: 'kg' },
    { id: 22, name: 'Chiwda', category: 'namkeen', price: 220, unit: 'kg' },
    { id: 23, name: 'Bhujia', category: 'namkeen', price: 250, unit: 'kg' },
    { id: 24, name: 'Cake Rusk', category: 'bakery', price: 150, unit: 'pack' },
    { id: 25, name: 'Biscuits', category: 'bakery', price: 120, unit: 'pack' },
    { id: 26, name: 'Toast', category: 'bakery', price: 100, unit: 'pack' },
    { id: 27, name: 'Sugar-Free Ladoo', category: 'sugarfree', price: 400, unit: 'kg' },
    { id: 28, name: 'Sugar-Free Barfi', category: 'sugarfree', price: 450, unit: 'kg' },
    { id: 29, name: 'Diwali Special', category: 'festival', price: 999, unit: 'kg' },
    { id: 30, name: 'Holi Gujiya', category: 'festival', price: 350, unit: 'kg' },
  ];

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

  const filteredSweets = selectedCategory === 'all' 
    ? sweetsData 
    : sweetsData.filter(sweet => sweet.category === selectedCategory);

  const addToCart = (sweet) => {
    const existingItem = cart.find(item => item.id === sweet.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === sweet.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...sweet, quantity: 1 }]);
    }
    alert(`${sweet.name} added to cart!`);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart(cart.map(item => 
      item.id === id 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
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
            opacity: '0.12',
            zIndex: 1,
            pointerEvents: 'none',
            animation: `floatSweet ${Math.random() * 10 + 15}s infinite ease-in-out`,
            animationDelay: `${Math.random() * 5}s`
          }}
        >
          {sweet.emoji}
        </div>
      ))}

      <div style={styles.header}>
        <h1 style={styles.title}>Attri Sweet House - Shop</h1>
        <p style={styles.subtitle}>Choose from our wide variety of traditional and modern sweets</p>
      </div>

      <div style={styles.mainLayout}>
        {/* Categories Sidebar */}
        <div style={styles.sidebar}>
          <h3 style={styles.sidebarTitle}>Categories</h3>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              style={{
                ...styles.categoryItem,
                background: selectedCategory === category.id 
                  ? `linear-gradient(45deg, ${category.color}, ${category.color}DD)` 
                  : 'white',
                borderColor: selectedCategory === category.id ? category.color : '#FFCC80',
              }}
            >
              <span style={styles.categoryIcon}>{category.icon}</span>
              <span style={styles.categoryText}>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Sweets Grid */}
        <div style={styles.content}>
          <h2 style={styles.categoryTitle}>
            {categories.find(c => c.id === selectedCategory)?.name} 
            <span style={styles.itemCount}> ({filteredSweets.length} items)</span>
          </h2>
          
          <div style={styles.sweetsGrid}>
            {filteredSweets.map(sweet => (
              <div key={sweet.id} style={styles.sweetCard}>
                <div style={styles.sweetIcon}>
                  {sweet.category === 'chocolate' ? '🍫' : 
                   sweet.category === 'dryfruit' ? '🌰' : 
                   sweet.category === 'namkeen' ? '🥨' : 
                   sweet.category === 'bakery' ? '🍰' : '🥮'}
                </div>
                <div style={styles.sweetDetails}>
                  <h3 style={styles.sweetName}>{sweet.name}</h3>
                  <p style={styles.sweetCategory}>{categories.find(c => c.id === sweet.category)?.name}</p>
                  <p style={styles.sweetPrice}>₹{sweet.price}/{sweet.unit}</p>
                  <button 
                    onClick={() => addToCart(sweet)}
                    style={styles.addButton}
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Sidebar */}
        <div style={styles.cartSidebar}>
          <h3 style={styles.cartTitle}>
            <span style={styles.cartIcon}>🛒</span> Your Cart ({cart.length} items)
          </h3>
          
          {cart.length === 0 ? (
            <div style={styles.emptyCart}>
              <div style={styles.emptyCartIcon}>🛒</div>
              <p>Your cart is empty</p>
              <p>Add some sweets!</p>
            </div>
          ) : (
            <>
              <div style={styles.cartItems}>
                {cart.map(item => (
                  <div key={item.id} style={styles.cartItem}>
                    <div style={styles.cartItemInfo}>
                      <div style={styles.cartItemName}>{item.name}</div>
                      <div style={styles.cartItemPrice}>₹{item.price}/{item.unit}</div>
                    </div>
                    <div style={styles.cartItemControls}>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={styles.quantityButton}
                      >
                        -
                      </button>
                      <span style={styles.quantity}>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={styles.quantityButton}
                      >
                        +
                      </button>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        style={styles.removeButton}
                      >
                        ❌
                      </button>
                    </div>
                    <div style={styles.cartItemTotal}>
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={styles.cartSummary}>
                <div style={styles.cartTotal}>
                  <span>Total:</span>
                  <span style={styles.totalAmount}>₹{getTotalAmount()}</span>
                </div>
                <button style={styles.checkoutButton}>
                  🚚 Proceed to Checkout
                </button>
                <button 
                  onClick={() => setCart([])}
                  style={styles.clearButton}
                >
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </div>
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
    background: 'rgba(255, 248, 225, 0.85)',
    borderRadius: '25px',
    marginTop: '20px',
    marginBottom: '20px',
    boxShadow: '0 8px 32px rgba(255, 193, 7, 0.15)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '50px',
    padding: '30px',
    background: 'linear-gradient(135deg, rgba(255, 224, 178, 0.9), rgba(255, 204, 128, 0.9))',
    borderRadius: '20px',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(255, 193, 7, 0.3)',
  },
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#5D4037',
    marginBottom: '15px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
  },
  subtitle: {
    fontSize: '20px',
    color: '#795548',
    maxWidth: '800px',
    margin: '0 auto',
  },
  mainLayout: {
    display: 'grid',
    gridTemplateColumns: '250px 1fr 350px',
    gap: '30px',
  },
  sidebar: {
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '20px',
    padding: '25px',
    boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
    height: 'fit-content',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 204, 128, 0.3)',
  },
  sidebarTitle: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#5D4037',
    marginBottom: '25px',
    paddingBottom: '15px',
    borderBottom: '3px solid #FFCC80',
  },
  categoryItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    width: '100%',
    padding: '18px 15px',
    marginBottom: '12px',
    border: '2px solid',
    borderRadius: '15px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    ':hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    },
  },
  categoryIcon: {
    fontSize: '28px',
  },
  categoryText: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#5D4037',
  },
  content: {
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '20px',
    padding: '35px',
    boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 204, 128, 0.3)',
  },
  categoryTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#5D4037',
    marginBottom: '35px',
  },
  itemCount: {
    fontSize: '24px',
    color: '#D32F2F',
    marginLeft: '15px',
  },
  sweetsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '30px',
  },
  sweetCard: {
    background: 'rgba(255, 243, 224, 0.9)',
    borderRadius: '20px',
    padding: '25px',
    transition: 'all 0.3s',
    border: '2px solid #FFCC80',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 15px 35px rgba(255, 193, 7, 0.25)',
    },
  },
  sweetIcon: {
    fontSize: '55px',
    textAlign: 'center',
    marginBottom: '20px',
    animation: 'pulseSweet 2s infinite',
  },
  sweetDetails: {
    textAlign: 'center',
  },
  sweetName: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#5D4037',
    marginBottom: '8px',
  },
  sweetCategory: {
    fontSize: '14px',
    color: '#795548',
    marginBottom: '15px',
    background: 'rgba(255, 255, 255, 0.7)',
    padding: '5px 12px',
    borderRadius: '15px',
    display: 'inline-block',
  },
  sweetPrice: {
    fontSize: '26px',
    fontWeight: 'bold',
    color: '#D32F2F',
    marginBottom: '20px',
  },
  addButton: {
    width: '100%',
    background: 'linear-gradient(45deg, #4CAF50, #45B7D1)',
    color: 'white',
    border: 'none',
    padding: '15px',
    borderRadius: '25px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
    transition: 'all 0.3s',
    ':hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 8px 20px rgba(76, 175, 80, 0.3)',
    },
  },
  cartSidebar: {
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
    height: 'fit-content',
    position: 'sticky',
    top: '20px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 204, 128, 0.3)',
  },
  cartTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#5D4037',
    marginBottom: '30px',
    paddingBottom: '20px',
    borderBottom: '3px solid #FFCC80',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  cartIcon: {
    fontSize: '28px',
    animation: 'bounceSweet 2s infinite',
  },
  emptyCart: {
    textAlign: 'center',
    padding: '50px 20px',
    color: '#795548',
  },
  emptyCartIcon: {
    fontSize: '70px',
    marginBottom: '20px',
    opacity: '0.3',
    animation: 'pulseSweet 3s infinite',
  },
  cartItems: {
    maxHeight: '450px',
    overflowY: 'auto',
    marginBottom: '30px',
    paddingRight: '10px',
  },
  cartItem: {
    padding: '20px 0',
    borderBottom: '2px solid #FFCC80',
  },
  cartItemInfo: {
    marginBottom: '15px',
  },
  cartItemName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#5D4037',
  },
  cartItemPrice: {
    fontSize: '14px',
    color: '#795548',
    marginTop: '5px',
  },
  cartItemControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '15px',
  },
  quantityButton: {
    background: '#FFCC80',
    border: 'none',
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '18px',
    transition: 'all 0.3s',
    ':hover': {
      background: '#FFB74D',
      transform: 'scale(1.1)',
    },
  },
  quantity: {
    minWidth: '30px',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '18px',
  },
  removeButton: {
    background: 'rgba(255, 235, 238, 0.9)',
    border: '1px solid #FFCDD2',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#D32F2F',
    padding: '5px 10px',
    borderRadius: '10px',
    transition: 'all 0.3s',
    ':hover': {
      background: '#FFCDD2',
    },
  },
  cartItemTotal: {
    textAlign: 'right',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#D32F2F',
  },
  cartSummary: {
    paddingTop: '25px',
    borderTop: '3px solid #FFCC80',
  },
  cartTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#5D4037',
    marginBottom: '25px',
  },
  totalAmount: {
    fontSize: '32px',
    color: '#D32F2F',
  },
  checkoutButton: {
    width: '100%',
    background: 'linear-gradient(45deg, #D32F2F, #FF9800)',
    color: 'white',
    border: 'none',
    padding: '20px',
    borderRadius: '25px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '18px',
    marginBottom: '20px',
    transition: 'all 0.3s',
    ':hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 10px 25px rgba(211, 47, 47, 0.3)',
    },
  },
  clearButton: {
    width: '100%',
    background: 'transparent',
    color: '#D32F2F',
    border: '2px solid #D32F2F',
    padding: '18px',
    borderRadius: '25px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
    transition: 'all 0.3s',
    ':hover': {
      background: 'rgba(211, 47, 47, 0.1)',
      transform: 'translateY(-2px)',
    },
  },
};

export default ShopPage;