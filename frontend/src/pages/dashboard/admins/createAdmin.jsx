import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Input from '@UI/input';
import Button from '@UI/button';
import { useApi } from '@config';
import { useAuth } from '@hooks';
import styles from '@styles/dashboard/admins/createAdmin.module.css';

const CreateAdminPage = () => {
  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    role: 'SUPER_ADMIN',
    password: ''
  });
  const [errors, setErrors] = useState({
    first_name: null,
    last_name: null,
    email: null,
    role: null,
    password: null
  });
  const { user } = useAuth();
  const { post, loading } = useApi();
  const addAdmin = async () => {
    try {
      const response = await post('/admins', values);
      setValues({
        first_name: '',
        last_name: '',
        email: '',
        role: 'SUPER_ADMIN',
        password: ''
      });
    } catch (error) {
      const errors = error.response.data.errors;
      errors.forEach((error) => {
        if (error.first_name) {
          setErrors((prev) => ({ ...prev, first_name: error.first_name }));
        }
        if (error.last_name) {
          setErrors((prev) => ({ ...prev, last_name: error.last_name }));
        }
        if (error.email) {
          setErrors((prev) => ({ ...prev, email: error.email }));
        }
        if (error.role) {
          setErrors((prev) => ({ ...prev, role: error.role }));
        }
      });
    }
  };

  const handleChange = (prop) => (event) => {
    setValues((prev) => ({ ...prev, [prop]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addAdmin();
  };
  useEffect(() => {
    return () => {
      setValues({
        first_name: '',
        last_name: '',
        email: '',
        role: 'SUPER_ADMIN',
        password: ''
      });
    };
  }, []);

  const Inputs = [
    {
      key: 'first_name',
      id: 'first_name',
      label: 'First Name',
      type: 'text',
      value: values.first_name,
      error: errors.first_name,
      onChange: handleChange('first_name')
    },
    {
      key: 'last_name',
      id: 'last_name',
      label: 'Last Name',
      type: 'text',
      value: values.last_name,
      error: errors.last_name,
      onChange: handleChange('last_name')
    },
    {
      key: 'email',
      id: 'email',
      label: 'Email Address',
      type: 'text',
      value: values.email,
      error: errors.email,
      onChange: handleChange('email')
    },
    {
      key: 'password',
      id: 'password',
      label: 'New Password',
      type: 'password',
      value: values.password,
      error: errors.password,
      onChange: handleChange('password')
    }
  ];

  return (
    <div className={styles['add-admin']}>
      <div className={styles['top-bar']}>
        <h3>Create New Admin</h3>
        <button>
          <Link to='/dashboard/admins'>Back</Link>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <div className={styles['left-side']}>
            <h3>Information</h3>
            <span>Add your admin details and necessary information here</span>
          </div>
          <div>
            {Inputs.map((input) => (
              <Input {...input} />
            ))}
          </div>
        </div>
        <div>
          <div className={styles['left-side']}>
            <h3>Admin Role</h3>
            <span>Add your admin role here</span>
          </div>
          <div>
            <label htmlFor='role'>Select Role</label>
            <select
              id='role'
              defaultValue={values.role}
              onChange={handleChange('role')}
            >
              <option value='SUPER_ADMIN'>Super Admin</option>
              <option value='STORE_OWNER'>Store Owner</option>
            </select>
          </div>
        </div>
        {!loading && (
          <Button text='Add Admin' type='submit' onClick={handleSubmit} />
        )}
      </form>
    </div>
  );
};
export default CreateAdminPage;
