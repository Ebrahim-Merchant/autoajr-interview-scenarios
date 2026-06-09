import { useState } from 'react';
import { EmailInbox } from './EmailInbox';

export default function App() {
  const [userId, setUserId] = useState('1');

  return (
    <div className="app">
      <div className="app-header">
        <h2>Mail <span className="ai-badge">AI-Generated</span></h2>
        <p className="subtitle">Open the browser console and watch API call counts.</p>
      </div>

      <div className="hint">
        Try switching users quickly, clicking emails to mark as read, and leaving the tab open 30+ seconds.
        <small>Polls every 5s. 30% failure rate on mark-as-read. Watch the fetch count in the console.</small>
      </div>

      <div className="user-switcher">
        <label>Inbox:</label>
        <select value={userId} onChange={(e) => setUserId(e.target.value)}>
          <option value="1">User 1</option>
          <option value="2">User 2</option>
          <option value="3">User 3</option>
          <option value="4">User 4</option>
        </select>
      </div>

      <EmailInbox userId={userId} />
    </div>
  );
}
