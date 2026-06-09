import { useState, useEffect, useCallback } from 'react';

export type Email = {
  id: number;
  userId: number;
  subject: string;
  body: string;
  read: boolean;
};

// Simulates marking an email as read — 30% chance of failure
async function markEmailReadOnServer(id: number): Promise<void> {
  await new Promise((r) => setTimeout(r, 200));
  if (Math.random() < 0.3) {
    throw new Error(`Server error: failed to mark email ${id} as read`);
  }
  console.log(`[API] Marked email ${id} as read`);
}

let fetchCount = 0;

export function useEmails(userId: string) {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // BUG 2: No AbortController — stale responses can overwrite newer ones
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        fetchCount++;
        console.log(`[API] fetchEmails for user ${userId} (total fetches: ${fetchCount})`);
        // BUG 5: Blindly trusts API shape — no validation
        const mapped: Email[] = data.map((p: any) => ({
          id: p.id,
          userId: p.userId,
          subject: p.title,
          body: p.body,
          read: false,
        }));
        setEmails(mapped);
        setLoading(false);
      });
    // BUG 3: No .catch — if fetch fails, loading hangs forever

    // BUG 1: interval return value never stored — never cleared = memory leak
    setInterval(() => {
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => {
          fetchCount++;
          console.log(`[API] poll fetchEmails for user ${userId} (total fetches: ${fetchCount})`);
          const mapped: Email[] = data.map((p: any) => ({
            id: p.id,
            userId: p.userId,
            subject: p.title,
            body: p.body,
            read: false,
          }));
          setEmails(mapped);
        });
    }, 5000);
  }, [userId]);

  // BUG 4: Optimistic update with no rollback on server failure
  const markAsRead = useCallback((id: number) => {
    setEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, read: true } : e))
    );
    markEmailReadOnServer(id);
  }, []);

  // BUG 6: unreadCount recomputes on every render — should use useMemo
  const unreadCount = emails.filter((e) => !e.read).length;

  return { emails, loading, unreadCount, markAsRead };
}
