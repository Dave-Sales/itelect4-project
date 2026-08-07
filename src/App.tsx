import { useEffect, useRef, useState, type ChangeEvent } from "react";
import type { User, Item, Claim } from "./types/index";
import ItemCard from "./components/ItemCard";
import UserCard from "./components/UserCard";
import ClaimBadge from "./components/ClaimBadge";
import { useMockData } from "./hooks/useMockData";
import { useSelection } from "./hooks/useSelection";

const initialUsers: User[] = [
  { id: 1, name: "Juan dela Cruz", email: "juan@example.com", role: "student", isActive: true },
  { id: 2, name: "Maria Santos", email: "maria@example.com", role: "student", isActive: true },
  { id: 3, name: "Aldrin Reyes", email: "aldrin@example.com", role: "security_admin", isActive: true },
  { id: 4, name: "Liza Gomez", email: "liza@example.com", role: "student", isActive: false },
];

const initialItems: Item[] = [
  { id: 101, title: "Blue Hydro Flask Water Bottle", category: "Personal Items", locationFound: "Library 2nd Floor", isResolved: false },
  { id: 102, title: "Black Wallet", category: "Personal Items", locationFound: "Cafeteria", isResolved: true },
  { id: 103, title: "MacBook Charger", category: "Electronics", locationFound: "Engineering Building", isResolved: false },
  { id: 104, title: "Student ID Card", category: "Documents", locationFound: "Security Office", isResolved: true },
];

function getInitialDarkMode(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem("lostfound-dark-mode") === "true";
}

export default function App() {
  const [claimedItemId, setClaimedItemId] = useState<number | null>(null);
  const [claimOwnerId, setClaimOwnerId] = useState<number | null>(null);
  const [claimTicket, setClaimTicket] = useState<Claim | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(getInitialDarkMode);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const { selectedValue: selectedUserId, setSelectedValue: setSelectedUserId, clearSelection } = useSelection<number>();
  const { data: users, isLoaded: usersLoaded, error: usersError } = useMockData<User>(initialUsers);
  const { data: items, isLoaded: itemsLoaded, error: itemsError } = useMockData<Item>(initialItems);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    window.localStorage.setItem("lostfound-dark-mode", String(darkMode));
  }, [darkMode]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.locationFound.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedUser = users.find((user) => user.id === selectedUserId) ?? null;
  const claimOwner = users.find((user) => user.id === claimOwnerId) ?? null;
  const loading = !usersLoaded || !itemsLoaded;
  const hasError = Boolean(usersError || itemsError);
  const errorMessage = usersError ?? itemsError ?? "Unexpected loading error.";

  const renderStatusText = (): string => {
    if (selectedUserId === null) {
      return "Select a user to file a claim.";
    }

    if (claimedItemId !== null) {
      return `Claim filed for item #${claimedItemId} by ${claimOwner?.name ?? selectedUser?.name ?? "Unknown"}.`;
    }

    return "No claim has been filed yet.";
  };

  const handleClaim = (item: Item): void => {
    if (selectedUserId !== null) {
      const now = new Date();
      setClaimedItemId(item.id);
      setClaimOwnerId(selectedUserId);
      setClaimTicket({
        id: Number(now.valueOf()),
        itemId: item.id,
        claimedByUserId: selectedUserId,
        claimedAt: now,
        notes: `Claim submitted by ${selectedUser?.name ?? "Unknown"}`,
      });
    }
  };

  const handleSelectUser = (user: User): void => {
    setSelectedUserId(user.id);
  };

  const handleClearUser = (): void => {
    clearSelection();
    setClaimedItemId(null);
    setClaimOwnerId(null);
    setClaimTicket(null);
  };

  const handleResetClaim = (): void => {
    setClaimedItemId(null);
    setClaimOwnerId(null);
    setClaimTicket(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6">
          <header className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-panel backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-600 dark:text-brand-300">
                  Session 5 · Tailwind CSS + UI Polish
                </p>
                <div className="space-y-3">
                  <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Campus Lost &amp; Found Tracker</h1>
                  <p className="max-w-2xl text-slate-600 dark:text-slate-300">
                    Search reports, select a profile, and file claims with a responsive workflow built on utility-first styling.
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-400"
                onClick={() => setDarkMode((value) => !value)}
              >
                {darkMode ? "Light mode" : "Dark mode"}
              </button>
            </div>
          </header>

          <section className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-6 shadow-panel dark:border-slate-800 dark:bg-slate-900/90">
              <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">Styled lost &amp; found workflow</h2>
              <p className="mt-3 max-w-xl text-slate-600 dark:text-slate-300">
                Utility-style cards, responsive layout, and adaptive dark mode make the claim process feel polished and fast.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-6 shadow-panel dark:border-slate-800 dark:bg-slate-900/90">
              <label htmlFor="search" className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Search users or items
              </label>
              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
                <input
                  id="search"
                  ref={searchInputRef}
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search name, title, category, or location"
                  className="min-w-0 flex-1 rounded-3xl border border-slate-300 bg-slate-50 px-5 py-3 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-brand-400 dark:focus:ring-brand-500/20"
                />
                <span className="inline-flex items-center rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 dark:bg-brand-500/15 dark:text-brand-200">
                  {filteredUsers.length + filteredItems.length} matches
                </span>
              </div>
            </div>
          </section>

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-6 shadow-panel dark:border-slate-800 dark:bg-slate-900/90">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Recent Items</h2>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{renderStatusText()}</p>
                </div>
                <button
                  type="button"
                  onClick={handleResetClaim}
                  disabled={!claimedItemId}
                  className="rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                >
                  Reset claim
                </button>
              </div>

              {itemsError ? (
                <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-800 dark:border-rose-700/70 dark:bg-rose-900/70 dark:text-rose-100">
                  <p className="font-semibold">Could not load items.</p>
                  <p className="mt-2 text-sm">{itemsError}</p>
                </div>
              ) : loading ? (
                <div className="grid gap-4">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="h-32 rounded-[1.5rem] bg-slate-100 p-6 shadow-sm animate-pulse dark:bg-slate-800" />
                  ))}
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
                  <p className="font-semibold">No matching items.</p>
                  <p className="mt-2 text-sm">Try another search term to find the lost item.</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredItems.map((item) => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      isClaimed={claimedItemId === item.id}
                      variant={item.isResolved ? "compact" : "default"}
                      onClaim={selectedUserId !== null ? handleClaim : undefined}
                    />
                  ))}
                </div>
              )}
            </section>

            <section className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-6 shadow-panel dark:border-slate-800 dark:bg-slate-900/90">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Active Users</h2>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    {selectedUserId !== null
                      ? `Selected profile: ${selectedUser?.name ?? "Unknown"}`
                      : "Choose a profile to file a claim."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleClearUser}
                  disabled={selectedUserId === null}
                  className="rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                >
                  Clear selection
                </button>
              </div>

              {usersError ? (
                <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-800 dark:border-rose-700/70 dark:bg-rose-900/70 dark:text-rose-100">
                  <p className="font-semibold">Could not load users.</p>
                  <p className="mt-2 text-sm">{usersError}</p>
                </div>
              ) : loading ? (
                <div className="grid gap-4">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="h-28 rounded-[1.5rem] bg-slate-100 p-4 shadow-sm animate-pulse dark:bg-slate-800" />
                  ))}
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
                  <p className="font-semibold">No users match your search.</p>
                  <p className="mt-2 text-sm">Try searching by name or email.</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredUsers.map((user) => (
                    <UserCard
                      key={user.id}
                      user={user}
                      isSelected={selectedUserId === user.id}
                      variant={user.isActive ? "default" : "compact"}
                      onSelect={handleSelectUser}
                      onClear={handleClearUser}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>

          {hasError && (
            <div className="rounded-[1.75rem] border border-rose-200 bg-rose-50 p-6 text-rose-800 dark:border-rose-700/70 dark:bg-rose-900/70 dark:text-rose-100">
              <p className="font-semibold">There was a problem loading content.</p>
              <p className="mt-2 text-sm">{errorMessage}</p>
            </div>
          )}

          {claimTicket && (
            <section className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-6 shadow-panel dark:border-slate-800 dark:bg-slate-900/90">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Claim Summary</h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  A styled ticket appears when a claim is submitted successfully.
                </p>
              </div>
              <ClaimBadge claim={claimTicket} />
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
