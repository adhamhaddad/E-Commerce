import React, { useState, useEffect } from 'react';
import Input from '../../components/UI/input';
import Button from '../../components/UI/button';
import { api } from '../../config';
import styles from '../../styles/addProduct.module.css';
import { useAuth } from '../../hooks/useAuth';

const AddProduct = () => {
  const [values, setValues] = useState({
    name: '',
    slug: '',
    price: 0,
    product_desc: '',
    sub_category_id: null
  });
  const [categories, setCategories] = useState([]);

  const { user } = useAuth();

  const handleChange = (prop) => (event) => {
    setValues((prev) => ({ ...prev, [prop]: event.target.value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await api.post('/products', values);
    const data = response;
    console.log(data);
    console.log(response.ok);
  };

  const getCategories = async () => {
    await api
      .get(`/categories/${user.id}`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  };

  const Inputs = [
    {
      id: 'name',
      label: 'Product Name',
      type: 'text',
      placeholder: 'Product name',
      value: values.name,
      onChange: handleChange('name')
    },
    {
      id: 'slug',
      label: 'Product Slug',
      type: 'text',
      placeholder: 'Product slug',
      value: values.slug,
      onChange: handleChange('slug')
    },
    {
      id: 'price',
      label: 'Product Price',
      type: 'number',
      placeholder: 'Product price',
      value: values.price,
      onChange: handleChange('price')
    },
    {
      id: 'product_desc',
      label: 'Product Description',
      type: 'text',
      placeholder: 'Product description',
      value: values.product_desc,
      onChange: handleChange('product_desc')
    }
  ];

  useEffect(() => {
    getCategories();
    return () => {
      setValues({
        name: '',
        slug: '',
        price: 0,
        product_desc: ''
      });
      setCategories([]);
    };
  }, []);

  return (
    <div className={styles['add-product']}>
      <form onSubmit={handleSubmit} className={styles['add-product_form']}>
        {Inputs.map((input) => (
          <Input {...input} />
        ))}
        <select onChange={handleChange('sub_category_id')}>
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
  );
};
export default AddProduct;
