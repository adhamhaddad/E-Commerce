import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@hooks';
import Input from '@UI/input';
import Button from '@UI/button';
import styles from '@styles/form.module.css';

const Register = () => {
  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  });

  const { register } = useAuth();

  const handleChange = (prop) => (event) => {
    setValues((prev) => ({ ...prev, [prop]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    register(values, (err) => console.log(err));
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
      onChange: handleChange('first_name')
    },
    {
      id: 'last_name',
      label: 'Last Name',
      type: 'text',
      value: values.last_name,
      onChange: handleChange('last_name')
    },
    {
      id: 'email',
      label: 'Email Address',
      type: 'email',
      value: values.email,
      onChange: handleChange('email')
    },
    {
      id: 'password',
      label: 'New Password',
      type: 'password',
      value: values.password,
      onChange: handleChange('password')
    }
  ];

  return (
    <div className={styles['register-page']}>
      <h2>Register Page</h2>
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
  );
};
export default Register;
