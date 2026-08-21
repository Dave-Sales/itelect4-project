import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UiState {
  selectedUserId: number | null;
  searchTerm: string;
  darkMode: boolean;
  setSelectedUserId: (id: number | null) => void;
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
      searchTerm: "",
      darkMode: getInitialDarkMode(),
      setSelectedUserId: (id) => set({ selectedUserId: id }),
      clearSelection: () => set({ selectedUserId: null }),
      setSearchTerm: (term) => set({ searchTerm: term }),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    { name: "lostfound-ui" }
  )
);
