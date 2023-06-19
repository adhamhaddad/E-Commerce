import React from 'react';
import { useAuth } from '@hooks';
import Button from '@UI/button';
import UserName from '@common/username';
import Email from '@common/email';
import Phone from '@common/phone';
import Address from '@common/address';
import Password from '@common/password';
import avatar from '@assets/images/avatar.svg';
import styles from '@styles/account/index.module.css';

const AccountPage = () => {
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
        {user.role === 'CUSTOMER' && <Address />}
        <Password />
      </div>
    </div>
  );
};
export default AccountPage;
