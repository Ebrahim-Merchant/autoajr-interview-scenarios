import { useEmails } from './useEmails';

export function EmailInbox({ userId }: { userId: string }) {
  const { emails, loading, unreadCount, markAsRead } = useEmails(userId);

  return (
    <div className="inbox-panel">
      <div className="inbox-header">
        <div className="inbox-header-left">
          <span className="inbox-title">Inbox</span>
          {unreadCount > 0 && <span className="badge">{unreadCount} unread</span>}
        </div>
        <span className="inbox-count">{emails.length} emails</span>
      </div>

      {loading ? (
        <div className="inbox-empty">Loading...</div>
      ) : emails.length === 0 ? (
        <div className="inbox-empty">No emails</div>
      ) : (
        <ul className="email-list">
          {emails.map((email) => (
            <li
              key={email.id}
              className={email.read ? 'email-row read' : 'email-row unread'}
              onClick={() => markAsRead(email.id)}
            >
              <div className="email-dot" />
              <div className="email-content">
                <div className="email-subject">{email.subject}</div>
                <div className="email-body">{email.body.slice(0, 80)}...</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
