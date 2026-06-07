import { useState, useEffect, useCallback } from 'react';
import { fetchNotifications, markNotificationRead } from './mockApi';
import type { Notification } from './mockApi';

export function useNotifications(userId: string) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetchNotifications(userId)
      .then((data) => {
        setNotifications(data);
        setLoading(false);
      });

    const interval = setInterval(() => {
      fetchNotifications(userId)
        .then((data) => setNotifications(data));
    }, 5000);
  }, [userId]);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

    markNotificationRead(id);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return { notifications, loading, unreadCount, markAsRead };
}
