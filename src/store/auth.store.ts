import { create } from "zustand";
import { PersistOptions, createJSONStorage, persist } from "zustand/middleware";
import { mountStoreDevtool } from "simple-zustand-devtools";

import authService from "@services/auth";
import CookieManager from "@utils/cookieManager";
import { ICurrentUser } from "@interfaces/user.interface";

interface AuthState {
  isLoggedIn: boolean;
  user: ICurrentUser | null;
  setUser: (user: ICurrentUser | null) => void;
  logout: (sendRequest?: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
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
      logout: async (sendRequest = false) => {
        try {
          if (sendRequest) {
            await authService.logout(CookieManager.getCookie("cid"));
          }
          set((state) => {
            // clear saved cookie
            CookieManager.removeCookie("cid");
            // Remove the persisted state from sessionStorage
            sessionStorage.removeItem("auth-storage");
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
    }),
    {
      name: "auth-storage", // unique name for the storage (local storage key)
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ isLoggedIn: state.isLoggedIn }), // persist only isLoggedIn
    },
  ),
);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Store", useAuthStore);
}
