
import React, { createContext, useContext, useState } from 'react';


const ColorContext = createContext();

// 2. Custom hook to use the color context
export const useColor = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error('useColor must be used within a ThemeProvider');
  }
  return context;
};

// 3. ThemeProvider component
export const ThemeProvider = ({ children }) => {
  const [color, setColor] = useState('light');

  const colorToggler = () => {
    setColor((prevColor) => (prevColor === 'light' ? 'dark' : 'light'));
  };

  return (
    <ColorContext.Provider value={{ color, colorToggler }}>
      {children}
    </ColorContext.Provider>
  );
};
