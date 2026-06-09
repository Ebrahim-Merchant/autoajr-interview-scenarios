import { useState } from 'react';
import { NotificationBell } from './NotificationBell';

export default function App() {
  const [userId, setUserId] = useState('user-1');

  return (
    <div>
      <h2>
        🔔 Notification Center
        <span className="ai-badge">AI-Generated</span>
      </h2>
      <p className="subtitle">Open the browser console and watch API call counts.</p>

      <div className="hint">
        Try switching users quickly, clicking notifications to mark as read, and leaving the tab open 30+ seconds.
        <small>Mock API logs every fetch call — 30% failure rate on mark-as-read.</small>
      </div>

      <div className="user-switcher">
        <label>Switch user:</label>
        <select value={userId} onChange={(e) => setUserId(e.target.value)}>
          <option value="user-1">User 1</option>
          <option value="user-2">User 2</option>
          <option value="user-3">User 3</option>
        </select>
      </div>

      <NotificationBell userId={userId} />
    </div>
  );
}
