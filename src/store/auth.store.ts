import { create } from "zustand";
import { ICurrentUser } from "@interfaces/user.interface";
import { mountStoreDevtool } from "simple-zustand-devtools";
import CookieManager from "@utils/cookieManager";

interface AuthState {
  isLoggedIn: boolean;
  user: ICurrentUser | null;
  setUser: (user: ICurrentUser | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  return {
    user: null,
    isLoggedIn: false,
    setUser: (data: ICurrentUser | null) =>
      set((state) => {
        return {
          ...state,
          user: data,
          isLoggedIn: !!data,
        };
      }),
    logout: () =>
      set((state) => {
        // clear saved cookie
        CookieManager.removeCookie("cid");
        return {
          ...state,
          user: null,
          isLoggedIn: false,
        };
      }),
  };
});

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Store", useAuthStore);
}
