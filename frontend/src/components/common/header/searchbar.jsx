import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@UI/button';
import classes from '@styles/searchbar.module.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const history = useHistory();

  const onQueryChange = (e) => setQuery(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    trimmedQuery.length > 0 && history.push(`/products/search?name=${query}`);
  };

  return (
    <form className={classes['search-bar']} onSubmit={handleSubmit}>
      <input
        type='search'
        placeholder='Search products, brands and categories'
        value={query}
        onChange={onQueryChange}
      />
      <Button
        text='SEARCH'
        type='submit'
        style={{
          
        }}
      />
    </form>
  );
};

export default SearchBar;
