import React, { useReducer } from 'react';
import Input from '../../UI/input';
import Button from '../../UI/button';
import styles from '../../../styles/productForm.module.css';

const formReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return {};
  }
  if (action.type === 'BLUR') {
    return {};
  }
  return {
    product_category: '',
    product_name: '',
    product_price: '',
    product_discount: '',
    isValid: false
  };
};

const ProductForm = () => {
  const [form, dispatchForm] = useReducer(formReducer, {
    product_category: '',
    product_name: '',
    product_price: '',
    product_discount: '',
    isValid: false
  });

  const onSubmitForm = (e) => {
    e.preventDefault();
    const body = {};
    // sendRequest(
    //   '/product',
    //   {
    //     body: body,
    //     method: 'POST'
    //   },
    //   (data) => {
    //     if (data.status) {
    //       // CLEAR form
    //     }
    //   }
    // );
  };
  return (
    <form onSubmit={onSubmitForm}>
      <select>
        <option value='category1'></option>
      </select>
      <Input type='text' label='Product Name' />
      <Input type='number' label='Product Price' />
      <Input type='number' label='Product Discount' />

      <Button
        type='submit'
        style={{
          width: '100%',
          height: '40px',
          display: 'block',
          borderRadius: '4px'
        }}
      >
        Add Product
      </Button>
      {/* {isError !== null && <Error text={isError} style='error' />} */}
    </form>
  );
};
export default ProductForm;
