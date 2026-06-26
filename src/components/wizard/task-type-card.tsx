"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  ImageIcon, VideoIcon, Globe, Smartphone, Sparkles, Megaphone, Share2, PenLine,
  TrendingUp, Code2, Lightbulb, Wand2, type LucideIcon,
} from "lucide-react";
import type { TaskType } from "@/types";
import { TASK_TYPES } from "@/lib/prompts/tasks";

const ICON_MAP: Record<string, LucideIcon> = {
  ImageIcon, VideoIcon, Globe, Smartphone, Sparkles, Megaphone, Share2, PenLine,
  TrendingUp, Code2, Lightbulb, Wand2,
};

export function TaskTypeCard({
  type,
  selected,
  onSelect,
}: {
  type: (typeof TASK_TYPES)[number];
  selected: boolean;
  onSelect: () => void;
}) {
  const Icon = ICON_MAP[type.icon] ?? Wand2;
  return (
    <motion.button
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={cn(
        "group relative w-full text-left rounded-2xl border bg-card p-5 transition-all overflow-hidden",
        selected
          ? "border-primary shadow-xl shadow-primary/10 ring-2 ring-primary/30"
          : "border-border hover:border-primary/40 hover:shadow-lg"
      )}
    >
      <div className={cn(
        "inline-flex items-center justify-center h-11 w-11 rounded-xl text-white shadow-lg mb-3 bg-gradient-to-br",
        type.color
      )}>
        <Icon className="h-5 w-5" strokeWidth={2.2} />
      </div>
      <h3 className="font-semibold mb-1">{type.label}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">{type.description}</p>
      {selected && (
        <motion.div
          layoutId="task-selected-ring"
          className="absolute inset-0 rounded-2xl ring-2 ring-primary pointer-events-none"
        />
      )}
      <div className={cn(
        "absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-[0.04] transition-opacity pointer-events-none",
        type.color
      )} />
    </motion.button>
  );
}