import PropTypes from 'prop-types';

const Button = ({ label, onClick, type = 'button', disabled = false }) => {
  const styles = {
    button: {
      backgroundColor: disabled ? '#ccc' : '#007BFF',
      color: '#fff',
      padding: '10px 20px',
      fontSize: '14px',
      border: 'none',
      borderRadius: '4px',
      cursor: disabled ? 'not-allowed' : 'pointer',
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      style={styles.button}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;


{/* <Button
  type="button"
  onClick={handleSubmit}
  className="my-button-class"
>
  Submit
</Button> */}