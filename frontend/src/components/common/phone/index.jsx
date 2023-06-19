import React, { useState, useEffect } from 'react';
import Input from '@UI/input';
import Button from '@UI/button';
import { useApi } from '@config';
import { useAuth } from '@hooks';
import styles from '@styles/phone.module.css';

const Phone = () => {
  const [phones, setPhones] = useState([]);
  const [values, setValues] = useState({ phone: '' });
  const [inputState, setInputState] = useState({ edit: false, add: false });
  const [errors, setErrors] = useState({ phone: null });
  const { user } = useAuth();
  const { get, post, patch, loading } = useApi();

  const handleInputState = (prop) => (value) => () => {
    setInputState((prev) => ({ ...prev, [prop]: value }));
  };
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
      const duplicatePhone = error.response.data.message;

      if (errors) {
        setErrors(errors[0]);
      }
      if (duplicatePhone.includes('phones_phone_key')) {
        setErrors((prev) => ({
          ...prev,
          phone: 'Phone number has taken before'
        }));
      }
    }
  };
  const updatePhone = async () => {
    try {
      const response = await patch('/phones', { ...values, user_id: user.id });
      setValues({ phone: '' });
      setPhones((prev) => [...prev, response.data]);
    } catch (error) {
      const errors = error.response.data.errors;
      const duplicatePhone = error.response.data.message;

      if (errors) {
        setErrors(errors[0]);
      }
      if (duplicatePhone.includes('phones_phone_key')) {
        setErrors((prev) => ({
          ...prev,
          phone: 'Phone number has taken before'
        }));
      }
    }
  };
  const handleChangePhone = (id) => (prop) => (event) => {
    if (typeof errors[prop] === 'string') {
      setErrors((prev) => ({ ...prev, [prop]: null }));
    }
    setPhones((prev) =>
      prev.map((phone) =>
        phone.id === id ? { ...phone, [prop]: event.target.value } : phone
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
    updatePhone();
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
      setErrors({ phone: null });
    };
  }, []);

  const Inputs = [
    ...phones.map((phone) => ({
      key: phone.id,
      id: phone.id,
      label: 'Phone',
      type: 'tel',
      placeholder: 'Phone number',
      value: phone.phone,
      error: errors.phone,
      disabled: !inputState.edit,
      onChange: handleChangePhone(phone.id)('phone')
    }))
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
          {inputState.add && (
            <Input
              key='new_phone'
              id='new_phone'
              label='New Phone'
              type='tel'
              placeholder='New phone number'
              value={values.phone}
              error={errors.phone}
              onChange={handleChange('phone')}
            />
          )}
          {Inputs.length > 0 && !inputState.edit && !inputState.add && (
            <Button
              type='button'
              text='Edit Phone'
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
              text='Add Phone'
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
                text='Add Phone'
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
export default Phone;
