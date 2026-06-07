// NotificationBell.tsx
// AI-generated component — works for the happy path.
// TODO: Can you spot any issues here too?

import { useNotifications } from './useNotifications';

export function NotificationBell({ userId }: { userId: string }) {
  const { notifications, loading, unreadCount, markAsRead } = useNotifications(userId);

  if (loading) return <span>Loading...</span>;

  return (
    <div>
      <div className="bell-area">
        <button>
          🔔 Notifications
          {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
        </button>
        <span className="status">{notifications.length} total</span>
      </div>

      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        <ul>
          {notifications.map((n) => (
            <li
              key={n.id}
              className={n.read ? 'read' : 'unread'}
              onClick={() => markAsRead(n.id)}
              title="Click to mark as read"
            >
              {n.message}
              {!n.read && ' •'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
