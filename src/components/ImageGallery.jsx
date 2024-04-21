// import React from 'react';
// import PropTypes from 'prop-types';
// import ImageGalleryItem from './ImageGalleryItem';
// import './styles.css';

// const ImageGallery = ({ images, onImageClick }) => (
//   <ul className="imageGallery">
//     {images.map(({ id, webformatURL }) => (
//       <ImageGalleryItem
//         key={id}
//         id={id}
//         src={webformatURL}
//         onClick={() => onImageClick(id)}
//       />
//     ))}
//   </ul>
// );

// ImageGallery.propTypes = {
//   images: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       webformatURL: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   onImageClick: PropTypes.func.isRequired,
// };

// export default ImageGallery;
import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import './styles.css';

const ImageGallery = ({ images, onImageClick }) => (
  <ul className="imageGallery">
    {images.map((image, index) => (
      <ImageGalleryItem
        key={index}
        id={image.id}
        src={image.webformatURL}
        onClick={() => onImageClick(image.id)}
      />
    ))}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;
