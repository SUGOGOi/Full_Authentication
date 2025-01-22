import { useStoreTypes } from "@/types/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useStore = create<useStoreTypes>()(
  devtools((set) => ({
    // For theme
    darkMode: true,
    toggleDarkMode: (change) => set(() => ({ darkMode: change })),

    // For User
    user: {
      email: "sugogoi69@gmail.com",
    },
    setUser: (change) => set(() => ({ user: change })),
  }))
);
