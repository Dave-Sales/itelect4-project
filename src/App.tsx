import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ReviewPage from "./pages/ReviewPage";
import ItemDetail from "./pages/ItemDetail";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import {
  createClaim,
  fetchCategories,
  fetchClaims,
  fetchItems,
  fetchUsers,
  type ClaimInput,
} from "./api/client";
import { useAuthStore } from "./stores/auth";
import { useUiStore } from "./stores/ui";

export default function App() {
  const queryClient = useQueryClient();
  const token = useAuthStore((s) => s.token);
  const {
    searchTerm,
    setSearchTerm,
    darkMode,
    toggleDarkMode,
    selectedUserId,
    selectedItemId,
    selectedCategory,
    setSelectedCategory,
  } = useUiStore();

  const {
    data: categories = [],
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const { data: users = [], isLoading: usersLoading, error: usersError } = useQuery({
    queryKey: ["users", token],
    queryFn: fetchUsers,
    enabled: Boolean(token),
  });

  const { data: items = [], isLoading: itemsLoading, error: itemsError } = useQuery({
    queryKey: ["items", token],
    queryFn: fetchItems,
    enabled: Boolean(token),
  });

  const { data: claims = [] } = useQuery({
    queryKey: ["claims", token],
    queryFn: fetchClaims,
    enabled: Boolean(token),
  });

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  const filteredUsers = users.filter((user) => {
    if (!normalizedSearchTerm) return true;

    return [user.name, user.email, user.role].some((value) =>
      value.toLowerCase().includes(normalizedSearchTerm)
    );
  });

  const filteredItems = items.filter((item) => {
    if (selectedCategory && item.category !== selectedCategory) return false;
    if (!normalizedSearchTerm) return true;

    return [item.title, item.category, item.locationFound].some((value) =>
      value.toLowerCase().includes(normalizedSearchTerm)
    );
  });

  const filteredClaims = claims.filter((claim) => {
    if (!normalizedSearchTerm) return true;

    const user = users.find((entry) => entry.id === claim.claimedByUserId);
    const item = items.find((entry) => entry.id === claim.itemId);

    return [
      user?.name ?? "",
      item?.title ?? "",
      claim.notes ?? "",
    ].some((value) => value.toLowerCase().includes(normalizedSearchTerm));
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
    if (selectedUserId === null || selectedItemId === null) {
      return;
    }

    createClaimMutation.mutate({
      itemId: selectedItemId,
      claimedByUserId: selectedUserId,
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
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            isDarkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
            onCreateClaim={handleCreateClaim}
            isCreateClaimDisabled={selectedUserId === null || selectedItemId === null}
            claims={filteredClaims}
            items={filteredItems}
            users={filteredUsers}
            isLoading={usersLoading || itemsLoading}
            hasError={Boolean(usersError || itemsError || categoriesError)}
            errorMessage={
              usersError instanceof Error
                ? usersError.message
                : itemsError instanceof Error
                  ? itemsError.message
                  : categoriesError instanceof Error
                    ? categoriesError.message
                    : "Unexpected loading error."
            }
          />
        }
      >
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="review"
          element={
            <ProtectedRoute>
              <ReviewPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="items/:itemId"
          element={<ProtectedRoute><ItemDetail /></ProtectedRoute>}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
