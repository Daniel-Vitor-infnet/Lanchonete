import React from 'react';
import { Box } from '@/libs/mui'; 

interface BoxLayoutProps {
  children: React.ReactNode;
}

const BoxLayout: React.FC<BoxLayoutProps> = ({ children }) => {
  const styles = {
    width: '80vw',
    minHeight: '80vh',
    border: '1px solid red',
    marginTop: '2vh',
    backgroundColor: 'seagreen',
    mx: 'auto', // Centraliza horizontalmente
    borderRadius: 6,
    boxShadow: 2,
    overflow: 'hidden',
  };

  return <Box sx={styles}>{children}</Box>;
};

export default BoxLayout;
