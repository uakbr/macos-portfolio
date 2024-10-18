import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

function Spotlight({ openApp, toggleLaunchpad }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    const input = e.target.value;
    setQuery(input);
    // Search logic for apps and files
    const appResults = apps.filter((app) =>
      app.title.toLowerCase().includes(input.toLowerCase())
    );
    setResults(appResults);
  };

  const performWebSearch = () => {
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
  };

  return (
    <div className="spotlight">
      <div className="spotlight-search">
        <FaSearch />
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleSearch}
        />
      </div>
      <ul className="spotlight-results">
        {results.map((result) => (
          <li key={result.id} onClick={() => openApp(result.id)}>
            {result.title}
          </li>
        ))}
        {query && (
          <li onClick={performWebSearch}>
            Search '{query}' on the Web
          </li>
        )}
      </ul>
    </div>
  );
}

export default Spotlight;
