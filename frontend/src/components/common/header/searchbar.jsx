import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@UI/button';
import styles from '@styles/searchbar.module.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const history = useHistory();

  const onQueryChange = (e) => setQuery(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    trimmedQuery.length > 0 &&
      history.push(`/products?search=true&name=${query}`);
  };
  return (
    <form className={styles['search-bar']} onSubmit={handleSubmit}>
      <div className={styles['search-bar_input']}>
        <i className='fa-solid fa-magnifying-glass'></i>
        <input
          type='search'
          placeholder='Search products, brands and categories'
          value={query}
          onChange={onQueryChange}
        />
      </div>
      <Button text='SEARCH' type='submit' />
    </form>
  );
};

export default SearchBar;
