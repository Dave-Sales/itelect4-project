import type { User } from "../types/index";

interface UserCardProps {
  user: User;
  isSelected?: boolean;
  onSelect: (user: User) => void;
  onClear?: (user: User) => void;
}

function UserCard({ user, isSelected = false, onSelect, onClear }: UserCardProps) {
  const handleClick = (): void => {
    if (isSelected) {
      onClear?.(user);
    } else {
      onSelect(user);
    }
  };

  return (
    <div className="user-card" style={{ border: "1px solid #ccc", padding: "10px", margin: "4px 0", borderRadius: "6px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem" }}>
        <div>
          <strong>{user.name}</strong>
          <div style={{ fontSize: "0.9rem", color: "#555" }}>
            {user.role === "security_admin" ? "Security Admin" : "Student"} • {user.email}
          </div>
        </div>
        <button onClick={handleClick}>{isSelected ? "Unselect" : "Select"}</button>
      </div>
    </div>
  );
}

export default UserCard;