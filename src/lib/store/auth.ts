"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types";
import { isAdminEmail } from "@/lib/utils";

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 600));
        if (!email.includes("@") || password.length < 4) {
          set({ isLoading: false });
          return { ok: false, error: "Please enter a valid email and password (min 4 chars)." };
        }
        const name = email.split("@")[0];
        const user: User = {
          id: `user_${Date.now()}`,
          name: name.charAt(0).toUpperCase() + name.slice(1),
          email,
          role: isAdminEmail(email) ? "admin" : "user",
          createdAt: new Date().toISOString(),
          preferences: { language: "en", theme: "system", notifications: true },
        };
        set({ user, isLoading: false });
        return { ok: true };
      },

      register: async (name, email, password) => {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 600));
        if (!email.includes("@") || password.length < 4 || !name.trim()) {
          set({ isLoading: false });
          return { ok: false, error: "Please fill all fields. Password must be at least 4 characters." };
        }
        const user: User = {
          id: `user_${Date.now()}`,
          name: name.trim(),
          email,
          role: isAdminEmail(email) ? "admin" : "user",
          createdAt: new Date().toISOString(),
          preferences: { language: "en", theme: "system", notifications: true },
        };
        set({ user, isLoading: false });
        return { ok: true };
      },

      logout: () => set({ user: null }),

      updateProfile: (updates) => {
        const current = get().user;
        if (!current) return;
        set({ user: { ...current, ...updates } });
      },
    }),
    { name: "ai-text-auth" }
  )
);