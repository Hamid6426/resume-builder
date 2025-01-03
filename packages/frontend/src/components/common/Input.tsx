import PropTypes from 'prop-types';

const Input = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  disabled = false,
  id,
  name,
}) => {
  const styles = {
    input: {
      padding: '8px 12px',
      fontSize: '14px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      width: '100%',
      boxSizing: 'border-box',
      cursor: disabled ? 'not-allowed' : 'text',
    },
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      id={id}
      name={name}
      style={styles.input}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
};

export default Input;


{/* <Input
      type="text"
      value={text}
      onChange={handleInputChange}
      placeholder="Enter some text"
      name="example"
      id="1"
      disabled=false
      className="my-input-class"
    /> */}