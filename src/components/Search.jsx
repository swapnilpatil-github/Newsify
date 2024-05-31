import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Search.css'; 

const Search = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim() !== '') {
      navigate(`/search/${query}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        className="search-input"
        type='search'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Enter your search query'
        onKeyDown={handleKeyDown}
      />
      <button className="search-button" onClick={handleSearch}>SEARCH</button>
    </div>
  );
};

export default Search;
