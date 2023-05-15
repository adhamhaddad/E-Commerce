import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useApi, API_URL } from '@config';
import styles from '@styles/sidebar.module.css';

const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  const { get, post, loading } = useApi();

  const getCategories = async () => {
    await get('/categories/all')
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCategories();
  }, []);

  const list =
    categories.length > 0 &&
    categories.map((category) => (
      <li key={category.id}>
        <NavLink
          activeClassName={styles['active']}
          to={`/products?category=${category.slug.trim()}&id=${
            category.id ?? ''
          }`}
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

  return (
    <aside className={styles['sidebar']}>
      <ul className={styles['list']}>{list ?? list}</ul>
    </aside>
  );
};
export default Sidebar;
