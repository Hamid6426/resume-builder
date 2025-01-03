import { useState } from 'react';
import PropTypes from 'prop-types';

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const accordionContainerStyles = {
    border: '1px solid #ddd',
    borderRadius: '5px',
    margin: '10px 0',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  };

  const headerStyles = {
    padding: '10px 15px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    backgroundColor: '#f2f2f2',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const contentStyles = {
    padding: '10px 15px',
    backgroundColor: '#fafafa',
    display: isOpen ? 'block' : 'none',
  };

  const iconStyles = {
    transition: 'transform 0.3s ease',
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
  };

  return (
    <div style={accordionContainerStyles}>
      <div style={headerStyles} onClick={toggleAccordion}>
        {title}
        <span
          style={iconStyles}
        >
          ▼
        </span>
      </div>
      <div style={contentStyles}>
        {children}
      </div>
    </div>
  );
};

Accordion.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Accordion;
