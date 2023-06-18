import React, { useState, useEffect } from 'react';
import Input from '@UI/input';
import Button from '@UI/button';
import { useApi } from '@config';
import { useAuth } from '@hooks';
import styles from '@styles/email.module.css';

const Email = () => {
  const [emails, setEmails] = useState([]);
  const [values, setValues] = useState({ email: '' });
  const [error, setError] = useState({ email: null });
  const { user } = useAuth();
  const { get, post, loading } = useApi();

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
      const errors = error.response.data.errors;
      setError(errors[0]);
    }
  };
  const handleChange = (prop) => (event) => {
    if (error.email) {
      setError({ email: null });
    }
    setValues((prev) => ({ ...prev, [prop]: event.target.value }));
  };

  const handleChangeEmail = (prop) => (event) => {
    // setEmails(prev => [...prev, {}])
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
      value: email.email,
      onChange: handleChangeEmail('email')
    })),
    {
      key: 'new_email',
      id: 'new_email',
      label: 'New Email',
      value: values.email,
      error: error.email,
      onChange: handleChange('email')
    }
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
          <Button
            type='submit'
            text='Add Email'
            style={{
              display: 'block',
              padding: '10px',
              margin: '10px 0px',
              border: '1px solid #888',
              borderRadius: '4px'
            }}
          />
        </form>
      </div>
    </div>
  );
};
export default Email;
