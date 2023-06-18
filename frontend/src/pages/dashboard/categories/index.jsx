import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@hooks';
import { useApi, API_URL } from '@config';
import styles from '@styles/dashboard/categories/index.module.css';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const { user } = useAuth();
  const { get, deleteFunc } = useApi();

  const getAllCategories = async () => {
    try {
      const response = await get(`/categories/admin/all/${user.id}`);
      console.log(response.data);
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteCategory = async (category_id) => {
    await deleteFunc(`/categories/${category_id}`)
      .then((res) =>
        setCategories((prev) =>
          prev.filter((category) => category.id !== res.data.id)
        )
      )
      .catch((err) => console.log(err));
  };
  const categoriesList =
    categories.length > 0 &&
    categories.map((category) => (
      <tr key={category.id}>
        <td>{category.id}</td>
        <td>{category.name}</td>
        <td>{category.slug}</td>
        <td>
          <img
            src={`${API_URL}/${category.icon_url}`}
            alt='Icon'
            crossOrigin='anonymous'
            loading='lazy'
            className={styles['category_icon']}
          />
        </td>
        <td>
          {new Date(category.created_at).toLocaleString('en-US', {
            dateStyle: 'short',
            timeStyle: 'short'
          })}
        </td>
        <td className={styles['actions']}>
          <button onClick={() => handleDeleteCategory(category.id)}>
            <i className='fa-solid fa-trash-can'></i>
          </button>
          <button>
            <Link exact='true' to={`/dashboard/categories/edit/${category.id}`}>
              <i className='fa-solid fa-pen-to-square'></i>
            </Link>
          </button>
        </td>
      </tr>
    ));
  useEffect(() => {
    getAllCategories();
    return () => setCategories([]);
  }, []);
  return (
    <div className={styles['dash-categories-page']}>
      <div className={styles['top-bar']}>
        <h3>Categories</h3>
        <button>
          <Link to='/dashboard/categories/create'>+ Add Categories</Link>
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Icon</th>
            <th>Created at</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{categoriesList && categoriesList}</tbody>
      </table>
    </div>
  );
};
export default CategoriesPage;
