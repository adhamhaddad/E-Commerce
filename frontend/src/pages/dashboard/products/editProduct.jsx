import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useApi } from '@config';
import { useAuth } from '@hooks';
import Input from '@UI/input';
import Button from '@UI/button';
import styles from '@styles/dashboard/products/editProduct.module.css';

const EditProductPage = () => {
  const [values, setValues] = useState({
    name: '',
    slug: '',
    image_url: null,
    price: 0,
    quantity: 0,
    product_desc: '',
    category_id: ''
  });
  const [errors, setErrors] = useState({
    name: null,
    slug: null,
    image_url: null,
    price: null,
    quantity: null,
    product_desc: null,
    category_id: null
  });
  const { id } = useParams();
  const { get, patch } = useApi();
  const { user } = useAuth();
  const inputFileRef = useRef(null);

  const getProduct = async () => {
    try {
      const response = await get(`products/${id}`);
      // console.log(response);
      setValues(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const editProduct = async () => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('slug', values.slug);
    formData.append('price', values.price);
    formData.append('quantity', values.quantity);
    formData.append('product_desc', values.product_desc);
    formData.append('image_url', values.image_url);
    formData.append('category_id', values.category_id);
    try {
      const response = await patch(`/products/${id}`, formData);
      if (inputFileRef.current) {
        inputFileRef.current.resetValue();
      }
      setValues({
        name: '',
        slug: '',
        price: 0,
        quantity: 0,
        product_desc: '',
        image_url: null,
        category_id: ''
      });
    } catch (error) {
      const errors = error.response.data.errors;
      errors.forEach((error) => {
        if (error.id) {
          setErrors((prev) => ({ ...prev, id: error.id }));
        }
        if (error.user_id) {
          setErrors((prev) => ({ ...prev, user_id: error.user_id }));
        }
        if (error.name) {
          setErrors((prev) => ({ ...prev, name: error.name }));
        }
        if (error.slug) {
          setErrors((prev) => ({ ...prev, slug: error.slug }));
        }
        if (error.image_url) {
          setErrors((prev) => ({ ...prev, image_url: error.image_url }));
        }
        if (error.price) {
          setErrors((prev) => ({ ...prev, price: error.price }));
        }
        if (error.quantity) {
          setErrors((prev) => ({ ...prev, quantity: error.quantity }));
        }
        if (error.product_desc) {
          setErrors((prev) => ({
            ...prev,
            product_desc: error.product_desc
          }));
        }
        if (error.category_id) {
          setErrors((prev) => ({
            ...prev,
            category_id: error.category_id
          }));
        }
      });
    }
  };
  const handleChangeImage = (event) => {
    if (event.target.files.length > 0) {
      setValues((prev) => ({ ...prev, image_url: event.target.files[0] }));
    }
  };
  const handleChange = (prop) => (event) => {
    setValues((prev) => ({ ...prev, [prop]: event.target.value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    editProduct();
  };

  useEffect(() => {
    getProduct();
    return () => {
      setValues({ id: null, name: '', slug: '', icon_url: '' });
    };
  }, []);
  const Inputs = [
    {
      key: 'name',
      id: 'name',
      label: 'Product Name',
      type: 'text',
      value: values.name,
      error: errors.name,
      onChange: handleChange('name')
    },
    {
      key: 'slug',
      id: 'slug',
      label: 'Product Slug',
      type: 'text',
      value: values.slug,
      error: errors.slug,
      onChange: handleChange('slug')
    },
    {
      key: 'image_url',
      id: 'image_url',
      type: 'file',
      label: 'Product Image',
      error: errors.image_url,
      ref: inputFileRef,
      onChange: handleChangeImage
    },
    {
      key: 'price',
      id: 'price',
      label: 'Product Price',
      type: 'number',
      value: values.price,
      error: errors.price,
      onChange: handleChange('price')
    },
    {
      key: 'quantity',
      id: 'quantity',
      label: 'Product Quantity',
      type: 'number',
      value: values.quantity,
      error: errors.quantity,
      onChange: handleChange('quantity')
    }
  ];
  return (
    <div className={styles['edit-product']}>
      <div className={styles['top-bar']}>
        <h3>Edit Product</h3>
        <button>
          <Link to='/dashboard/products'>Back</Link>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <div className={styles['left-side']}>
            <h3>Information</h3>
            <span>
              Add your product details and necessary information from here
            </span>
          </div>
          <div>
            {Inputs.map((input) => (
              <Input {...input} />
            ))}
          </div>
        </div>
        <div>
          <div className={styles['left-side']}>
            <h3>Description</h3>
            <span>Add the product description from here</span>
          </div>
          <div>
            <textarea
              cols='30'
              rows='10'
              placeholder='Product Description'
              value={values.product_desc}
              onChange={handleChange('product_desc')}
            ></textarea>
          </div>
        </div>
        {/* <div>
          <div className={styles['left-side']}>
            <h3>Select Category</h3>
            <span>Select the product category from here</span>
          </div>
          <div>
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
          </div>
        </div> */}
        <Button text='Update Product' type='submit' />
      </form>
    </div>
  );
};
export default EditProductPage;
