import React from 'react';
import UserName from './username';
import Email from './email';
import Phone from './phone';
import Address from './address';
import Button from '../../components/UI/button';
import { useAuth } from '../../hooks/useAuth';
import styles from '../../styles/account.module.css';

const Account = () => {
  const { logout } = useAuth();

  return (
    <div className={styles['account-page']}>
      <UserName />
      <Email />
      <Phone />
      <Address />
      <Button text='Logout' type='button' onClick={logout} />
    </div>
  );
};

export default Account;
