import { create } from "zustand";

type AuthStore = {
  isLoggedIn: boolean;
  accessToken: string | null;
  setAuth: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: !!localStorage.getItem("accessToken"),
  accessToken: localStorage.getItem("accessToken"),

  setAuth: (token) => {
    localStorage.setItem("accessToken", token);
    set({ accessToken: token, isLoggedIn: true });
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    set({ accessToken: null, isLoggedIn: false });
  }
}));
