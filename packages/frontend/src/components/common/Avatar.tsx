import PropTypes from 'prop-types';

const Avatar = ({ imageUrl, size = '50px', altText = 'User Avatar' }) => {
  const avatarStyles = {
    width: size,
    height: size,
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #fff',
  };

  return (
    <img
      src={imageUrl || 'https://via.placeholder.com/150'}
      alt={altText}
      style={avatarStyles}
    />
  );
};

Avatar.propTypes = {
  imageUrl: PropTypes.string,
  size: PropTypes.string,
  altText: PropTypes.string,
};

export default Avatar;
