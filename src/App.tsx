import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import ItemDetail from "./pages/ItemDetail";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
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
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route
          path="items/:itemId"
          element={<ProtectedRoute><ItemDetail /></ProtectedRoute>}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
