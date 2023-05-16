import React, { useState, useEffect } from 'react';
import Input from '@UI/input';
import Button from '@UI/button';
import { useApi } from '@config';
import styles from '@styles/addProduct.module.css';

const AddProduct = ({ categories }) => {
  const [values, setValues] = useState({
    name: '',
    slug: '',
    price: 0,
    quantity: 0,
    product_desc: '',
    image_url: null,
    category_id: ''
  });
  const { get, post, loading } = useApi();
  const handleChange = (prop) => (event) => {
    setValues((prev) => ({ ...prev, [prop]: event.target.value }));
  };
  const handleChangeImage = (event) => {
    setValues((prev) => ({ ...prev, image_url: event.target.files[0] }));
  };
  const addProduct = async () => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('slug', values.slug);
    formData.append('price', values.price);
    formData.append('quantity', values.quantity);
    formData.append('product_desc', values.product_desc);
    formData.append('image_url', values.image_url);
    formData.append('category_id', values.category_id);
    await post('/products', formData)
      .then(() =>
        setValues({
          name: '',
          slug: '',
          price: 0,
          quantity: 0,
          product_desc: '',
          image_url: null,
          category_id: ''
        })
      )
      .catch((err) => console.log(err));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addProduct();
  };

  useEffect(() => {
    return () => {
      setValues({
        name: '',
        slug: '',
        price: 0,
        product_desc: '',
        category_id: ''
      });
    };
  }, []);

  const Inputs = [
    {
      key: 'name',
      id: 'name',
      label: 'Product Name',
      type: 'text',
      value: values.name,
      onChange: handleChange('name')
    },
    {
      key: 'slug',
      id: 'slug',
      label: 'Product Slug',
      type: 'text',
      value: values.slug,
      onChange: handleChange('slug')
    },
    {
      key: 'image_url',
      id: 'image_url',
      type: 'file',
      label: 'Product Image',
      onChange: handleChangeImage
    },
    {
      key: 'price',
      id: 'price',
      label: 'Product Price',
      type: 'number',
      value: values.price,
      onChange: handleChange('price')
    },
    {
      key: 'quantity',
      id: 'quantity',
      label: 'Product Quantity',
      type: 'number',
      value: values.quantity,
      onChange: handleChange('quantity')
    }
  ];

  return (
    <>
      <h2>Products</h2>
      <div className={styles['add-product']}>
        <form onSubmit={handleSubmit} className={styles['form']}>
          {Inputs.map((input) => (
            <Input {...input} />
          ))}
          <textarea
            cols='30'
            rows='10'
            placeholder='Product Description'
            value={values.product_desc}
            onChange={handleChange('product_desc')}
          ></textarea>
          <select
            onChange={handleChange('category_id')}
            value={values.category_id}
          >
            <option value=''>select category</option>
            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
          <Button text='Add Product' type='submit' onClick={handleSubmit} />
        </form>
      </div>
    </>
  );
};
export default AddProduct;
