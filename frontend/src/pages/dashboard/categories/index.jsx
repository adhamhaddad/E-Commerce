import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@hooks';
import { useApi, API_URL } from '@config';
import Modal from '@common/modal';
import LoadingSpinner from '@common/loading';
import styles from '@styles/dashboard/categories/index.module.css';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const { user } = useAuth();
  const { get, deleteFunc, loading } = useApi();

  const handleCategoryId = (id) => {
    setCategoryId(id);
  };
  const handleModalState = () => {
    setModalStatus((prev) => !prev);
  };
  const handleDelete = async () => {
    try {
      const response = await deleteFunc(`/categories/${categoryId}`);
      setCategories((prev) =>
        prev.filter((category) => category.id !== response.data.id)
      );
    } catch (error) {
      console.log(error);
    }
  };
  const getAllCategories = async () => {
    try {
      const response = await get(`/categories/admin/all/${user.id}`);
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
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
            dateStyle: 'medium',
            timeStyle: 'short'
          })}
        </td>
        <td className={styles['actions']}>
          <button
            onClick={() => (handleModalState(), handleCategoryId(category.id))}
          >
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
        <tbody>
          {loading && (
            <tr>
              <td colSpan='8' style={{ textAlign: 'center' }}>
                <LoadingSpinner />
              </td>
            </tr>
          )}
          {!loading && categoriesList && categoriesList}
        </tbody>
      </table>
      {modalStatus && (
        <Modal
          onClick={handleModalState}
          children={
            <div className={styles['delete-category-modal']}>
              <h3 className={styles['modal-title']}>Delete</h3>
              <p className={styles['modal-message']}>
                Are you sure, you want to delete?
              </p>
              <div className={styles['modal-actions']}>
                <button
                  className={styles['cancel-button']}
                  onClick={handleModalState}
                >
                  Cancel
                </button>
                <button
                  className={styles['delete-button']}
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          }
        />
      )}
    </div>
  );
};
export default CategoriesPage;
