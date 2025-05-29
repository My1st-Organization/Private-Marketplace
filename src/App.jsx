import React, { useState } from 'react';
import Header from './components/Header';
import SearchFilterBar from './components/SearchFilterBar';
import MarketplaceList from './components/MarketplaceList';

const MOCK_DATA = [
  { id: 1, name: 'CI Pipeline', type: 'workflow', description: 'CI with Node.js' },
  { id: 2, name: 'Docker Build Action', type: 'action', description: 'Build images' },
  { id: 3, name: 'Python Test', type: 'workflow', description: 'Test with pytest' },
];

export default function App() {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const filtered = MOCK_DATA.filter((item) => {
    const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    return matchesQuery && matchesType;
  });

  return (
    <div>
      <Header />
      <SearchFilterBar
        query={query}
        onQueryChange={setQuery}
        filter={typeFilter}
        onFilterChange={setTypeFilter}
      />
      <MarketplaceList items={filtered} />
    </div>
  );
}
