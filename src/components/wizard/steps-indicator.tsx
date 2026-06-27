"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepsIndicatorProps {
  steps: { id: string; label: string }[];
  current: number;
}

export function StepsIndicator({ steps, current }: StepsIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10">
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={s.id} className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{
                  scale: active ? 1.1 : 1,
                  backgroundColor: done || active ? "hsl(var(--primary))" : "hsl(var(--muted))",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={cn(
                  "h-9 w-9 rounded-full grid place-items-center text-sm font-semibold border-2",
                  done || active
                    ? "border-primary text-primary-foreground"
                    : "border-border text-muted-foreground bg-background"
                )}
              >
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </motion.div>
              <span className={cn(
                "hidden sm:block text-sm font-medium",
                active ? "text-foreground" : "text-muted-foreground"
              )}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="hidden sm:block w-10 h-px bg-border relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 right-0 bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: done ? "100%" : 0 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}