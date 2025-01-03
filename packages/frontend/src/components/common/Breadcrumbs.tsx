import PropTypes from 'prop-types';

const Breadcrumbs = ({ path }) => {
  const breadcrumbItems = path.split('/').filter(item => item !== '');

  return (
    <div style={{ padding: '10px 0', fontSize: '14px', color: '#333' }}>
      {breadcrumbItems.map((item, index) => (
        <span key={index}>
          {index > 0 && ' > '}
          <span
            style={{
              color: index === breadcrumbItems.length - 1 ? '#999' : '#007bff',
              cursor: index === breadcrumbItems.length - 1 ? 'default' : 'pointer',
              textDecoration: 'none',
            }}
          >
            {item}
          </span>
        </span>
      ))}
    </div>
  );
};

Breadcrumbs.propTypes = {
  path: PropTypes.string.isRequired,
};

export default Breadcrumbs;
