import React from 'react';
import styles from '../../../styles/error.module.css';

const Error = ({ text, style }) => {
  return (
    <div className={styles['error-box']}>
      <p className={styles[style]}>{text}</p>
    </div>
  );
};

export default Error;
