import React, { useState, useEffect } from 'react';
import { useApi } from '@config';
import Card from '@UI/card';
import styles from '@styles/products.module.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get('name');
  const category = searchParams.get('category');
  const id = searchParams.get('id');
  const { get, deleteFunc, loading } = useApi();

  const getProducts = async () => {
    await get(`/products/all/${id}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };
  const getAllProducts = async () => {
    await get('/products/all')
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  const getProductBySearch = async () => {
    await get('/products/search', { params: { name } })
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  const handleDeleteProduct = async (product_id) => {
    await deleteFunc(`/products/${product_id}`)
      .then((res) =>
        setProducts((prev) =>
          prev.filter((product) => product.id !== res.data.id)
        )
      )
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
      {!loading && !productList && <p>This Category is empty.</p>}
      {loading && <p>Loading..</p>}
      {productList ?? productList}
    </div>
  );
};
export default ProductsPage;
