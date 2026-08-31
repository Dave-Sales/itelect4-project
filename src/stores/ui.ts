import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UiState {
  selectedUserId: number | null;
  selectedItemId: number | null;
  searchTerm: string;
  darkMode: boolean;
  setSelectedUserId: (id: number | null) => void;
  setSelectedItemId: (id: number | null) => void;
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
      searchTerm: "",
      darkMode: getInitialDarkMode(),
      setSelectedUserId: (id) => set({ selectedUserId: id }),
      setSelectedItemId: (id) => set({ selectedItemId: id }),
      clearSelection: () => set({ selectedUserId: null, selectedItemId: null }),
      setSearchTerm: (term) => set({ searchTerm: term }),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    { name: "lostfound-ui" }
  )
);
