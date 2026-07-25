import type { User } from "../types/index";

interface UserCardProps {
  user: User;
  onSelect: (user: User) => void;
}

function UserCard({ user, onSelect }: UserCardProps) {
  const handleClick = (): void => {
    onSelect(user);
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(`Note for ${user.name}:`, e.target.value);
  };

  return (
    <div className="user-card" style={{ border: "1px solid #ccc", padding: "12px", margin: "8px" }}>
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Role: {user.role === "security_admin" ? "Security Administrator" : "Student"}</p>
      <button onClick={handleClick}>Select Profile</button>
      <input 
        type="text" 
        onChange={handleNoteChange} 
        placeholder="Add admin note..." 
        style={{ marginLeft: "8px" }} 
      />
    </div>
  );
}

export default UserCard;