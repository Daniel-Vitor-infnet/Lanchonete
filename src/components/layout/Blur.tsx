// src/components/layout/Blur1.tsx
import React, { useEffect } from 'react';
import stylesPerso from '@/styles/elements/Blur.module.scss';

interface Blur1Props {
  /** Callback ao primeiro scroll realizado */
  onScrollActivate?: () => void;
  children?: React.ReactNode;
}

const Blur1: React.FC<Blur1Props> = ({ onScrollActivate, children }) => {
  useEffect(() => {
    // bloqueia rolagem ao montar
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';

    return () => {
      // restaura após desmontar
      const topValue = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      if (topValue) {
        const restoreY = -parseInt(topValue, 10);
        window.scrollTo(0, restoreY);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (onScrollActivate) onScrollActivate();
    };
    window.addEventListener('scroll', handleScroll, { once: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onScrollActivate]);

  return (
    <div className={stylesPerso.overlay}>
      {children}
    </div>
  );
};

export default Blur1;