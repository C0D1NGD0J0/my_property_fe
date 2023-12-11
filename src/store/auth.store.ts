import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

import authService from "@services/auth";
import CookieManager from "@utils/cookieManager";
import { ICurrentUser } from "@interfaces/user.interface";

interface AuthState {
  isLoggedIn: boolean;
  user?: ICurrentUser | null;
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
    logout: async () => {
      try {
        const res = await authService.logout();
        set((state) => {
          // clear saved cookie
          CookieManager.removeCookie("cid");
          return {
            ...state,
            user: null,
            isLoggedIn: false,
          };
        });
      } catch (error) {
        return error;
      }
    },
  };
});

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Store", useAuthStore);
}
