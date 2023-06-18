import React from 'react';
import ReactDom from 'react-dom';
import styles from '@styles/modal.module.css';

const Backdrop = ({ onClick }) => {
  return <div className={styles['backdrop']} onClick={onClick}></div>;
};
const Overlay = ({ children }) => {
  return <div className={styles['overlay']}>{children}</div>;
};

const Modal = ({ onClick, children }) => {
  return (
    <>
      {ReactDom.createPortal(
        <Backdrop onClick={onClick} />,
        document.getElementById('overlay')
      )}
      {ReactDom.createPortal(
        <Overlay children={children} />,
        document.getElementById('overlay')
      )}
    </>
  );
};
export default Modal;
