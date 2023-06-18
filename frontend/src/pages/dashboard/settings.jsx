import React, { useState, useEffect, useRef } from 'react';
import Input from '@UI/input';
import Button from '@UI/button';
import { useApi } from '@config';
import { useAuth } from '@hooks';
import styles from '@styles/dashboard/settings.module.css';

const SettingsPage = () => {
  const [values, setValues] = useState({
    site_title: '',
    icon_url: null
  });
  const [errors, setErrors] = useState({
    site_title: '',
    icon_url: null
  });
  const { user } = useAuth();
  const { post, loading } = useApi();
  const inputFileRef = useRef(null);
  const updateSettings = async () => {
    const formData = new FormData();
    formData.append('site_title', values.site_title);
    formData.append('icon_url', values.icon_url);
    try {
      const response = await post('/categories', formData);
      if (inputFileRef.current) {
        inputFileRef.current.resetValue();
      }
      setValues({
        site_title: '',
        icon_url: null
      });
    } catch (error) {
      const errors = error.response.data.errors;
      errors.forEach((error) => {
        if (error.site_title) {
          setErrors((prev) => ({ ...prev, site_title: error.site_title }));
        }
        if (error.icon_url) {
          setErrors((prev) => ({ ...prev, icon_url: error.icon_url }));
        }
      });
    }
  };

  const handleChange = (prop) => (event) => {
    setValues((prev) => ({ ...prev, [prop]: event.target.value }));
  };

  const handleCategoryIcon = (event) => {
    setValues((prev) => ({ ...prev, icon_url: event.target.files[0] }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateSettings();
  };
  useEffect(() => {
    return () => {
      setValues({
        site_title: '',
        icon_url: ''
      });
    };
  }, []);

  const Inputs = [
    {
      key: 'site_title',
      id: 'site_title',
      label: 'Site Title',
      type: 'text',
      value: values.site_title,
      error: errors.site_title,
      onChange: handleChange('site_title')
    },
    {
      key: 'icon_url',
      id: 'icon_url',
      label: 'Logo Image',
      type: 'file',
      error: errors.icon_url,
      ref: inputFileRef,
      onChange: handleCategoryIcon
    }
  ];

  return (
    <div className={styles['settings-page']}>
      <div className={styles['top-bar']}>
        <h3>Settings</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <div className={styles['left-side']}>
            <h3>Logo</h3>
            <span>Upload your site logo from here</span>
          </div>
          <div className={styles['file-input']}>
            <Input {...Inputs[1]} />
          </div>
        </div>
        <div>
          <div className={styles['left-side']}>
            <h3>Information</h3>
            <span>Change your site information from here</span>
          </div>
          <div>
            <Input {...Inputs[0]} />
          </div>
        </div>
        <Button text='Save Settings' type='submit' onClick={handleSubmit} />
      </form>
    </div>
  );
};
export default SettingsPage;
