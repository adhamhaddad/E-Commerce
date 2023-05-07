import React, { useState, useEffect } from 'react';
import Input from '../../components/UI/input';
import Button from '../../components/UI/button';
import { api } from '../../config';
import { useAuth } from '../../hooks/useAuth';
import styles from '../../styles/phone.module.css';

const Phone = () => {
  const [phones, setPhones] = useState([]);
  const [values, setValues] = useState({ phone: '' });
  const { user } = useAuth();

  const getPhones = async () => {
    await api
      .get(`/phones/${user.id}`)
      .then((res) => setPhones(res.data))
      .catch((err) => console.log(err));
  };
  const addPhone = async () => {
    await api
      .post('/phones', { ...values, user_id: user.id })
      .then((res) => {
        setValues({ phone: '' });
        setPhones((prev) => [...prev, res.data]);
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (prop) => (event) => {
    setValues((prev) => ({ ...prev, [prop]: event.target.value }));
  };
  const handleChangePhone = (prop) => (event) => {
    setPhones((prev) => ({ ...prev, [prop]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addPhone();
  };

  useEffect(() => {
    getPhones();

    return () => {
      setPhones([]);
      setValues({ email: '' });
    };
  }, []);

  const Inputs = [
    ...phones.map((phone) => ({
      key: phone.id,
      id: phone.id,
      label: 'Phone',
      value: phone.phone,
      onChange: handleChangePhone('phone')
    })),
    {
      key: 'new_phone',
      id: 'new_phone',
      label: 'New Phone',
      value: values.phone,
      onChange: handleChange('phone')
    }
  ];

  return (
    <div className={styles['phone']}>
      <h2>Phone</h2>
      <form onSubmit={handleSubmit}>
        {Inputs.map((input) => (
          <Input {...input} />
        ))}
        <Button
          type='submit'
          text='Add Phone'
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
export default Phone;
