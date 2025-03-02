import { useState } from 'react';

function SearchPeople() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/users/search?query=${searchQuery}`);
      const data = await response.json();
      setSearchResults(data.users);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return (
    <div className="page">
      <h1>Search People</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="search-results">
        {searchResults.map(user => (
          <div key={user._id} className="user-card">
            <h3>{user.username}</h3>
            {/* Add more user details */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPeople;
