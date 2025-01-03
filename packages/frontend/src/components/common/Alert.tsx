import PropTypes from 'prop-types';

const Alert = ({ message, type }) => {
  const alertStyles = {
    padding: '10px 20px',
    margin: '10px 0',
    borderRadius: '5px',
    fontSize: '14px',
    color: '#fff',
    backgroundColor: '',
    border: '1px solid',
  };

  switch (type) {
    case 'success':
      alertStyles.backgroundColor = '#28a745';
      alertStyles.borderColor = '#28a745';
      break;
    case 'error':
      alertStyles.backgroundColor = '#dc3545';
      alertStyles.borderColor = '#dc3545';
      break;
    case 'info':
      alertStyles.backgroundColor = '#17a2b8';
      alertStyles.borderColor = '#17a2b8';
      break;
    default:
      alertStyles.backgroundColor = '#ffc107';
      alertStyles.borderColor = '#ffc107';
      break;
  }

  return (
    <div style={alertStyles}>
      {message}
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'info', 'warning']).isRequired,
};

export default Alert;
