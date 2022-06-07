import React from 'react';
import './searchBar.css';

const SearchBar = ({ categories, filterItems }) => {
  return (
    <div className='search-container'>
      {categories.map((category, index) => {
        return (
          <button
            key={index}
            type='button'
            className='filter-btn'
            onClick={() => filterItems(category)}
          >
            <h4>{category}</h4>
          </button>
        );
      })}
    </div>
  );
};

export default SearchBar;
