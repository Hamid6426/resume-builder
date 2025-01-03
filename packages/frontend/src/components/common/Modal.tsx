import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, children }) => {
  const styles = {
    overlay: {
      display: isOpen ? 'flex' : 'none',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modal: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      width: '400px',
      maxWidth: '90%',
    },
    closeButton: {
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '18px',
      fontWeight: 'bold',
      cursor: 'pointer',
      position: 'absolute',
      top: '10px',
      right: '10px',
    },
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
