import { create } from "zustand";

type AuthStore = {
  isLoggedIn: boolean;
  accessToken: string | null;
  uuid: string;
  setAuth: (token: string, uuid: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: !!localStorage.getItem("accessToken"),
  accessToken: localStorage.getItem("accessToken"),
  uuid: "",

  setAuth: (token, uuid) => {
    localStorage.setItem("accessToken", token);
    set({ accessToken: token, isLoggedIn: true, uuid });
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    set({ accessToken: null, isLoggedIn: false });
  }
}));
