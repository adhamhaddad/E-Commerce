import React, { useState, useEffect } from 'react';
import Input from '@UI/input';
import Button from '@UI/button';
import { useApi } from '@config';
import { useAuth } from '@hooks';
import styles from '@styles/phone.module.css';

const Phone = () => {
  const [phones, setPhones] = useState([]);
  const [values, setValues] = useState({ phone: '' });
  const [error, setError] = useState({ phone: null });
  const { user } = useAuth();
  const { get, post, loading } = useApi();

  const getPhones = async () => {
    await get(`/phones/${user.id}`)
      .then((res) => setPhones(res.data))
      .catch((err) => console.log(err));
  };
  const addPhone = async () => {
    try {
      const response = await post('/phones', { ...values, user_id: user.id });
      setValues({ phone: '' });
      setPhones((prev) => [...prev, response.data]);
    } catch (error) {
      const errors = error.response.data.errors;
      setError(errors[0]);
    }
  };
  const handleChange = (prop) => (event) => {
    if (error.phone) {
      setError({ phone: null });
    }
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
      setError({ phone: null });
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
      error: error.phone,
      onChange: handleChange('phone')
    }
  ];

  return (
    <div className={styles['phone-section']}>
      <div className={styles['left-side']}>
        <h3>
          <i className='fa-solid fa-phone'></i>
          <span>Phone Number</span>
        </h3>
        <span>Add or change your phone number from here</span>
      </div>
      <div>
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
    </div>
  );
};
export default Phone;
