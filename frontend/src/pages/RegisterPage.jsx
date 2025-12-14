// frontend/src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [floatingSweets, setFloatingSweets] = useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const sweets = ['🍬', '🍭', '🍫', '🍰'];
    const newFloatingSweets = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      emoji: sweets[Math.floor(Math.random() * sweets.length)],
      left: Math.random() * 80 + 10,
      top: Math.random() * 70 + 15,
      size: Math.random() * 25 + 15,
    }));
    setFloatingSweets(newFloatingSweets);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await registerUser({
        email: formData.email,
        password: formData.password
      });
      
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      
      alert('Registration successful!');
      navigate('/dashboard');
      
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={styles.container}>
      {/* Floating Sweets */}
      {floatingSweets.map(sweet => (
        <div
          key={sweet.id}
          style={{
            position: 'absolute',
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

      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logo}>🍰</div>
          <h1 style={styles.title}>Create Account</h1>
          <p style={styles.subtitle}>Join our sweet community</p>
        </div>

        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <div style={styles.inputContainer}>
              <span style={styles.inputIcon}>👤</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
                placeholder="Your full name"
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address *</label>
            <div style={styles.inputContainer}>
              <span style={styles.inputIcon}>📧</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password (min 6 characters) *</label>
            <div style={styles.inputContainer}>
              <span style={styles.inputIcon}>🔒</span>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                style={styles.input}
                placeholder="Create a password"
                minLength="6"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.passwordToggle}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password *</label>
            <div style={styles.inputContainer}>
              <span style={styles.inputIcon}>🔒</span>
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={styles.input}
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            style={styles.button}
            disabled={loading}
          >
            {loading ? (
              <>
                <span style={styles.spinner}>🔄</span> Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Already have an account?{' '}
            <Link to="/login" style={styles.link}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '450px',
    margin: '40px auto',
    padding: '0 20px',
    position: 'relative',
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 248, 225, 0.95))',
    borderRadius: '25px',
    padding: '40px',
    boxShadow: '0 20px 50px rgba(255, 193, 7, 0.25)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 204, 128, 0.3)',
    width: '100%',
    position: 'relative',
    zIndex: 2,
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  logo: {
    fontSize: '60px',
    marginBottom: '20px',
    animation: 'bounceSweet 2s infinite 0.3s',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#5D4037',
    marginBottom: '10px',
  },
  subtitle: {
    color: '#795548',
    fontSize: '16px',
    opacity: '0.8',
  },
  error: {
    background: 'rgba(255, 235, 238, 0.9)',
    color: '#D32F2F',
    padding: '15px',
    borderRadius: '12px',
    marginBottom: '25px',
    textAlign: 'center',
    border: '1px solid #FFCDD2',
  },
  form: {
    marginBottom: '30px',
  },
  inputGroup: {
    marginBottom: '25px',
  },
  label: {
    display: 'block',
    fontWeight: '500',
    color: '#5D4037',
    fontSize: '14px',
    marginBottom: '8px',
  },
  inputContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '15px',
    fontSize: '20px',
    color: '#795548',
  },
  input: {
    width: '100%',
    padding: '16px 16px 16px 50px',
    border: '2px solid #FFCC80',
    borderRadius: '12px',
    fontSize: '16px',
    background: 'rgba(255, 255, 255, 0.9)',
    transition: 'all 0.3s',
    ':focus': {
      outline: 'none',
      borderColor: '#D32F2F',
      boxShadow: '0 0 0 3px rgba(211, 47, 47, 0.1)',
    },
  },
  passwordToggle: {
    position: 'absolute',
    right: '15px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '20px',
    color: '#795548',
    padding: '0',
    ':hover': {
      opacity: '0.8',
    },
  },
  button: {
    width: '100%',
    padding: '18px',
    background: 'linear-gradient(45deg, #D32F2F, #FF6F00)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(211, 47, 47, 0.3)',
    },
    ':disabled': {
      opacity: '0.7',
      cursor: 'not-allowed',
    },
  },
  spinner: {
    animation: 'spinSweet 1s linear infinite',
  },
  footer: {
    textAlign: 'center',
    paddingTop: '30px',
    borderTop: '1px solid #FFE0B2',
  },
  footerText: {
    color: '#795548',
    fontSize: '15px',
  },
  link: {
    fontWeight: '600',
    color: '#D32F2F',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
  },
};

export default RegisterPage;