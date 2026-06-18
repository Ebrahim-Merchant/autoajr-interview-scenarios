import { useState } from 'react';
import { PostFeed } from './PostFeed';

export default function App() {
  const [userId, setUserId] = useState('1');

  return (
    <div className="app">
      <div className="app-header">
        <h2>Posts <span className="ai-badge">AI-Generated</span></h2>
        <p className="subtitle">Open the browser console and watch API call counts.</p>
      </div>

      <div className="hint">
        Try switching users quickly, clicking posts to mark as read, and leaving the tab open 30+ seconds.
        <small>Polls every 5s for new posts. 30% failure rate on mark-as-read. Watch the fetch count in the console.</small>
      </div>

      <div className="user-switcher">
        <label>Feed:</label>
        <select value={userId} onChange={(e) => setUserId(e.target.value)}>
          <option value="1">User 1</option>
          <option value="2">User 2</option>
          <option value="3">User 3</option>
          <option value="4">User 4</option>
        </select>
      </div>

      <PostFeed userId={userId} />
    </div>
  );
}
