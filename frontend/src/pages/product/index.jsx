import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useApi, API_URL } from '@config';
import { useCart } from '@hooks';
import Button from '@UI/button';
import LoadingSpinner from '@common/loading';
import styles from '@styles/product.module.css';

const ProductPage = () => {
  const [product, setProduct] = useState({
    name: '',
    image_url: '',
    price: null,
    quantity: null
  });
  const [productQuantity, setProductQuantity] = useState(1);
  const { get, loading } = useApi();
  const { id } = useParams();
  const { cartItems, updateCartItems } = useCart();
  console.log(cartItems);
  const getProduct = async () => {
    try {
      const response = await get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = () => {
    const existingCartItem = cartItems.find((item) => item.id === id);

    if (existingCartItem) {
      // If the product already exists in the cart, update its quantity
      existingCartItem.productQuantity += Number(productQuantity);
    } else {
      // If the product doesn't exist in the cart, add a new cart item
      const newCartItem = {
        id,
        name: product.name,
        image_url: product.image_url,
        price: product.price,
        productQuantity: 1
      };
      cartItems.push(newCartItem);
    }
    updateCartItems([...cartItems]);
    setProductQuantity(1);
  };

  useEffect(() => {
    getProduct();
    return () => setProduct({});
  }, [id]);

  return (
    <div className={styles['product-page']}>
      {loading && <LoadingSpinner />}
      {!loading && (
        <>
          <div className={styles['product-info']}>
            <div className={styles['product-image']}>
              <img
                src={`${API_URL}/${product.image_url}`}
                crossOrigin='anonymous'
                alt='product-image'
                loading='lazy'
              />
            </div>
            <div className={styles['product-details']}>
              <span className={styles['product-name']}>{product.name}</span>
              <span className={styles['product-price']}>
                EGP {product.price}
              </span>
              <span className={styles['product-quantity']}>
                {product.quantity} items left
              </span>
              <div className={styles['product-description']}>
                <h3>Product Description</h3>
                <p>{product.product_desc}</p>
              </div>
              <Button text='ADD TO CART' onClick={handleAddToCart} />
            </div>
          </div>
          <div className={styles['product-full-image']}>
            <h3>Full Image</h3>
            <img
              src={`${API_URL}/${product.image_url}`}
              crossOrigin='anonymous'
              alt='product-image'
              loading='lazy'
            />
          </div>
        </>
      )}
    </div>
  );
};
export default ProductPage;
