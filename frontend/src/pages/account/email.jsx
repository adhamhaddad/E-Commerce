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

  const getEmail = async () => {
    await api
      .get(`/emails/${user.id}`)
      .then((res) => setEmails(res.data))
      .catch((err) => console.log(err));
  };
  const handleChange = (prop) => (event) => {
    setValues((prev) => ({ ...prev, [prop]: event.target.value }));
  };

  const Inputs = [
    {
      id: 'new-email',
      label: 'New Email',
      value: values.email,
      onChange: handleChange('email')
    }
  ];
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    // getEmail();

    return () => {
      setEmails([]);
      setValues({ email: '' });
    };
  }, []);

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
