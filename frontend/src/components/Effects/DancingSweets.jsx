// frontend/src/components/Effects/DancingSweets.jsx
import React, { useEffect, useRef } from 'react';

const DancingSweets = ({ count = 15 }) => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Create sweets
    const sweets = [
      '🍬', '🍭', '🍫', '🥮', '🍰', '🧁', '🍩', '🍪', '🥠', '🎂',
      '🍡', '🍯', '🌰', '🥨', '🍮', '🥧', '🍦', '🍨', '🍧', '🥞'
    ];
    
    const elements = [];
    
    for (let i = 0; i < count; i++) {
      const sweet = document.createElement('div');
      sweet.textContent = sweets[Math.floor(Math.random() * sweets.length)];
      sweet.style.position = 'absolute';
      sweet.style.fontSize = `${Math.random() * 30 + 20}px`;
      sweet.style.left = `${Math.random() * 100}%`;
      sweet.style.top = `${Math.random() * 100}%`;
      sweet.style.opacity = '0.3';
      sweet.style.zIndex = '1';
      sweet.style.pointerEvents = 'none';
      sweet.style.userSelect = 'none';
      sweet.style.animation = `floatSweet ${Math.random() * 10 + 15}s infinite ease-in-out`;
      sweet.style.animationDelay = `${Math.random() * 5}s`;
      
      container.appendChild(sweet);
      elements.push(sweet);
    }
    
    // Cleanup
    return () => {
      elements.forEach(el => container.removeChild(el));
    };
  }, [count]);
  
  // Add CSS for animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes floatSweet {
        0%, 100% {
          transform: translateY(0) rotate(0deg);
        }
        25% {
          transform: translateY(-20px) rotate(5deg);
        }
        50% {
          transform: translateY(-40px) rotate(0deg);
        }
        75% {
          transform: translateY(-20px) rotate(-5deg);
        }
      }
      
      @keyframes bounceSweet {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-25px);
        }
      }
      
      @keyframes spinSweet {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return <div ref={containerRef} style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    pointerEvents: 'none',
    zIndex: 1
  }} />;
};

export default DancingSweets;