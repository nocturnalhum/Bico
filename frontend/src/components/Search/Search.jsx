import React from 'react';

const Search = ({ placeholder, data }) => {
  return (
    <div className='search-container'>
      <div className='searchInputs'>
        <input type='text' placeholder={placeholder}></input>
        <ion-icon name='search-outline' />
      </div>
      <div className='returnedResults'></div>
    </div>
  );
};

export default Search;
