// mockApi.ts — simulates a notifications API

export type Notification = {
  id: string;
  message: string;
  read: boolean;
};

let notificationStore: Notification[] = [
  { id: '1', message: 'Your report is ready', read: false },
  { id: '2', message: 'Alice mentioned you in a comment', read: false },
  { id: '3', message: 'Deployment completed successfully', read: true },
  { id: '4', message: 'New team member joined', read: false },
];

let fetchCount = 0;

/**
 * Simulated GET /api/notifications/:userId
 * Occasionally returns data in a different shape to simulate API versioning.
 */
export async function fetchNotifications(userId: string): Promise<Notification[]> {
  fetchCount++;
  console.log(`[API] fetchNotifications called for ${userId} (total calls: ${fetchCount})`);
  await new Promise((r) => setTimeout(r, 300));
  // Note: In production this might return { items: [...] } — shape can vary
  return [...notificationStore];
}

/**
 * Simulated POST /api/notifications/:id/read
 * Has a 30% chance of "failing" to test error handling
 */
export async function markNotificationRead(id: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 200));
  // Simulate occasional server failure
  if (Math.random() < 0.3) {
    throw new Error('Server error: failed to mark notification as read');
  }
  notificationStore = notificationStore.map((n) =>
    n.id === id ? { ...n, read: true } : n
  );
  console.log(`[API] Marked notification ${id} as read`);
}
