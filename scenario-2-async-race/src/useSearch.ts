import { useState, useEffect } from 'react';
import { searchUsers } from './mockApi';

export function useSearch(query: string) {
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    setLoading(true);

    searchUsers(query)
      .then((data) => {
        setResults(data.results);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [query]);

  return { results, loading };
}
