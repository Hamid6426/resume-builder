const Loader = () => {
  const styles = {
    loader: {
      border: '5px solid #f3f3f3', /* Light gray */
      borderTop: '5px solid #3498db', /* Blue color */
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      animation: 'spin 1s linear infinite',
      margin: 'auto',
    },
    '@keyframes spin': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
  };

  return (
    <div style={styles.loader}></div>
  );
};

export default Loader;
