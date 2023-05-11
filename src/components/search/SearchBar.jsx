import React, { useState } from 'react';
import styles from '../../styles/SearchBar.module.css'
import {AiOutlineSearch} from 'react-icons/ai'

export default function SearchBar({onSearch}) {
  const [query, setQuery] = useState('');

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(query)
  };

  return (
    <div className={styles["search-bar"]}>
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleQueryChange}
      />
      <button onClick={handleSearch}>
        <AiOutlineSearch/>
        <i className="fa fa-search"></i>
      </button>
    </div>
  );
}