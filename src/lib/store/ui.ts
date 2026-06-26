"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type SidebarState = "open" | "collapsed";

interface UIStore {
  sidebar: SidebarState;
  toggleSidebar: () => void;
  setSidebar: (s: SidebarState) => void;
  language: "en" | "ar";
  setLanguage: (l: "en" | "ar") => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set, get) => ({
      sidebar: "open",
      toggleSidebar: () => set({ sidebar: get().sidebar === "open" ? "collapsed" : "open" }),
      setSidebar: (s) => set({ sidebar: s }),
      language: "en",
      setLanguage: (l) => set({ language: l }),
    }),
    { name: "ai-text-ui" }
  )
);