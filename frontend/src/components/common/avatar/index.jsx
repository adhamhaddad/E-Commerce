import React, { useState, useEffect } from 'react';
import Input from '@UI/input';
import Button from '@UI/button';
import { useApi } from '@config';
import { useAuth } from '@hooks';
import styles from '@styles/username.module.css';

const Avatar = () => {
  const [values, setValues] = useState({ image_url: '' });
  const [errors, setErrors] = useState({ first_name: null, last_name: null });
  const { user } = useAuth();
  const { get, patch, loading } = useApi();

  const getProfilePicture = async () => {
    try {
      const response = await get(`/profile-pictures/${user.id}`);
      setValues(response.data);
    } catch (error) {
      console.log(err);
    }
  };
  const createProfilePicture = async () => {
    try {
      const response = await patch(`/profile-pictures/${user.id}`, values);
      setValues(response.data);
    } catch (error) {
      errors.forEach((error) => {
        if (error.first_name) {
          setErrors((prev) => ({ ...prev, first_name: error.first_name }));
        }
        if (error.last_name) {
          setErrors((prev) => ({ ...prev, last_name: error.last_name }));
        }
      });
    }
  };

  const handleChange = (prop) => (event) => {
    if (!errors.first_name || !errors.last_name) {
      setErrors({ first_name: null, last_name: null });
    }
    setValues((prev) => ({ ...prev, [prop]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser();
  };

  useEffect(() => {
    getProfilePicture();

    return () => {
      setErrors({ first_name: null, last_name: null });
      setValues({ first_name: '', last_name: '' });
    };
  }, []);

  const Inputs = [
    {
      key: 'first_name',
      id: 'first_name',
      label: 'First Name',
      type: 'text',
      placeholder: 'First name',
      value: values.first_name,
      error: errors.first_name,
      onChange: handleChange('first_name')
    },
    {
      key: 'last_name',
      id: 'last_name',
      label: 'Last Name',
      type: 'text',
      placeholder: 'Last name',
      value: values.last_name,
      error: errors.last_name,
      onChange: handleChange('last_name')
    }
  ];
  return (
    <div className={styles['username-section']}>
      <div className={styles['left-side']}>
        <h3>
          <i className='fa-solid fa-user'></i>
          <span>User Name</span>
        </h3>
        <span>Change your name form here</span>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          {Inputs.map((input) => (
            <Input
              {...input}
              style={{ display: 'inline-block', margin: '0px 10px 10px 0px' }}
            />
          ))}
          <Button type='submit' text='Save Changes' onClick={handleSubmit} />
        </form>
      </div>
    </div>
  );
};
export default Avatar;
