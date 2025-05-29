export default function SearchFilterBar({ query, onQueryChange, filter, onFilterChange }) {
  return (
    <div style={{ padding: '1rem' }}>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        style={{ marginRight: '1rem' }}
      />
      <select value={filter} onChange={(e) => onFilterChange(e.target.value)}>
        <option value="all">All</option>
        <option value="workflow">Workflows</option>
        <option value="action">Actions</option>
      </select>
    </div>
  );
}
