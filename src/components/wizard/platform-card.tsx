"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AIPlatform } from "@/types";
import { AI_PLATFORMS } from "@/lib/prompts/tasks";

const COLOR_MAP: Record<AIPlatform, string> = {
  chatgpt: "from-emerald-500 to-teal-600",
  gemini: "from-blue-500 to-indigo-600",
  claude: "from-orange-500 to-amber-600",
  midjourney: "from-purple-600 to-violet-700",
  "gpt-image": "from-green-500 to-emerald-600",
  flux: "from-pink-500 to-rose-600",
  veo: "from-cyan-500 to-blue-600",
  kling: "from-red-500 to-pink-600",
  runway: "from-indigo-500 to-purple-600",
  leonardo: "from-violet-500 to-fuchsia-600",
};

const INITIALS: Record<AIPlatform, string> = {
  chatgpt: "GP", gemini: "GE", claude: "CL", midjourney: "MJ", "gpt-image": "GI",
  flux: "FL", veo: "VE", kling: "KL", runway: "RW", leonardo: "LE",
};

export function PlatformCard({
  platform,
  selected,
  onSelect,
}: {
  platform: (typeof AI_PLATFORMS)[number];
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={cn(
        "relative flex items-center gap-3 p-4 rounded-2xl border bg-card text-left transition-all w-full",
        selected
          ? "border-primary shadow-lg shadow-primary/10 ring-2 ring-primary/30"
          : "border-border hover:border-primary/40 hover:shadow-md"
      )}
    >
      <div className={cn(
        "h-12 w-12 rounded-xl bg-gradient-to-br grid place-items-center text-white font-bold text-sm shadow-lg shrink-0",
        COLOR_MAP[platform.id]
      )}>
        {INITIALS[platform.id]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold truncate">{platform.label}</h3>
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            {platform.category}
          </span>
        </div>
        <p className="text-xs text-muted-foreground truncate">{platform.description}</p>
      </div>
      {selected && (
        <div className="absolute -top-1.5 -right-1.5 h-6 w-6 rounded-full bg-primary text-primary-foreground grid place-items-center shadow-md">
          <Check className="h-3.5 w-3.5" />
        </div>
      )}
    </motion.button>
  );
}