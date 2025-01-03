import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { RoleContext } from './Contexts';

const RoleProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role) {
      setUserRole(role);
    }
  }, []);

  const setRole = (role) => {
    localStorage.setItem('userRole', role);
    setUserRole(role);
  };

  const clearRole = () => {
    localStorage.removeItem('userRole');
    setUserRole(null);
  };

  return (
    <RoleContext.Provider value={{ userRole, setRole, clearRole }}>
      {children}
    </RoleContext.Provider>
  );
};

RoleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RoleProvider;