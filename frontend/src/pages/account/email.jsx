import React, { useState, useEffect } from 'react';
import Input from '../../components/UI/input';
import Button from '../../components/UI/button';
import { api } from '../../config';
import { useAuth } from '../../hooks/useAuth';
import styles from '../../styles/email.module.css';

const Email = () => {
  const [emails, setEmails] = useState([]);
  const [values, setValues] = useState({ email: '' });
  const { user } = useAuth();

  const getEmails = async () => {
    await api
      .get(`/emails/${user.id}`)
      .then((res) => setEmails(res.data))
      .catch((err) => console.log(err));
  };
  const addEmail = async () => {
    await api
      .post('/emails', { ...values, user_id: user.id })
      .then((res) => {
        setValues({ email: '' });
        setEmails((prev) => [...prev, res.data]);
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (prop) => (event) => {
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
      onChange: handleChange('email')
    }
  ];

  return (
    <div className={styles['email']}>
      <h2>Email</h2>
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
  );
};
export default Email;
