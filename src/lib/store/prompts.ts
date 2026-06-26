"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GeneratedPrompt, TaskType, AIPlatform } from "@/types";
import { generatePrompts } from "@/lib/prompts/generator";

interface PromptStore {
  prompts: GeneratedPrompt[];
  addPrompt: (
    userId: string,
    taskType: TaskType,
    platform: AIPlatform,
    answers: Record<string, any>,
    title?: string
  ) => GeneratedPrompt;
  toggleFavorite: (id: string) => void;
  removePrompt: (id: string) => void;
  clearAll: () => void;
  getById: (id: string) => GeneratedPrompt | undefined;
}

export const usePromptStore = create<PromptStore>()(
  persist(
    (set, get) => ({
      prompts: [],

      addPrompt: (userId, taskType, platform, answers, title) => {
        const generated = generatePrompts(taskType, platform, answers);
        const newPrompt: GeneratedPrompt = {
          id: `prompt_${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          userId,
          taskType,
          platform,
          answers,
          prompts: generated,
          isFavorite: false,
          createdAt: new Date().toISOString(),
          title,
        };
        set({ prompts: [newPrompt, ...get().prompts] });
        return newPrompt;
      },

      toggleFavorite: (id) => {
        set({
          prompts: get().prompts.map((p) =>
            p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
          ),
        });
      },

      removePrompt: (id) => {
        set({ prompts: get().prompts.filter((p) => p.id !== id) });
      },

      clearAll: () => set({ prompts: [] }),

      getById: (id) => get().prompts.find((p) => p.id === id),
    }),
    { name: "ai-text-prompts" }
  )
);