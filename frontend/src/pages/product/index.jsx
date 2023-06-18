import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useApi, API_URL } from '@config';
import Button from '@UI/button';
import styles from '@styles/product.module.css';

const ProductPage = () => {
  const [product, setProduct] = useState({});
  const { get, loading } = useApi();
  const { id } = useParams();
  const getProduct = async () => {
    await get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProduct();
    return () => {
      setProduct({});
    };
  }, [id]);

  return (
    <div className={styles['product-page']}>
      {loading && <p>Loading..</p>}
      {!loading && (
        <div className={styles['product-info']}>
          <div className={styles['product-image']}>
            <img
              src={`${API_URL}/${product.image_url}`}
              crossOrigin='anonymous'
              alt='product-image'
            />
          </div>
          <div className={styles['product-details']}>
            <span className={styles['product-name']}>{product.name}</span>
            <span className={styles['product-price']}>EGP {product.price}</span>
            <span className={styles['product-quantity']}>
              {product.quantity} items left
            </span>
            <p className={styles['description']}>{product.product_desc}</p>
            <Button text='ADD TO CART' />
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductPage;
