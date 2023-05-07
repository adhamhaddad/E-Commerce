import React, { useState, useEffect } from 'react';
import { api } from '../../config';
import Card from '../../components/UI/card';
import styles from '../../styles/products.module.css';

const Products = ({ category_id }) => {
  const [products, setProducts] = useState([]);
  const getProducts = () => {
    api
      .get(`/products/all/${category_id}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };
  const getAllProducts = () => {
    api
      .get('/products/all')
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };
  const productList =
    products.length > 0 &&
    products.map((product) => (
      <Card
        key={product.id}
        id={product.id}
        name={product.name}
        image_url={product.image_url}
        price={product.price}
      />
    ));
  useEffect(() => {
    category_id === null && getAllProducts();
    category_id && getProducts();

    return () => {
      setProducts([]);
    };
  }, [category_id]);

  return (
    <div className={styles['products-list']}>
      {productList ?? productList}
      {!productList && <p>This Category is empty.</p>}
    </div>
  );
};
export default Products;
