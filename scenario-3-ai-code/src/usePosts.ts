import { useState, useEffect, useCallback } from 'react';

export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
  read: boolean;
};

// Simulates marking a post as read, with a chance of failure
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

    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        fetchCount++;
        console.log(`[API] fetchPosts for user ${userId} (total fetches: ${fetchCount})`);
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

  const markAsRead = useCallback((id: number) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, read: true } : p))
    );
    markPostReadOnServer(id);
  }, []);

  const unreadCount = posts.filter((p) => !p.read).length;

  return { posts, loading, unreadCount, markAsRead };
}
