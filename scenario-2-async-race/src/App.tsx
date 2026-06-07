import { useState } from 'react';
import { useSearch } from './useSearch';

// TODO: Notice the variable latency in the mock API — short queries are slower.
// This is intentional to make the bug easier to reproduce.
// Try typing "b" then quickly "bo" — watch the results.
export default function App() {
  const [query, setQuery] = useState('');
  const { results, loading } = useSearch(query);

  return (
    <div>
      <h2>User Search</h2>
      <div className="hint">
        💡 Type quickly: try "b" then "bo" fast, or "a" then "al".
        Watch if the results ever flash incorrect values.
        <br />
        <small>(The mock API intentionally responds slower for short queries)</small>
      </div>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search users..."
        autoComplete="off"
      />

      <div className="query-display">
        Current query: <strong>"{query}"</strong>
      </div>

      <div className="results-box">
        {loading && <div className="result loading">Searching...</div>}
        {!loading && results.length === 0 && query && (
          <div className="result loading">No results for "{query}"</div>
        )}
        {results.map((r) => (
          <div key={r} className="result">{r}</div>
        ))}
      </div>
    </div>
  );
}
