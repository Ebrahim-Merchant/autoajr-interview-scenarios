// mockApi.ts — simulates a real search API with realistic, variable latency
// Short queries are intentionally SLOWER to make the race condition obvious.

const MOCK_DATA: Record<string, string[]> = {
  '':   [],
  'a':  ['Alice Adams', 'Aaron Brown', 'Amanda Clark'],
  'al': ['Alice Adams', 'Alan White'],
  'ali': ['Alice Adams'],
  'alice': ['Alice Adams'],
  'b':  ['Bob Baker', 'Beth Collins', 'Brian Davis'],
  'bo': ['Bob Baker'],
  'bob': ['Bob Baker'],
  'c':  ['Carol Chen', 'Chris Evans', 'Cathy Ford'],
  'ca': ['Carol Chen', 'Cathy Ford'],
  'd':  ['David Drake', 'Diana Prince'],
  'e':  ['Eve Ellis', 'Ethan Hunt'],
};

/**
 * Simulated search API.
 * Short queries have HIGHER latency — this makes the race condition easy to reproduce.
 * Type quickly: "b" then "bo" — "b" results may arrive AFTER "bo" results.
 */
export async function searchUsers(query: string, signal?: AbortSignal): Promise<{ results: string[] }> {
  const q = query.toLowerCase();

  // Shorter queries = slower response (simulates real-world variance)
  const delay = q.length <= 1 ? 800 : q.length === 2 ? 600 : 200;

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      const results = MOCK_DATA[q] ?? MOCK_DATA[q.slice(0, -1)] ?? [];
      resolve({ results });
    }, delay);

    // Support AbortController cancellation
    signal?.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(new DOMException('Aborted', 'AbortError'));
    });
  });
}
