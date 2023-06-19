import React, { useState, useEffect } from 'react';
import { useApi } from '@config';
import Card from '@UI/card';
import LoadingSpinner from '@common/loading';
import styles from '@styles/products.module.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState(null);
  const { get, deleteFunc, loading } = useApi();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const category = searchParams.get('category');
  const name = searchParams.get('name');

  const getProducts = async () => {
    try {
      const response = await get(`/products/all/${id}`);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllProducts = async () => {
    try {
      const response = await get('/products/all');
      setProducts(response.data);
    } catch (error) {
      console.log(err);
    }
  };

  const getProductBySearch = async () => {
    try {
      const response = await get('/products/search', { params: { name } });
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProduct = async (product_id) => {
    try {
      const response = await deleteFunc(`/products/${product_id}`);
      setProducts((prev) =>
        prev.filter((product) => product.id !== response.data.id)
      );
    } catch (error) {
      console.log(error);
    }
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
        quantity={product.quantity}
        handleDeleteProduct={handleDeleteProduct}
      />
    ));

  useEffect(() => {
    if (
      (category === 'all' || category === null) &&
      id === null &&
      name === null
    )
      getAllProducts();
    if (category !== null && id !== null && name === null) getProducts();
    if (category === null && id === null && name !== null) getProductBySearch();

    return () => {
      setProducts([]);
    };
  }, [category, id, name]);

  return (
    <div className={styles['products-list']}>
      {loading && <LoadingSpinner />}
      {!loading && !productList && (
        <div className={styles['empty-message']}>
          <p>This category is empty.</p>
        </div>
      )}
      {!loading && productList && productList}
    </div>
  );
};
export default ProductsPage;
