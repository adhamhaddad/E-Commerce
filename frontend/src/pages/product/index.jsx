import React, { useState, useEffect } from 'react';
import { api } from '../../config';
import Card from '../../components/UI/card';
import styles from '../../styles/products.module.css';

const Product = ({  }) => {
  const [product, setProduct] = useState({});

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
    category_id && getProducts();
  }, [category_id]);

  return <div className={styles['products-list']}>
    {productList ?? productList}
  </div>;
};
export default Product;
