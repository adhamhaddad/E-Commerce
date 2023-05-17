import React, { useState, useEffect } from 'react';
import { useApi, API_URL } from '@config';
import styles from '@styles/product.module.css';

const Product = () => {
  const [product, setProduct] = useState({});
  const { get, loading } = useApi();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const getProduct = async () => {
    await get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  };

  console.log(product);
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
        <div className={styles['product-view']}>
          <div>
            <div className={styles['product-image']}>
              <img
                src={`${API_URL}/${product.image_url}`}
                crossOrigin='anonymous'
                alt='product-image'
              />
            </div>
            <span className={styles['product-name']}>{product.name}</span>
            <span className={styles['product-price']}>
              price: {product.price} EGP
            </span>
          </div>
          <div>
            <p className={styles['description']}>
              <strong>Description:</strong> {product.product_desc}
            </p>
            <span className={styles['quantity']}>
              <strong>Quantity:</strong> {product.quantity}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
export default Product;
