import PropTypes from 'prop-types';

const Checkbox = ({ label, checked, onChange, id, name, disabled = false }) => {
  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    input: {
      width: '16px',
      height: '16px',
      cursor: disabled ? 'not-allowed' : 'pointer',
    },
    label: {
      fontSize: '14px',
      color: disabled ? '#999' : '#333',
      cursor: disabled ? 'not-allowed' : 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        style={styles.input}
      />
      {label && (
        <label htmlFor={id} style={styles.label}>
          {label}
        </label>
      )}
    </div>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Checkbox;
