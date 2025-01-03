import PropTypes from 'prop-types';

const DashboardCard = ({ title, value, icon }) => {
  const styles = {
    card: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      width: '200px',
      textAlign: 'center',
    },
    icon: {
      fontSize: '40px',
      color: '#3498db',
    },
    title: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginTop: '10px',
    },
    value: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#2c3e50',
    },
  };

  return (
    <div style={styles.card}>
      <div style={styles.icon}>{icon}</div>
      <div style={styles.title}>{title}</div>
      <div style={styles.value}>{value}</div>
    </div>
  );
};

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

export default DashboardCard;
