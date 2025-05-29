export default function MarketplaceList({ items }) {
  return (
    <div style={{ padding: '1rem' }}>
      {items.length === 0 && <p>No results found.</p>}
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1rem',
            background: 'white',
          }}
        >
          <h3>{item.name}</h3>
          <p><strong>Type:</strong> {item.type}</p>
          <p><strong>Repo:</strong> {item.repo}</p>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}
