// import { Navigate } from 'react-router-dom';
// import { useContext } from 'react';
// import { AuthContext } from '../contexts/Contexts';
// import { RoleContext } from '../contexts/Contexts';
// import PropTypes from 'prop-types';

// const PrivateRoute = ({ children, role }) => {
//   const { isAuthenticated } = useContext(AuthContext);
//   const { userRole } = useContext(RoleContext);

//   if (!isAuthenticated) {
//     return <Navigate to="/auth" />;
//   }

//   if (role && userRole !== role) {
//     return <Navigate to="/not-authorized" />;
//   }

//   return children;
// };

// PrivateRoute.propTypes = {
//   children: PropTypes.node.isRequired,
//   role: PropTypes.string,
// };

// export default PrivateRoute;
