import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserInfo = { name?: string } | null;

type AuthState = {
  token: string | null;
  user: UserInfo;
  login: (token: string, user?: UserInfo) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      login: (token, user = null) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
    }),
    { name: "lostfound-auth" }
  )
);
