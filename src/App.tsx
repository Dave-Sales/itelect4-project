import { useState } from "react";
import type { User, Item } from "./types/index";
import ItemCard from "./components/ItemCard";
import UserCard from "./components/UserCard";

export default function App() {
  const [claimedItemId, setClaimedItemId] = useState<number | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [claimOwnerId, setClaimOwnerId] = useState<number | null>(null);

  const users: User[] = [
    {
      id: 1,
      name: "Juan dela Cruz",
      email: "juan@example.com",
      role: "student",
      isActive: true,
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@example.com",
      role: "student",
      isActive: true,
    },
    {
      id: 3,
      name: "Aldrin Reyes",
      email: "aldrin@example.com",
      role: "security_admin",
      isActive: true,
    },
    {
      id: 4,
      name: "Liza Gomez",
      email: "liza@example.com",
      role: "student",
      isActive: false,
    },
  ];

  const items: Item[] = [
    {
      id: 101,
      title: "Blue Hydro Flask Water Bottle",
      category: "Personal Items",
      locationFound: "Library 2nd Floor",
      isResolved: false,
    },
    {
      id: 102,
      title: "Black Wallet",
      category: "Personal Items",
      locationFound: "Cafeteria",
      isResolved: true,
    },
    {
      id: 103,
      title: "MacBook Charger",
      category: "Electronics",
      locationFound: "Engineering Building",
      isResolved: false,
    },
    {
      id: 104,
      title: "Student ID Card",
      category: "Documents",
      locationFound: "Security Office",
      isResolved: true,
    },
  ];

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Campus Lost &amp; Found Tracker</h1>
      <p>Manage student reports, claims, and admin profiles in one place.</p>

      <section style={{ marginTop: "1.5rem", padding: "1rem", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h2>Recent Items</h2>
        <p>
          {selectedUserId === null
            ? "Select a user first to file a claim."
            : claimedItemId !== null
              ? `Claim filed for item #${claimedItemId} by ${users.find((user) => user.id === claimOwnerId)?.name ?? "Unknown"}.`
              : "No claim has been filed yet."}
        </p>
        <div style={{ display: "grid", gap: "0.75rem" }}>
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              isClaimed={claimedItemId === item.id}
              onClaim={() => {
                if (selectedUserId !== null) {
                  setClaimedItemId(item.id);
                  setClaimOwnerId(selectedUserId);
                }
              }}
            />
          ))}
        </div>
      </section>

      <section style={{ marginTop: "1.5rem", padding: "1rem", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h2>Active Users</h2>
        <p>
          {selectedUserId !== null
            ? `Selected profile: ${users.find((user) => user.id === selectedUserId)?.name ?? "Unknown"}`
            : "No profile selected yet."}
        </p>
        <div style={{ display: "grid", gap: "0.75rem" }}>
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              isSelected={selectedUserId === user.id}
              onSelect={() => setSelectedUserId(user.id)}
              onClear={() => setSelectedUserId(null)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}