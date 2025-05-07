import { create } from "zustand";

type AuthStore = {
  isLoggedIn: boolean;
  accessToken: string | null;
  link: string | null;
  email: string | null;
  setAuth: (token: string, uuid: string, email: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: !!localStorage.getItem("accessToken"),
  accessToken: localStorage.getItem("accessToken"),
  link: localStorage.getItem("link"),
  email: localStorage.getItem("email"),

  setAuth: (token, link, email) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("link", link);
    localStorage.setItem("email", email);

    set({ accessToken: token, isLoggedIn: true, link });
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("link");

    set({ accessToken: null, isLoggedIn: false, link: null });
  }
}));
