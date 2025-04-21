import { create } from "zustand";

type AuthStore = {
  isLoggedIn: boolean;
  accessToken: string | null;
  link: string | null;
  setAuth: (token: string, uuid: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: !!localStorage.getItem("accessToken"),
  accessToken: localStorage.getItem("accessToken"),
  link: localStorage.getItem("link"),

  setAuth: (token, link) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("link", link);

    set({ accessToken: token, isLoggedIn: true, link });
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    set({ accessToken: null, isLoggedIn: false });
  }
}));
