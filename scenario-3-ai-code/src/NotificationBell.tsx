// NotificationBell.tsx
import { useNotifications } from './useNotifications';

export function NotificationBell({ userId }: { userId: string }) {
  const { notifications, loading, unreadCount, markAsRead } = useNotifications(userId);

  return (
    <div className="notification-panel">
      <div className="panel-header">
        <div className="panel-header-left">
          <span className="panel-title">Notifications</span>
          {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
        </div>
        <span className="panel-count">{notifications.length} total</span>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : notifications.length === 0 ? (
        <div className="empty">No notifications</div>
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
