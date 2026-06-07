// useSearch.ts
// TODO: Users report that sometimes OLD results flash in after typing quickly.
// e.g. type "bo" fast — you might briefly see results for "b" before "bo" results appear.
// Why does this happen?

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

    // TODO: What happens if this request takes longer than the next one?
    searchUsers(query)
      .then((data) => {
        setResults(data.results);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });

    // TODO: Is there anything missing from this effect?
  }, [query]);

  return { results, loading };
}
