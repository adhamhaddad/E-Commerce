import React, { useState, useEffect } from 'react';
import Input from '@UI/input';
import Button from '@UI/button';
import { useApi } from '@config';
import { useAuth } from '@hooks';
import styles from '@styles/address.module.css';

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [values, setValues] = useState({
    city: '',
    postal_code: '',
    address1: '',
    address2: ''
  });
  const { user } = useAuth();
  const { get, post, loading } = useApi();

  const getAddresses = async () => {
    await get(`/user-addresses/${user.id}`)
      .then((res) => setAddresses(res.data))
      .catch((err) => console.log(err));
  };

  const addAddress = async () => {
    await post('/user-addresses', { ...values, user_id: user.id })
      .then((res) => {
        setValues({
          city: '',
          postal_code: '',
          address1: '',
          address2: ''
        });
        setAddresses((prev) => [...prev, res.data]);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (prop) => (event) => {
    setValues((prev) => ({ ...prev, [prop]: event.target.value }));
  };

  const handleChangeAddress = (prop) => (event) => {
    setAddresses();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addAddress();
  };

  useEffect(() => {
    getAddresses();

    return () => {
      setAddresses([]);
      setValues({ city: '', postal_code: '', address1: '', address2: '' });
    };
  }, []);

  const Inputs = [
    ...addresses.map(
      (address) => (
        {
          key: `city${address.id}`,
          id: address.id,
          label: 'City',
          value: address.city,
          onChange: handleChangeAddress('city')
        },
        {
          key: `postal_code${address.id}`,
          id: 'postal_code',
          label: 'Postal Code',
          value: address.postal_code,
          onChange: handleChangeAddress('postal_code')
        },
        {
          key: `address1${address.id}`,
          id: 'address1',
          label: 'Address 1',
          value: address.address1,
          onChange: handleChangeAddress('address1')
        },
        {
          key: `address2${address.id}`,
          id: 'address2',
          label: 'Address 2',
          value: address.address2,
          onChange: handleChangeAddress('address2')
        }
      )
    ),
    {
      key: 'city',
      id: 'City',
      label: 'City',
      value: values.city,
      onChange: handleChange('city')
    },
    {
      key: 'postal_code',
      id: 'postal_code',
      label: 'Postal Code',
      value: values.postal_code,
      onChange: handleChange('postal_code')
    },
    {
      key: 'address1',
      id: 'address1',
      label: 'Address 1',
      value: values.address1,
      onChange: handleChange('address1')
    },
    {
      key: 'address2',
      id: 'address2',
      label: 'Address 2',
      value: values.address2,
      onChange: handleChange('address2')
    }
  ];

  return (
    <div className={styles['address']}>
      <h2>Address</h2>
      <form onSubmit={handleSubmit}>
        {Inputs.map((input) => (
          <Input {...input} />
        ))}
        <Button
          type='submit'
          text='Add Address'
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
export default Address;
