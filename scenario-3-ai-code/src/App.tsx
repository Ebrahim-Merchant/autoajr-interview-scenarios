import { useState } from 'react';
import { NotificationBell } from './NotificationBell';

// TODO: Try switching between users rapidly — what do you see in the console?
// This simulates a user switching accounts or navigating between profiles.
export default function App() {
  const [userId, setUserId] = useState('user-1');

  return (
    <div>
      <h2>
        Notification Center
        <span className="ai-badge">AI-Generated</span>
      </h2>

      <div className="hint">
        💡 Open the browser console and watch the API call count.
        <br />
        Try: switching users quickly, clicking notifications to mark as read, leaving the tab open for 30+ seconds.
        <br />
        <small>The mock API logs every fetch call and has a 30% failure rate on mark-as-read.</small>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ marginRight: 8, fontSize: 14 }}>Switch user:</label>
        <select
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #ccc' }}
        >
          <option value="user-1">User 1</option>
          <option value="user-2">User 2</option>
          <option value="user-3">User 3</option>
        </select>
      </div>

      <NotificationBell userId={userId} />
    </div>
  );
}
