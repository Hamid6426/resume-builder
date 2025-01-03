import PropTypes from 'prop-types';
import { useState } from 'react';

const Dropdown = ({ items, label }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const styles = {
    dropdown: {
      position: 'relative',
      display: 'inline-block',
      width: '200px',
      padding: '10px',
      backgroundColor: '#fff',
      borderRadius: '4px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    button: {
      backgroundColor: '#3498db',
      color: '#fff',
      padding: '10px 20px',
      fontSize: '16px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      width: '100%',
      textAlign: 'left',
    },
    list: {
      display: isOpen ? 'block' : 'none',
      position: 'absolute',
      top: '100%',
      left: 0,
      width: '100%',
      backgroundColor: '#fff',
      borderRadius: '4px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      zIndex: 1,
    },
    listItem: {
      padding: '10px',
      cursor: 'pointer',
      fontSize: '16px',
      backgroundColor: '#fff',
      borderBottom: '1px solid #ddd',
    },
    listItemHover: {
      backgroundColor: '#3498db',
      color: '#fff',
    },
  };

  return (
    <div style={styles.dropdown}>
      <button style={styles.button} onClick={toggleDropdown}>
        {label}
      </button>
      <ul style={styles.list}>
        {items.map((item, index) => (
          <li
            key={index}
            style={styles.listItem}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#2980b9')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#fff')}
            onClick={() => console.log(`Selected: ${item}`)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

Dropdown.propTypes = {
  items: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
};

export default Dropdown;
