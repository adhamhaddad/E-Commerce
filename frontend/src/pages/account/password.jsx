import React, { useState } from 'react';
import Input from '@UI/input';
import Button from '@UI/button';
import { useAuth } from '@hooks';
import { useApi } from '@config';
import styles from '@styles/password.module.css';

const Password = () => {
  const [values, setValues] = useState({
    old_password: '',
    new_password: '',
    confirm_password: ''
  });
  const { user } = useAuth();
  const { patch } = useApi();

  const handleChange = (prop) => (event) => {
    setValues((prev) => ({ ...prev, [prop]: event.target.value }));
  };
  const updatePassword = async () => {
    try {
      const response = await patch('/change-password');
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    updatePassword();
  };

  const Inputs = [
    {
      key: 'old_password',
      id: 'old_password',
      label: 'Old Password',
      value: values.old_password,
      onChange: handleChange('old_password')
    },
    {
      key: 'new_password',
      id: 'new_password',
      label: 'New Password',
      value: values.new_password,
      onChange: handleChange('new_password')
    },
    {
      key: 'confirm_password',
      id: 'confirm_password',
      label: 'Confirm Password',
      value: values.confirm_password,
      onChange: handleChange('confirm_password')
    }
  ];
  return (
    <div className={styles['password-section']}>
      <div className={styles['left-side']}>
        <h3>
          <i className='fa-solid fa-lock'></i>
          <span>Password</span>
        </h3>
        <span>Change your password from here</span>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          {Inputs.map((input) => (
            <Input {...input} />
          ))}
          <Button
            text='Change Password'
            type='submit'
            style={{
              display: 'block',
              padding: '10px',
              margin: '10px 0px',
              border: '1px solid #888',
              borderRadius: '4px'
            }}
          />
        </form>
      </div>
    </div>
  );
};
export default Password;
