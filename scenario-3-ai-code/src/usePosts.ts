import { useState, useEffect, useCallback } from 'react';

export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
  read: boolean;
};

// Simulates marking a post as read — 30% chance of failure
async function markPostReadOnServer(id: number): Promise<void> {
  await new Promise((r) => setTimeout(r, 200));
  if (Math.random() < 0.3) {
    throw new Error(`Server error: failed to mark post ${id} as read`);
  }
  console.log(`[API] Marked post ${id} as read`);
}

let fetchCount = 0;

export function usePosts(userId: string) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // BUG 2: No AbortController — stale responses can overwrite newer ones
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        fetchCount++;
        console.log(`[API] fetchPosts for user ${userId} (total fetches: ${fetchCount})`);
        // BUG 5: Blindly trusts API shape — no validation
        const mapped: Post[] = data.map((p: any) => ({
          id: p.id,
          userId: p.userId,
          title: p.title,
          body: p.body,
          read: false,
        }));
        setPosts(mapped);
        setLoading(false);
      });
    // BUG 3: No .catch — if fetch fails, loading hangs forever

    // BUG 1: interval return value never stored — never cleared = memory leak
    setInterval(() => {
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => {
          fetchCount++;
          console.log(`[API] poll fetchPosts for user ${userId} (total fetches: ${fetchCount})`);
          const mapped: Post[] = data.map((p: any) => ({
            id: p.id,
            userId: p.userId,
            title: p.title,
            body: p.body,
            read: false,
          }));
          setPosts(mapped);
        });
    }, 5000);
  }, [userId]);

  // BUG 4: Optimistic update with no rollback on server failure
  const markAsRead = useCallback((id: number) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, read: true } : p))
    );
    markPostReadOnServer(id);
  }, []);

  // BUG 6: unreadCount recomputes on every render — should use useMemo
  const unreadCount = posts.filter((p) => !p.read).length;

  return { posts, loading, unreadCount, markAsRead };
}
