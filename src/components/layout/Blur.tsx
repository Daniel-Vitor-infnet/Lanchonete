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
    // guarda posição atual
    const scrollY = window.scrollY;

    // bloqueia rolagem de body e html
    Object.assign(document.body.style, {
      position: 'fixed',
      top: `-${scrollY}px`,
      left: '0',
      right: '0',
      width: '100%',
      overflow: 'hidden',             // esconde scrollbar do body
    });
    document.documentElement.style.overflow = 'hidden'; // esconde scrollbar do html

    return () => {
      const topValue = document.body.style.top;

      // restaura estilos originais
      Object.assign(document.body.style, {
        position: '',
        top: '',
        left: '',
        right: '',
        width: '',
        overflow: '',
      });
      document.documentElement.style.overflow = '';

      // retorna à posição de scroll anterior
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
