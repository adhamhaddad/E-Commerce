import React from 'react';
import { useAuth } from '@hooks';
import Button from '@UI/button';
import UserName from './username';
import Email from './email';
import Phone from './phone';
import Address from './address';
import Password from './password';
import avatar from '../../assets/images/avatar.svg';
import styles from '@styles/account.module.css';

const Account = () => {
  const { user, logout } = useAuth();
  return (
    <div className={styles['account-page']}>
      <div className={styles['side-bar']}>
        <div className={styles['avatar']}>
          <img src={avatar} alt='avatar' />
        </div>
        <h3 className={styles['user-name']}>
          {user.first_name} {user.last_name}
        </h3>
        <span className={styles['user-mail']}>{user.email}</span>
        <Button
          text='Log out'
          onClick={logout}
          style={{
            display: 'block',
            margin: '50px auto',
            cursor: 'pointer'
          }}
        />
      </div>
      <div className={styles['settings-section']}>
        <h3>Profile Settings</h3>
        <UserName />
        <Email />
        <Phone />
        <Address />
        <Password />
      </div>
    </div>
  );
};
export default Account;
