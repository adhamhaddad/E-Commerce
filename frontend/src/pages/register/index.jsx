import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/UI/input';
import Button from '../../components/UI/button';
import styles from '../../styles/register.module.css';

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
      placeholder: 'First Name',
      value: values.first_name,
      onChange: handleChange('first_name')
    },
    {
      id: 'last_name',
      label: 'Last Name',
      type: 'text',
      placeholder: 'Last Name',
      value: values.last_name,
      onChange: handleChange('last_name')
    },
    {
      id: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'Email Address',
      value: values.email,
      onChange: handleChange('email')
    },
    {
      id: 'password',
      label: 'New Password',
      type: 'password',
      placeholder: 'New Password',
      value: values.password,
      onChange: handleChange('password')
    }
  ];

  return (
    <div className={styles['register-page']}>
      <form onSubmit={handleSubmit}>
        {Inputs.map((input) => (
          <Input key={input.id} {...input} />
        ))}
        <Button text='Register' type='submit' onClick={handleSubmit} />
      </form>
      <p>Already have an account? Login Now</p>
    </div>
  );
};
export default Register;
