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
  const [inputState, setInputState] = useState({ edit: false, add: false });
  const [errors, setErrors] = useState({
    city: null,
    postal_code: null,
    address1: null,
    address2: null
  });
  const { user } = useAuth();
  const { get, post, patch, loading } = useApi();

  const handleInputState = (prop) => (value) => () => {
    setInputState((prev) => ({ ...prev, [prop]: value }));
  };
  const getAddresses = async () => {
    await get(`/user-addresses/${user.id}`)
      .then((res) => setAddresses(res.data))
      .catch((err) => console.log(err));
  };
  const addAddress = async () => {
    try {
      const response = await post('/user-addresses', {
        ...values,
        user_id: user.id
      });
      setAddresses((prev) => [...prev, response.data]);
      setValues({
        city: '',
        postal_code: '',
        address1: '',
        address2: ''
      });
    } catch (error) {
      const errors = error.response.data.errors;
      errors.forEach((error) => {
        if (error.city) {
          setErrors((prev) => ({ ...prev, city: error.city }));
        }
        if (error.postal_code) {
          setErrors((prev) => ({ ...prev, postal_code: error.postal_code }));
        }
        if (error.address1) {
          setErrors((prev) => ({ ...prev, address1: error.address1 }));
        }
        if (error.address2) {
          setErrors((prev) => ({ ...prev, address2: error.address2 }));
        }
      });
    }
  };
  const updateAddress = async () => {
    try {
      const response = await patch('/user-addresses', {
        ...values,
        user_id: user.id
      });
      setAddresses((prev) =>
        prev.map((address) =>
          address.id === response.data.id
            ? {
                ...address,
                ...response.data
              }
            : address
        )
      );
      setValues({
        city: '',
        postal_code: '',
        address1: '',
        address2: ''
      });
    } catch (error) {
      const errors = error.response.data.errors;
      errors.forEach((error) => {
        if (error.city) {
          setErrors((prev) => ({ ...prev, city: error.city }));
        }
        if (error.postal_code) {
          setErrors((prev) => ({ ...prev, postal_code: error.postal_code }));
        }
        if (error.address1) {
          setErrors((prev) => ({ ...prev, address1: error.address1 }));
        }
        if (error.address2) {
          setErrors((prev) => ({ ...prev, address2: error.address2 }));
        }
      });
    }
  };
  const handleChangeAddress = (id) => (prop) => (event) => {
    if (typeof errors[prop] === 'string') {
      setErrors((prev) => ({ ...prev, [prop]: null }));
    }
    setAddresses((prev) =>
      prev.map((address) =>
        address.id === id ? { ...address, [prop]: event.target.value } : address
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
    updateAddress();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    addAddress();
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
          error: errors.city,
          disabled: !inputState.edit,
          onChange: handleChangeAddress('city')
        },
        {
          key: `postal_code${address.id}`,
          id: 'postal_code',
          label: 'Postal Code',
          value: address.postal_code,
          error: errors.postal_code,
          disabled: !inputState.edit,
          onChange: handleChangeAddress('postal_code')
        },
        {
          key: `address1${address.id}`,
          id: 'address1',
          label: 'Address 1',
          value: address.address1,
          error: errors.address1,
          disabled: !inputState.edit,
          onChange: handleChangeAddress('address1')
        },
        {
          key: `address2${address.id}`,
          id: 'address2',
          label: 'Address 2',
          value: address.address2,
          error: errors.address2,
          disabled: !inputState.edit,
          onChange: handleChangeAddress('address2')
        }
      )
    )
  ];
  const AddInputs = [
    {
      key: 'city',
      id: 'city',
      label: 'City',
      type: 'text',
      placeholder: 'City',
      value: values.city,
      error: errors.city,
      onChange: handleChange('city')
    },
    {
      key: 'postal_code',
      id: 'postal_code',
      label: 'Postal Code',
      type: 'text',
      placeholder: 'Postal code',
      value: values.postal_code,
      error: errors.postal_code,
      onChange: handleChange('postal_code')
    },
    {
      key: 'address1',
      id: 'address1',
      label: 'Address 1',
      type: 'text',
      placeholder: 'Street 1',
      value: values.address1,
      error: errors.address1,
      onChange: handleChange('address1')
    },
    {
      key: 'address2',
      id: 'address2',
      label: 'Address 2',
      type: 'text',
      placeholder: 'Street 2',
      value: values.address2,
      error: errors.address2,
      onChange: handleChange('address2')
    }
  ];
  return (
    <div className={styles['address-section']}>
      <div className={styles['left-side']}>
        <h3>
          <i className='fa-solid fa-location-dot'></i>
          <span>Address</span>
        </h3>
        <span>Add or change your address from here</span>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          {Inputs.map((input) => (
            <Input {...input} />
          ))}
          {inputState.add && AddInputs.map((input) => <Input {...input} />)}
          {Inputs.length > 0 && !inputState.edit && !inputState.add && (
            <Button
              type='button'
              text='Edit Address'
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
              text='Add Address'
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
                text='Add Address'
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
export default Address;
