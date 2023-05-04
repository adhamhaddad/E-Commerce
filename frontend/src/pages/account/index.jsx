import React from 'react';
import UserName from './username';
import Email from './email';
import Phone from './phone';
import styles from '../../styles/account.module.css';

const Account = () => {
  return (
    <div className={styles['account-page']}>
      <UserName />
      <Email />
      <Phone />
    </div>
  );
};

export default Account;
