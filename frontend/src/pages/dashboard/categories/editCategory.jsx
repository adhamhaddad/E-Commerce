import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useApi } from '@config';
import { useAuth } from '@hooks';
import Input from '@UI/input';
import Button from '@UI/button';
import styles from '@styles/dashboard/categories/editCategory.module.css';

const EditCategoryPage = () => {
  const [values, setValues] = useState({
    name: '',
    slug: '',
    icon_url: null
  });
  const [errors, setErrors] = useState({
    id: null,
    name: null,
    slug: null,
    icon_url: null,
    user_id: null
  });
  const { id } = useParams();
  const { get, patch } = useApi();
  const { user } = useAuth();
  const inputFileRef = useRef(null);

  const getCategory = async () => {
    try {
      const response = await get(`categories/${id}`);
      console.log(response);
      // setValues(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const editCategory = async () => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('slug', values.slug);
    formData.append('icon_url', values.icon_url);
    formData.append('user_id', user.id);
    try {
      const response = await patch(`/categories/${id}`, formData);
      if (inputFileRef.current) {
        inputFileRef.current.resetValue();
      }
      setValues({ ...response.data, icon_url: null });
    } catch (error) {
      const errors = error.response.data.errors;
      errors.forEach((error) => {
        if (error.id) {
          setErrors((prev) => ({ ...prev, icon_url: error.id }));
        }
        if (error.user_id) {
          setErrors((prev) => ({ ...prev, icon_url: error.user_id }));
        }
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
  const handleCategoryIcon = (event) => {
    if (event.target.files.length > 0) {
      setValues((prev) => ({ ...prev, icon_url: event.target.files[0] }));
    }
  };
  const handleChange = (prop) => (event) => {
    setValues((prev) => ({ ...prev, [prop]: event.target.value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    editCategory();
  };

  useEffect(() => {
    getCategory();
    return () => {
      setValues({ id: null, name: '', slug: '', icon_url: '' });
    };
  }, []);
  const Inputs = [
    {
      key: 'name',
      id: 'name',
      label: 'Name',
      type: 'text',
      value: values.name,
      onChange: handleChange('name'),
      error: errors.name
    },
    {
      key: 'slug',
      id: 'slug',
      label: 'Slug',
      type: 'text',
      value: values.slug,
      onChange: handleChange('slug'),
      error: errors.slug
    },
    {
      key: 'icon',
      id: 'icon',
      label: 'Icon',
      type: 'file',
      ref: inputFileRef,
      onChange: handleCategoryIcon,
      error: errors.icon_url
    }
  ];
  return (
    <div className={styles['edit-category']}>
      <div className={styles['top-bar']}>
        <h3>Edit Category</h3>
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
        <Button text='Update Category' type='submit' />
      </form>
    </div>
  );
};
export default EditCategoryPage;
