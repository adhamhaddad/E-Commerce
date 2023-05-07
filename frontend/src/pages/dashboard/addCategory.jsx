import React, { useState, useEffect } from 'react';
import Input from '../../components/UI/input';
import Button from '../../components/UI/button';
import { api } from '../../config';
import { useAuth } from '../../hooks/useAuth';
import styles from '../../styles/addCategory.module.css';

const AddCategory = ({ list, setCategories }) => {
  const [values, setValues] = useState({
    name: '',
    slug: '',
    icon_url: null
  });
  const { user } = useAuth();
  const addCategory = async () => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('slug', values.slug);
    formData.append('icon_url', values.icon_url);
    formData.append('user_id', user.id);

    api
      .post('/categories', formData)
      .then((res) => {
        setCategories((prev) => [...prev, res.data]);
        setValues({
          name: '',
          slug: '',
          icon_url: null
        });
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (prop) => (event) => {
    setValues((prev) => ({ ...prev, [prop]: event.target.value }));
  };

  const handleCategoryIcon = (event) => {
    setValues((prev) => ({ ...prev, icon_url: event.target.files[0] }));
  };

  const handleSubmit = async (event) => {
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
      onChange: handleChange('name')
    },
    {
      key: 'slug',
      id: 'slug',
      label: 'Category Slug',
      type: 'text',
      value: values.slug,
      onChange: handleChange('slug')
    },
    {
      key: 'icon_url',
      id: 'icon_url',
      label: 'Category Icon',
      type: 'file',
      onChange: handleCategoryIcon
    }
  ];

  return (
    <>
      <h2>Categories</h2>
      <div className={styles['add-category']}>
        <form onSubmit={handleSubmit} className={styles['add-category_form']}>
          {Inputs.map((input) => (
            <Input {...input} />
          ))}
          <Button text='Add Category' type='submit' onClick={handleSubmit} />
        </form>
        <div className={styles['categories-list']}>
          <ul>{list ?? list}</ul>
        </div>
      </div>
    </>
  );
};
export default AddCategory;
