import React, { useState } from 'react';
import Button from '../../UI/button';
import classes from '../../../styles/searchbar.module.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const onQueryChange = (e) => setQuery(e.target.value);

  const getProduct = () => {
    
  };

  return (
    <div className={classes['search-bar']}>
      <input
        type='search'
        placeholder='Search products, brands and categories'
        value={query}
        onChange={onQueryChange}
      />
      <Button
        text='SEARCH'
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
      />
    </div>
  );
};

export default SearchBar;
