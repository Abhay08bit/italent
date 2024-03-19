import React , { useRef }from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={handleOutsideClick}>
      <div className="modal-content" ref={modalRef}>
      <span className="close" onClick={onClose}>&times;</span>
        <div className="modal-scrollable-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
