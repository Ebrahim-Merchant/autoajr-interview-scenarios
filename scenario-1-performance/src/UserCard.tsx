type User = { id: number; name: string; role: string };

function UserCard({ user, onSelect }: { user: User; onSelect: (id: number) => void }) {
  console.log(`Rendering UserCard: ${user.name}`);

  return (
    <div
      onClick={() => onSelect(user.id)}
      className="card"
      data-id={user.id}
    >
      <h3>{user.name}</h3>
      <p>{user.role}</p>
    </div>
  );
}

export default UserCard;
