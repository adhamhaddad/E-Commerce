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
  const [errors, setErrors] = useState({
    old_password: null,
    new_password: null,
    confirm_password: null,
    user_id: null
  });
  const { user } = useAuth();
  const { patch } = useApi();

  const handleChange = (prop) => (event) => {
    if (typeof errors[prop] === 'string') {
      setErrors((prev) => ({ ...prev, [prop]: null }));
    }
    setValues((prev) => ({ ...prev, [prop]: event.target.value }));
  };
  const updatePassword = async () => {
    try {
      const response = await patch('/auth/reset-password', {
        old_password: values.old_password,
        new_password: values.new_password,
        user_id: user.id
      });
      setValues({
        old_password: '',
        new_password: '',
        confirm_password: ''
      });
    } catch (error) {
      const errors = error.response.data.errors;
      errors.forEach((error) => {
        if (error.old_password) {
          setErrors((prev) => ({ ...prev, old_password: error.old_password }));
        }
        if (error.new_password) {
          setErrors((prev) => ({ ...prev, new_password: error.new_password }));
        }
        if (error.user_id) {
          setErrors((prev) => ({ ...prev, user_id: error.user_id }));
        }
      });
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (values.new_password !== values.confirm_password) {
      setErrors((prev) => ({
        ...prev,
        confirm_password: "Password didn't match"
      }));
      return;
    }
    updatePassword();
  };

  const Inputs = [
    {
      key: 'old_password',
      id: 'old_password',
      label: 'Old Password',
      type: 'password',
      placeholder: 'Old password',
      value: values.old_password,
      error: errors.old_password,
      onChange: handleChange('old_password')
    },
    {
      key: 'new_password',
      id: 'new_password',
      label: 'New Password',
      type: 'password',
      placeholder: 'New password',
      value: values.new_password,
      error: errors.new_password,
      onChange: handleChange('new_password')
    },
    {
      key: 'confirm_password',
      id: 'confirm_password',
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Confirm password',
      value: values.confirm_password,
      error: errors.confirm_password,
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
          <Button text='Change Password' type='submit' />
        </form>
      </div>
    </div>
  );
};
export default Password;
