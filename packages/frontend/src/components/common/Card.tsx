import PropTypes from 'prop-types';

const Card = ({ title, content, footer }) => {
  const styles = {
    card: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      maxWidth: '300px',
      margin: '20px auto',
      overflow: 'hidden',
    },
    title: {
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '10px',
    },
    content: {
      fontSize: '16px',
      color: '#555',
      marginBottom: '15px',
    },
    footer: {
      fontSize: '14px',
      color: '#888',
      textAlign: 'right',
    },
  };

  return (
    <div style={styles.card}>
      <div style={styles.title}>{title}</div>
      <div style={styles.content}>{content}</div>
      {footer && <div style={styles.footer}>{footer}</div>}
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  footer: PropTypes.string,
};

export default Card;
