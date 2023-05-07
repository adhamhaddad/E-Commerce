import React, { useState, useEffect } from 'react';
import Input from '../../components/UI/input';
import Button from '../../components/UI/button';
import { api } from '../../config';
import { useAuth } from '../../hooks/useAuth';
import styles from '../../styles/username.module.css';

const UserName = () => {
  const [values, setValues] = useState({ first_name: '', last_name: '' });
  const { user } = useAuth();

  const getUser = async () => {
    await api
      .get(`/users/${user.id}`)
      .then((res) => setValues(res.data))
      .catch((err) => console.log(err));
  };
  const handleChange = (prop) => (event) => {
    setValues((prev) => ({ ...prev, [prop]: event.target.value }));
  };

  const Inputs = [
    {
      key: 'first_name',
      id: 'first_name',
      label: 'First Name',
      value: values.first_name,
      onChange: handleChange('first_name')
    },
    {
      key: 'last_name',
      id: 'last_name',
      label: 'Last Name',
      value: values.last_name,
      onChange: handleChange('last_name')
    }
  ];
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    getUser();

    return () => {
      setValues({ first_name: '', last_name: '' });
    };
  }, []);

  return (
    <div className={styles['username']}>
      <h2>User Name</h2>
      <form onSubmit={handleSubmit}>
        {Inputs.map((input) => (
          <Input
            {...input}
            style={{ display: 'inline-block', margin: '0px 10px 10px 0px' }}
          />
        ))}
        <Button
          type='submit'
          text='Save Changes'
          style={{
            display: 'block',
            padding: '10px',
            border: '1px solid #888',
            borderRadius: '4px'
          }}
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};
export default UserName;
