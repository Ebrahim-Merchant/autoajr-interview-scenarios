import { useState } from 'react';
import UserCard from './UserCard';

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

export default function Dashboard() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (id: number) => {
    setSelected(id);
  };

  const filtered = USERS.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>User Dashboard</h2>
      {selected && (
        <div className="console-note">
          Selected user ID: <strong>{selected}</strong>
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
        />
      ))}
    </div>
  );
}
