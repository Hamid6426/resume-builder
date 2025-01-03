
import { ThemeContext } from "./Contexts";
import PropTypes from 'prop-types';
import { useState } from "react";

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Set default theme

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;