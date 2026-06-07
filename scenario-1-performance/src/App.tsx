import { useState } from 'react';
import UserCard from './UserCard';

// A larger list makes the problem more visible
const USERS = [
  { id: 1, name: 'Alice', role: 'Engineer' },
  { id: 2, name: 'Bob', role: 'Designer' },
  { id: 3, name: 'Carol', role: 'PM' },
  { id: 4, name: 'David', role: 'Engineer' },
  { id: 5, name: 'Eve', role: 'QA' },
  { id: 6, name: 'Frank', role: 'DevOps' },
  { id: 7, name: 'Grace', role: 'Engineer' },
  { id: 8, name: 'Hank', role: 'Designer' },
];

// TODO: Users are complaining the search feels sluggish on large lists.
// Type in the search box and watch the browser console — what do you notice?
export default function Dashboard() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<number | null>(null);

  // TODO: Anything suspicious about this function?
  const handleSelect = (id: number) => {
    setSelected(id);
  };

  // TODO: Is this computation happening at the right time?
  const filtered = USERS.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>User Dashboard</h2>
      <div className="hint">
        💡 Open the browser console, then type in the search box. Watch what gets logged.
      </div>
      {selected && (
        <div className="console-note">
          ✅ Selected user ID: <strong>{selected}</strong>
        </div>
      )}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search users..."
      />
      {filtered.length === 0 && <p>No users found.</p>}
      {filtered.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onSelect={handleSelect}
          // TODO: Should this card re-render when the search changes but this user's data hasn't?
        />
      ))}
    </div>
  );
}
