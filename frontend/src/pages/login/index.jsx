import React, { useState, useReducer, useContext } from 'react';
import Input from '../../components/UI/input';
import Button from '../../components/UI/button';
import { authContext } from '../../utils/auth';
import styles from '../../styles/login.module.css';

const FormReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return {
      email: action.input === 'EMAIL' ? action.val : state.email,
      password: action.input === 'PASSWORD' ? action.val : state.password,
      isValid: false
    };
  }
  if (action.type === 'BLUR') {
    return {
      email: state.email,
      password: state.password,
      isValid: state.isValid
    };
  }
  return {
    email: '',
    password: '',
    isValid: false
  };
};

const Login = () => {
  const authCtx = useContext(authContext);
  const [form, dispatchForm] = useReducer(FormReducer, {
    email: '',
    password: '',
    isValid: false
  });

  const onEmailChange = (e) => {
    dispatchForm({ action: 'INPUT', input: 'EMAIL', val: e.target.value });
  };
  const onPasswordChange = (e) => {
    dispatchForm({ action: 'INPUT', input: 'PASSWORD', val: e.target.value });
  };
  const onEmailBlur = () => {
    dispatchForm({ action: 'BLUR', input: 'EMAIL' });
  };
  const onPasswordBlur = () => {
    dispatchForm({ action: 'BLUR', input: 'PASSWORD' });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!form.isValid) {
      return;
    }
    authCtx.login();
  };

  return (
    <div className={styles['login-page']}>
      <form onSubmit={onFormSubmit}>
        <Input
          id='email'
          label='Email'
          placeholder='Email address or phone number'
          type='email'
          value={form.email}
          isValid={form.isValid}
          onChange={onEmailChange}
          onBlur={onEmailBlur}
        />
        <Input
          id='password'
          label='Password'
          placeholder='Password'
          type='password'
          value={form.password}
          isValid={form.isValid}
          onChange={onPasswordChange}
          onBlur={onPasswordBlur}
        />
        <Button label='Log In' type='submit' style={{ borderRadius: '2px' }} />
      </form>
    </div>
  );
};

export default Login;
