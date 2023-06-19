import React from 'react';
import styles from '@styles/401.module.css';

const NotAuthorizedPage = () => {
  return (
    <div className={styles['not-authorized-page']}>
      <h1>401 You are not authorized.</h1>
    </div>
  );
};
export default NotAuthorizedPage;
