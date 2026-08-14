import create from "zustand";

type UserInfo = { name?: string } | null;

type AuthState = {
  token: string | null;
  user: UserInfo;
  login: (token: string, user?: UserInfo) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  login: (token, user = null) => set({ token, user }),
  logout: () => set({ token: null, user: null }),
}));
