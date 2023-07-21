import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './style.css';

const Drawer = ({ isOpen, onClose, children }) => {
  const drawerRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen &&
        ReactDOM.createPortal(
          <div className='drawer-overlay' onClick={onClose} />,
          document.body
        )}
      <div ref={drawerRef} className={`drawer ${isOpen ? 'open' : ''}`}>
        <div className='drawer-content'>{children}</div>
      </div>
    </>
  );
};

export default Drawer;
