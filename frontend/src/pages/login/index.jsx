import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

  const Inputs = [
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Email address',
      value: values.email,
      onChange: handleChange('email')
    },
    {
      id: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Password',
      value: values.password,
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
      <h2>Login Page</h2>
      <form onSubmit={onFormSubmit} className={styles['login-page_form']}>
        {Inputs.map((input) => (
          <Input key={input.id} {...input} />
        ))}
        <Button text='Log In' type='submit' />
      </form>
      <p>
        Don't have account? <Link to='/register'>Register</Link> now
      </p>
    </div>
  );
};

export default Login;
