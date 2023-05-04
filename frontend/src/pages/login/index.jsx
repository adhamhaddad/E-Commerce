import React, { useState } from 'react';
import Input from '../../components/UI/input';
import Button from '../../components/UI/button';
import { useAuth } from '../../hooks/useAuth';
import styles from '../../styles/login.module.css';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const { login } = useAuth();

  const handleChange = (prop) => (event) => {
    setValues((prev) => ({ ...prev, [prop]: event.target.value }));
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    login(values, (err) => console.log(err));
  };

  return (
    <div className={styles['login-page']}>
      <form onSubmit={onFormSubmit}>
        <Input
          id='email'
          label='Email'
          placeholder='Email address or phone number'
          type='email'
          value={values.email}
          onChange={handleChange('email')}
        />
        <Input
          id='password'
          label='Password'
          placeholder='Password'
          type='password'
          value={values.password}
          onChange={handleChange('password')}
        />
        <Button text='Log In' type='submit' style={{ borderRadius: '2px' }} />
      </form>
    </div>
  );
};

export default Login;
