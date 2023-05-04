import React, { useState, useEffect } from 'react';
import Input from '../../components/UI/input';
import Button from '../../components/UI/button';
import { api } from '../../config';
import styles from '../../styles/addCategory.module.css';
import { useAuth } from '../../hooks/useAuth';

const AddCategory = () => {
  const [values, setValues] = useState({
    name: '',
    slug: '',
    icon_url: ''
  });
  const { user } = useAuth();

  const handleChange = (prop) => (event) => {
    setValues((prev) => ({ ...prev, [prop]: event.target.value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await api.post('/categories', {
      ...values,
      user_id: user.id
    });
    const data = response;
    console.log(data);
    console.log(response.ok);
  };

  const Inputs = [
    {
      id: 'name',
      label: 'Category Name',
      type: 'text',
      placeholder: 'Category name',
      value: values.name,
      onChange: handleChange('name')
    },
    {
      id: 'slug',
      label: 'Category Slug',
      type: 'text',
      placeholder: 'Category slug',
      value: values.slug,
      onChange: handleChange('slug')
    },
    {
      id: 'icon_url',
      label: 'Category Icon',
      type: 'file',
      placeholder: 'Category icon',
      value: values.icon_url,
      onChange: handleChange('icon_url')
    }
  ];

  useEffect(() => {
    return () => {
      setValues({
        name: '',
        slug: '',
        icon_url: ''
      });
    };
  }, []);

  return (
    <div className={styles['add-category']}>
      <form onSubmit={handleSubmit} className={styles['add-category_form']}>
        {Inputs.map((input) => (
          <Input {...input} />
        ))}
        <Button text='Add Category' type='submit' onClick={handleSubmit} />
      </form>
    </div>
  );
};
export default AddCategory;
