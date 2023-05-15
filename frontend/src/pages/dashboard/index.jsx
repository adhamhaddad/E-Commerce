import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api, API_URL } from '../../config';
import Button from '../../components/UI/button';
import AddProduct from './addProduct';
import AddCategory from './addCategory';
import styles from '../../styles/dashboard.module.css';

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    api
      .get('/categories/all')
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  };

  const handleDeleteCategory = async (category_id) => {
    api
      .delete(`/categories/${category_id}`)
      .then((res) =>
        setCategories((prev) =>
          prev.filter((category) => category.id !== res.data.id)
        )
      )
      .catch((err) => console.log(err));
  };

  const list =
    categories.length > 0 &&
    categories.map((category) => (
      <li key={category.id}>
        <Link to={`/${category.slug}`}>
          <img
            src={`${API_URL}/${category.icon_url}`}
            crossOrigin='anonymous'
            alt='category_icon'
            className={styles['category_icon']}
          />
          <span>{category.name}</span>
        </Link>
        <Button
          text='Delete'
          onClick={() => handleDeleteCategory(category.id)}
        />
      </li>
    ));

  useEffect(() => {
    getCategories();

    return () => {
      setCategories([]);
    };
  }, []);
  return (
    <div className={styles['dashboard-page']}>
      <AddCategory list={list} setCategories={setCategories} />
      <AddProduct categories={categories} />
    </div>
  );
};
export default Dashboard;