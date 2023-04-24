import React, { useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../components/UI/input';
import Button from '../../components/UI/button';
import styles from '../../styles/register.module.css';

const FormReducer = (state, action) => {
  return {
    fname: '',
    lname: '',
    email: '',
    password: '',
    isValid: false
  };
};

const Register = () => {
  const location = useHistory();
  const [form, dispatchForm] = useReducer(FormReducer, {
    fname: '',
    lname: '',
    email: '',
    password: '',
    isValid: false
  });

  const createUser = (data) => {
    // sendRequest('/user', { method: 'POST', body: data }, (data) => {
    //   if (data.status) {
    //     // dispatchForm({})
    //     location.push('/login');
    //   }
    // });
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    const body = {
      first_name: form.fname,
      last_name: form.lname,
      email: form.email,
      password: form.password
    };
    if (!form.isValid) {
      return;
    }
    createUser(body);
  };

  return (
    <div className={styles['register-page']}>
      <form onSubmit={onFormSubmit}>
        <Input id='fname' label='First Name' />
        <Input id='lname' label='Last Name' />
        <Input id='email' label='Email' />
        <Input id='password' label='New Password' />
        <Button label='Register' type='submit' />
        {/* {!isLoading && <Button label='Register' type='submit' />} */}
      </form>
    </div>
  );
};
export default Register;
