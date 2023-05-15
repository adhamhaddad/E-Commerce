import React, { useState, useEffect } from 'react';
import { useApi } from '@config';
import Card from '@UI/card';
import styles from '@styles/products.module.css';

const Product = () => {
  const [product, setProduct] = useState({});
  const { get, post, loading } = useApi();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const getProduct = async () => {
    await get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    id !== null && getProduct();
    return () => {
      setProduct({});
    };
  }, [id]);

  return (
    <div className={styles['products-list']}>
      <h1>Product Page</h1>
      {loading && <p>Loading..</p>}
      {!loading && (
        <Card
          key={product.id}
          id={product.id}
          name={product.name}
          image_url={product.image_url}
          price={product.price}
        />
      )}
    </div>
  );
};
export default Product;
