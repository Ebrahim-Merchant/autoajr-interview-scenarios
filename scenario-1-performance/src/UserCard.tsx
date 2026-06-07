// UserCard.tsx
// TODO: Why does this render so often? Open the console and watch...

type User = { id: number; name: string; role: string };

function UserCard({ user, onSelect }: { user: User; onSelect: (id: number) => void }) {
  // TODO: This fires a lot. Is that expected?
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
