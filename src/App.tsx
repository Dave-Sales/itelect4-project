import { useEffect, useRef, useState, type ChangeEvent } from "react";
import type { User, Item } from "./types/index";
import ItemCard from "./components/ItemCard";
import UserCard from "./components/UserCard";
import { useMockData } from "./hooks/useMockData";
import { useSelection } from "./hooks/useSelection";

export default function App() {
  const [claimedItemId, setClaimedItemId] = useState<number | null>(null);
  const [claimOwnerId, setClaimOwnerId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const { selectedValue: selectedUserId, setSelectedValue: setSelectedUserId, clearSelection } = useSelection<number>();
  const { data: users, isLoaded: usersLoaded } = useMockData<User>([
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
  ]);
  const { data: items, isLoaded: itemsLoaded } = useMockData<Item>([
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
  ]);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedUser = users.find((user) => user.id === selectedUserId) ?? null;
  const claimOwner = users.find((user) => user.id === claimOwnerId) ?? null;

  const renderStatusText = (): string => {
    if (selectedUserId === null) {
      return "Select a user first to file a claim.";
    }

    if (claimedItemId !== null) {
      return `Claim filed for item #${claimedItemId} by ${claimOwner?.name ?? selectedUser?.name ?? "Unknown"}.`;
    }

    return "No claim has been filed yet.";
  };

  const handleClaim = (item: Item): void => {
    if (selectedUserId !== null) {
      setClaimedItemId(item.id);
      setClaimOwnerId(selectedUserId);
    }
  };

  const handleSelectUser = (user: User): void => {
    setSelectedUserId(user.id);
  };

  const handleClearUser = (): void => {
    clearSelection();
    setClaimedItemId(null);
    setClaimOwnerId(null);
  };

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Campus Lost &amp; Found Tracker</h1>
      <p>Manage student reports, claims, and admin profiles in one place.</p>

      <div style={{ marginTop: "1rem" }}>
        <label htmlFor="search" style={{ display: "block", marginBottom: "0.4rem", fontWeight: 600 }}>
          Search users or items
        </label>
        <input
          id="search"
          ref={searchInputRef}
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Type to filter"
          style={{ width: "100%", padding: "0.7rem", borderRadius: "6px", border: "1px solid #ccc" }}
        />
      </div>

      <section style={{ marginTop: "1.5rem", padding: "1rem", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h2>Recent Items</h2>
        <p>{renderStatusText()}</p>
        <div style={{ display: "grid", gap: "0.75rem" }}>
          {!itemsLoaded ? (
            <p>Loading items…</p>
          ) : filteredItems.length === 0 ? (
            <p>No items match your search.</p>
          ) : (
            filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                isClaimed={claimedItemId === item.id}
                onClaim={handleClaim}
              />
            ))
          )}
        </div>
      </section>

      <section style={{ marginTop: "1.5rem", padding: "1rem", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h2>Active Users</h2>
        <p>
          {selectedUserId !== null
            ? `Selected profile: ${selectedUser?.name ?? "Unknown"}`
            : "No profile selected yet."}
        </p>
        <div style={{ display: "grid", gap: "0.75rem" }}>
          {!usersLoaded ? (
            <p>Loading users…</p>
          ) : filteredUsers.length === 0 ? (
            <p>No users match your search.</p>
          ) : (
            filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                isSelected={selectedUserId === user.id}
                onSelect={handleSelectUser}
                onClear={handleClearUser}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}