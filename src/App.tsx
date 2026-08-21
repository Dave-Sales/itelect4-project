import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import ItemDetail from "./pages/ItemDetail";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { createClaim, fetchClaims, fetchItems, fetchUsers, type ClaimInput } from "./lib/api";
import { useUiStore } from "./stores/ui";

export default function App() {
  const queryClient = useQueryClient();
  const { searchTerm, setSearchTerm, darkMode, toggleDarkMode } = useUiStore();

  const { data: users = [], isLoading: usersLoading, error: usersError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const { data: items = [], isLoading: itemsLoading, error: itemsError } = useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  const { data: claims = [] } = useQuery({
    queryKey: ["claims"],
    queryFn: fetchClaims,
  });

  const createClaimMutation = useMutation({
    mutationFn: (payload: ClaimInput) => createClaim(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["claims"] });
      await queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    window.localStorage.setItem("lostfound-dark-mode", String(darkMode));
  }, [darkMode]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  const handleCreateClaim = () => {
    if (users.length === 0 || items.length === 0) {
      return;
    }

    const demoUser = users[0];
    const demoItem = items[0];

    createClaimMutation.mutate({
      itemId: demoItem.id,
      claimedByUserId: demoUser.id,
      notes: "Demo claim created through the API layer.",
    });
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            isDarkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
            onCreateClaim={handleCreateClaim}
            claims={claims}
            items={items}
            users={users}
            isLoading={usersLoading || itemsLoading}
            hasError={Boolean(usersError || itemsError)}
            errorMessage={
              usersError instanceof Error
                ? usersError.message
                : itemsError instanceof Error
                  ? itemsError.message
                  : "Unexpected loading error."
            }
          />
        }
      >
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
