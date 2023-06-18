import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Input from '@UI/input';
import Button from '@UI/button';
import { useApi } from '@config';
import { useAuth } from '@hooks';
import styles from '@styles/dashboard/products/createProduct.module.css';

const CreateProductPage = () => {
  const [categories, setCategories] = useState([]);
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
  const { get, post, loading } = useApi();
  const { user } = useAuth();
  const inputFileRef = useRef(null);

  const getAllCategories = async () => {
    try {
      const response = await get(`/categories/admin/all/${user.id}`);
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (prop) => (event) => {
    setValues((prev) => ({ ...prev, [prop]: event.target.value }));
  };
  const handleChangeImage = (event) => {
    if (event.target.files.length > 0) {
      setValues((prev) => ({ ...prev, image_url: event.target.files[0] }));
    }
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
    try {
      const response = await post('/products', formData);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    addProduct();
  };

  useEffect(() => {
    getAllCategories();
    return () => {
      setValues({
        name: '',
        slug: '',
        price: 0,
        product_desc: '',
        category_id: '',
        image_url: ''
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
    <div className={styles['add-product']}>
      <div className={styles['top-bar']}>
        <h3>Create New Product</h3>
        <button>
          <Link to='/dashboard/products'>Back</Link>
        </button>
      </div>
      <form onSubmit={handleSubmit} className={styles['form']}>
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
        <div>
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
        </div>
        <Button text='Add Product' type='submit' onClick={handleSubmit} />
      </form>
    </div>
  );
};
export default CreateProductPage;
