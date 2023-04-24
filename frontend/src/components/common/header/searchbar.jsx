import React, { useState } from 'react';
import Button from '../../UI/button';
import classes from '../../../styles/searchbar.module.css';

const Searchbar = () => {
  const [query, setQuery] = useState('');

  const onQueryChange = (e) => setQuery(e.target.value);

  const getProduct = () => {};

  return (
    <div className={classes['Searchbar']}>
      <input
        type='search'
        placeholder='Search products, brands and categories'
        value={query}
        onChange={onQueryChange}
      />
      <Button
        type='button'
        style={{
          backgroundColor: 'orange',
          borderRadius: '4px',
          width: '150px',
          height: '40px',
          color: 'white',
          border: 'none',
          boxShadow: '0px 0px 10px 2px #ddd',
          fontWeight: 'bold'
        }}
        onClick={getProduct}
      >
        SEARCH
      </Button>
    </div>
  );
};

export default Searchbar;
