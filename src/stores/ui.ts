import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UiState {
  selectedUserId: string | null;
  selectedItemId: string | null;
  selectedCategory: string;
  searchTerm: string;
  darkMode: boolean;
  setSelectedUserId: (id: string | null) => void;
  setSelectedItemId: (id: string | null) => void;
  setSelectedCategory: (category: string) => void;
  clearSelection: () => void;
  setSearchTerm: (term: string) => void;
  toggleDarkMode: () => void;
}

function getInitialDarkMode(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem("lostfound-dark-mode") === "true";
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      selectedUserId: null,
      selectedItemId: null,
      selectedCategory: "",
      searchTerm: "",
      darkMode: getInitialDarkMode(),
      setSelectedUserId: (id) => set({ selectedUserId: id }),
      setSelectedItemId: (id) => set({ selectedItemId: id }),
      setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
      clearSelection: () => set({ selectedUserId: null, selectedItemId: null }),
      setSearchTerm: (term) => set({ searchTerm: term }),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    { name: "lostfound-ui-v2" }
  )
);
