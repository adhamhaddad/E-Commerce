import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@hooks';
import Input from '@UI/input';
import Button from '@UI/button';
import avatar from '../../assets/images/avatar.svg';
import styles from '@styles/form.module.css';

const Register = () => {
  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    first_name: null,
    last_name: null,
    email: null,
    password: null
  });
  const { register } = useAuth();

  const handleChange = (prop) => (event) => {
    setValues((prev) => ({ ...prev, [prop]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    register(values, (err) => {
      const errors = err.response.data.errors;
      errors.forEach((error) => {
        if (error.first_name) {
          setErrors((prev) => ({ ...prev, first_name: error.first_name }));
        }
        if (error.last_name) {
          setErrors((prev) => ({ ...prev, last_name: error.last_name }));
        }
        if (error.email) {
          setErrors((prev) => ({ ...prev, email: error.email }));
        }
        if (error.password) {
          setErrors((prev) => ({ ...prev, password: error.password }));
        }
      });
    });
    setValues({
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    });
  };

  const Inputs = [
    {
      id: 'first_name',
      label: 'First Name',
      type: 'text',
      value: values.first_name,
      error: errors.first_name,
      onChange: handleChange('first_name')
    },
    {
      id: 'last_name',
      label: 'Last Name',
      type: 'text',
      value: values.last_name,
      error: errors.last_name,
      onChange: handleChange('last_name')
    },
    {
      id: 'email',
      label: 'Email Address',
      type: 'email',
      value: values.email,
      error: errors.email,
      onChange: handleChange('email')
    },
    {
      id: 'password',
      label: 'New Password',
      type: 'password',
      value: values.password,
      error: errors.password,
      onChange: handleChange('password')
    }
  ];

  return (
    <div className={styles['register-page']}>
      <div className={styles['form-view']}>
        <h2>Register Page</h2>
        <div className={styles['avatar']}>
          <img src={avatar} alt='Avatar' />
        </div>
        <form onSubmit={handleSubmit} className={styles['form']}>
          {Inputs.map((input) => (
            <Input key={input.id} {...input} />
          ))}
          <Button text='Register' type='submit' onClick={handleSubmit} />
        </form>
        <p>
          Already have an account? <Link to='/login'>Login</Link> Now
        </p>
      </div>
    </div>
  );
};
export default Register;
