import React, { useState } from 'react';
import './Search.css';

const Search = ({ placeholder, data }) => {
  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = (e) => {
    const searchText = e.target.value;
    const newData = data.filter((value) => {
      return value.manufacturer
        .toLowerCase()
        .includes(searchText.toLowerCase());
    });

    if (searchText === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newData);
    }
  };
  return (
    <div className='search-field'>
      <div className='search-inputs'>
        <input type='text' placeholder={placeholder} onChange={handleFilter} />
        <div className='search-icon'>
          <ion-icon name='search-outline' />
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className='returnedResults'>
          {filteredData.map((value, key) => {
            return value.manufacturer;
          })}
        </div>
      )}
    </div>
  );
};

export default Search;
