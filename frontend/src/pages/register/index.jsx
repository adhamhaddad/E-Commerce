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
    e.preventDefault();
    register(values, (err) => console.log(err));
  };

  const Inputs = [
    {
      id: 'first_name',
      label: 'First Name',
      value: values.first_name,
      onChange: handleChange('first_name')
    },
    {
      id: 'last_name',
      label: 'Last Name',
      value: values.last_name,
      onChange: handleChange('last_name')
    },
    {
      id: 'email',
      label: 'Email Address',
      value: values.email,
      onChange: handleChange('email')
    },
    {
      id: 'password',
      label: 'New Password',
      value: values.password,
      onChange: handleChange('password')
    }
  ];

  return (
    <div className={styles['register-page']}>
      <form onSubmit={handleSubmit}>
        {Inputs.map((input) => (
          <Input
            id={input.id}
            label={input.label}
            value={input.value}
            onChange={input.onChange}
          />
        ))}
        <Button text='Register' type='submit' onClick={handleSubmit} />
      </form>
    </div>
  );
};
export default Register;
