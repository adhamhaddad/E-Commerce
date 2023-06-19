import React, { useState, useEffect } from 'react';
import Input from '@UI/input';
import Button from '@UI/button';
import { useApi } from '@config';
import { useAuth } from '@hooks';
import styles from '@styles/email.module.css';

const Email = () => {
  const [emails, setEmails] = useState([]);
  const [values, setValues] = useState({ email: '' });
  const [inputState, setInputState] = useState({ edit: false, add: false });
  const [errors, setErrors] = useState({ email: null });
  const { user } = useAuth();
  const { get, post, patch, loading } = useApi();

  const handleInputState = (prop) => (value) => () => {
    setInputState((prev) => ({ ...prev, [prop]: value }));
  };
  const getEmails = async () => {
    await get(`/emails/${user.id}`)
      .then((res) => setEmails(res.data))
      .catch((err) => console.log(err));
  };
  const addEmail = async () => {
    try {
      const response = await post('/emails', { ...values, user_id: user.id });
      setValues({ email: '' });
      setEmails((prev) => [...prev, response.data]);
    } catch (error) {
      const duplicateEmail = error.response.data.message;

      if (errors) {
        setErrors(errors[0]);
      }
      if (duplicateEmail.includes('emails_email_key')) {
        setErrors((prev) => ({
          ...prev,
          email: 'Email address has taken before'
        }));
      }
    }
  };
  const updateEmail = async (email_id) => {
    try {
      const response = await patch(`/emails/${email_id}`, {
        ...values,
        user_id: user.id
      });
      setValues({ email: '' });
      setEmails((prev) => [...prev, response.data]);
    } catch (error) {
      const errors = error.response.data.errors;
      const duplicateEmail = error.response.data.message;

      if (errors) {
        setErrors(errors[0]);
      }
      if (duplicateEmail.includes('emails_email_key')) {
        setErrors((prev) => ({
          ...prev,
          email: 'Email address has taken before'
        }));
      }
    }
  };
  const handleChangeEmail = (id) => (prop) => (event) => {
    if (typeof errors[prop] === 'string') {
      setErrors((prev) => ({ ...prev, [prop]: null }));
    }
    setEmails((prev) =>
      prev.map((email) =>
        email.id === id ? { ...email, [prop]: event.target.value } : email
      )
    );
    setValues((prev) => ({ ...prev, [prop]: event.target.value }));
  };
  const handleChange = (prop) => (event) => {
    if (typeof errors[prop] === 'string') {
      setErrors((prev) => ({ ...prev, [prop]: null }));
    }
    setValues((prev) => ({ ...prev, [prop]: event.target.value }));
  };
  const handleUpdate = (event) => {
    event.preventDefault();
    updateEmail();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    addEmail();
  };
  useEffect(() => {
    getEmails();

    return () => {
      setEmails([]);
      setValues({ email: '' });
    };
  }, []);

  const Inputs = [
    ...emails.map((email) => ({
      key: email.id,
      id: email.id,
      label: 'Email',
      type: 'email',
      value: email.email,
      error: errors.email,
      disabled: !inputState.edit,
      onChange: handleChangeEmail(email.id)('email')
    }))
  ];

  return (
    <div className={styles['email-section']}>
      <div className={styles['left-side']}>
        <h3>
          <i className='fa-solid fa-envelope'></i>
          <span>Email Address</span>
        </h3>
        <span>Add or change your email from here</span>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          {Inputs.map((input) => (
            <Input {...input} />
          ))}
          {inputState.add && (
            <Input
              key='new_email'
              id='new_email'
              label='New Email'
              type='email'
              placeholder='New email address'
              value={values.email}
              error={errors.email}
              onChange={handleChange('email')}
            />
          )}

          {!inputState.edit && !inputState.add && (
            <Button
              type='button'
              text='Edit Email'
              onClick={handleInputState('edit')(true)}
            />
          )}
          {inputState.edit && !inputState.add && (
            <>
              <Button
                type='button'
                text='Cancel'
                style={{ backgroundColor: 'red' }}
                onClick={handleInputState('edit')(false)}
              />
              <Button
                type='submit'
                text='Save'
                style={{ backgroundColor: '#0AA284' }}
                onClick={() => (
                  handleUpdate(), handleInputState('edit')(false)
                )}
              />
            </>
          )}
          {/* Add Button */}
          {!inputState.add && !inputState.edit && (
            <Button
              type='button'
              text='Add Email'
              onClick={handleInputState('add')(true)}
            />
          )}
          {inputState.add && !inputState.edit && (
            <>
              <Button
                type='button'
                text='Cancel'
                style={{ backgroundColor: 'red' }}
                onClick={handleInputState('add')(false)}
              />
              <Button
                type='submit'
                text='Add Email'
                style={{ backgroundColor: '#0AA284' }}
                onClick={() => (handleSubmit(), handleInputState('add')(false))}
              />
            </>
          )}
        </form>
      </div>
    </div>
  );
};
export default Email;
