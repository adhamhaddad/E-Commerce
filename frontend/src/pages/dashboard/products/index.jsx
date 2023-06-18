import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@hooks';
import { useApi, API_URL } from '@config';
import Modal from '@common/modal';
import styles from '@styles/dashboard/products/index.module.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();
  const { get, deleteFunc } = useApi();
  const [modalStatus, setModalStatus] = useState(false);
  const handleModalState = () => {
    setModalStatus((prev) => !prev);
  };
  const handleDelete = async (product_id) => {
    try {
      const response = await deleteFunc(`/products/${product_id}`);
      setProducts((prev) =>
        prev.filter((product) => product.id !== response.data.id)
      );
    } catch (error) {
      console.log(error);
    }
  };
  const getAllProducts = async () => {
    try {
      const response = await get('/products/all');
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const productsList =
    products.length > 0 &&
    products.map((product) => (
      <tr key={product.id}>
        <td>{product.id}</td>
        <td>
          <img
            src={`${API_URL}/${product.image_url}`}
            alt='Image'
            crossOrigin='anonymous'
            loading='lazy'
            className={styles['product_image']}
          />
        </td>
        <td>{product.name}</td>
        <td>{product.slug}</td>
        <td>EGP {product.price}</td>
        <td>{product.quantity}</td>
        <td>
          {new Date(product.created_at).toLocaleString('en-US', {
            dateStyle: 'short',
            timeStyle: 'short'
          })}
        </td>
        <td className={styles['actions']}>
          <button onClick={handleModalState}>
            <i className='fa-solid fa-trash-can'></i>
          </button>
          <button>
            <Link exact='true' to={`/dashboard/products/edit/${product.id}`}>
              <i className='fa-solid fa-pen-to-square'></i>
            </Link>
          </button>
        </td>
      </tr>
    ));
  useEffect(() => {
    getAllProducts();
    return () => setProducts([]);
  }, []);
  return (
    <div className={styles['dash-products-page']}>
      <div className={styles['top-bar']}>
        <h3>Products</h3>
        <button>
          <Link to='/dashboard/products/create'>+ Add Product</Link>
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Created at</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{productsList && productsList}</tbody>
      </table>
      {modalStatus && (
        <Modal
          onClick={handleModalState}
          children={
            <div className={styles['delete-product-modal']}>
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
export default ProductsPage;
