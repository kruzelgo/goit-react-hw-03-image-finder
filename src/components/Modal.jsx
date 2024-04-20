import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Modal = ({ imgUrl, alt, onClose }) => (
  <div className="overlay" onClick={onClose}>
    <div className="modal">
      <img src={imgUrl} alt={alt} />
    </div>
  </div>
);

Modal.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
