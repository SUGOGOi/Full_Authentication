import { useStoreTypes } from "@/types/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useStore = create<useStoreTypes>()(
  devtools((set) => ({
    // For theme
    darkMode: true,
    toggleDarkMode: (change) => set(() => ({ darkMode: change })),

    // For User
    user: undefined,
    setUser: (change) => set(() => ({ user: change })),

    //For Auth
    isAuth: null,
    setIsAuth: (change) => set(() => ({ isAuth: change })),
  }))
);
