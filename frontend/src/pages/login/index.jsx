import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '@UI/input';
import Button from '@UI/button';
import { useAuth } from '@hooks';
import avatar from '../../assets/images/avatar.svg';
import styles from '@styles/form.module.css';

const LoginPage = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: null,
    password: null
  });
  const { login } = useAuth();

  const handleChange = (prop) => (event) => {
    if (typeof errors[prop] === 'string') {
      setErrors((prev) => ({ ...prev, [prop]: null }));
    }
    setValues((prev) => ({ ...prev, [prop]: event.target.value }));
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    login(values, (err) => {
      const errors = err.response.data.errors.reverse();
      errors.forEach((error) => {
        if (error.email) {
          setErrors((prev) => ({ ...prev, email: error.email }));
        }
        if (error.password) {
          setErrors((prev) => ({ ...prev, password: error.password }));
        }
      });
    });
  };

  const Inputs = [
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Email Address',
      value: values.email,
      error: errors.email,
      onChange: handleChange('email')
    },
    {
      id: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Password',
      value: values.password,
      error: errors.password,
      onChange: handleChange('password')
    }
  ];

  useEffect(() => {
    return () => {
      setValues({ email: '', password: '' });
    };
  }, []);
  return (
    <div className={styles['login-page']}>
      <div className={styles['form-view']}>
        <h2>Login Page</h2>
        <div className={styles['avatar']}>
          <img src={avatar} alt='Avatar' />
        </div>
        <form onSubmit={onFormSubmit} className={styles['form']}>
          {Inputs.map((input) => (
            <Input key={input.id} {...input} />
          ))}
          <Button text='Log In' type='submit' />
        </form>
        <p>
          Don't have account? <Link to='/register'>Register</Link> now
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
