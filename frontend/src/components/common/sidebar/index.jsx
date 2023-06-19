import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useApi, API_URL } from '@config';
import LoadingSpinner from '@common/loading';
import styles from '@styles/sidebar.module.css';

const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  const { get, loading } = useApi();

  const getCategories = async () => {
    try {
      const response = await get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const categoriesList =
    categories.length > 0 &&
    categories.map((category) => (
      <li key={category.id}>
        <NavLink
          exact
          to={`/products?category=${category.slug.trim()}&id=${
            category.id ?? ''
          }`}
          activeClassName={styles['active']}
        >
          <img
            src={`${API_URL}/${category.icon_url}`}
            crossOrigin='anonymous'
            alt='category_icon'
            className={styles['category_icon']}
          />
          <span>{category.name}</span>
        </NavLink>
      </li>
    ));

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <aside className={styles['sidebar']}>
      <ul className={styles['list']}>
        <li>
          <NavLink to='/products?category=all'>
            <span>All</span>
          </NavLink>
        </li>
        {loading && <LoadingSpinner />}
        {!loading && categoriesList && categoriesList}
      </ul>
    </aside>
  );
};
export default Sidebar;
