import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Input from '@UI/input';
import Button from '@UI/button';
import { useApi } from '@config';
import { useAuth } from '@hooks';
import styles from '@styles/dashboard/categories/createCategory.module.css';

const CreateCategoryPage = () => {
  const [values, setValues] = useState({
    name: '',
    slug: '',
    icon_url: null
  });
  const [errors, setErrors] = useState({
    name: null,
    slug: null,
    icon_url: null
  });
  const { user } = useAuth();
  const { post, loading } = useApi();
  const inputFileRef = useRef(null);
  const addCategory = async () => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('slug', values.slug);
    formData.append('icon_url', values.icon_url);
    formData.append('user_id', user.id);
    try {
      const response = await post('/categories', formData);
      if (inputFileRef.current) {
        inputFileRef.current.resetValue();
      }
      setValues({
        name: '',
        slug: '',
        icon_url: null
      });
    } catch (error) {
      const errors = error.response.data.errors;
      errors.forEach((error) => {
        if (error.name) {
          setErrors((prev) => ({ ...prev, name: error.name }));
        }
        if (error.slug) {
          setErrors((prev) => ({ ...prev, slug: error.slug }));
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
    addCategory();
  };
  useEffect(() => {
    return () => {
      setValues({
        name: '',
        slug: '',
        icon_url: ''
      });
    };
  }, []);

  const Inputs = [
    {
      key: 'name',
      id: 'name',
      label: 'Category Name',
      type: 'text',
      value: values.name,
      error: errors.name,
      onChange: handleChange('name')
    },
    {
      key: 'slug',
      id: 'slug',
      label: 'Category Slug',
      type: 'text',
      value: values.slug,
      error: errors.slug,
      onChange: handleChange('slug')
    },
    {
      key: 'icon_url',
      id: 'icon_url',
      label: 'Category Icon',
      type: 'file',
      error: errors.icon_url,
      ref: inputFileRef,
      onChange: handleCategoryIcon
    }
  ];

  return (
    <div className={styles['add-category']}>
      <div className={styles['top-bar']}>
        <h3>Create New Category</h3>
        <button>
          <Link to='/dashboard/categories'>Back</Link>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <div className={styles['left-side']}>
            <h3>Image</h3>
            <span>Upload your category image here</span>
          </div>
          <div className={styles['file-input']}>
            <Input {...Inputs[2]} />
          </div>
        </div>
        <div>
          <div className={styles['left-side']}>
            <h3>Description</h3>
            <span>
              Add your category details and necessary information here
            </span>
          </div>
          <div>
            <Input {...Inputs[0]} />
            <Input {...Inputs[1]} />
          </div>
        </div>
        <Button text='Add Category' type='submit' onClick={handleSubmit} />
      </form>
    </div>
  );
};
export default CreateCategoryPage;
