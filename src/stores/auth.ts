import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserInfo = {
  id?: string | number;
  name?: string;
  email?: string;
  role?: string;
} | null;

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
