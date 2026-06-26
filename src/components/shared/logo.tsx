"use client";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: { wrap: "h-7 w-7", text: "text-base", icon: "h-4 w-4" },
    md: { wrap: "h-9 w-9", text: "text-lg", icon: "h-5 w-5" },
    lg: { wrap: "h-12 w-12", text: "text-2xl", icon: "h-6 w-6" },
  };
  const s = sizes[size];

  return (
    <Link href="/" className={cn("group flex items-center gap-2.5", className)}>
      <motion.div
        whileHover={{ rotate: 12, scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={cn(
          "relative grid place-items-center rounded-xl bg-gradient-to-br from-primary via-purple-500 to-pink-500 shadow-lg shadow-primary/30",
          s.wrap
        )}
      >
        <Sparkles className={cn("text-white", s.icon)} strokeWidth={2.5} />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary via-purple-500 to-pink-500 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60" />
      </motion.div>
      <span className={cn("font-bold tracking-tight", s.text)}>
        AI<span className="text-gradient">TEXT</span>
      </span>
    </Link>
  );
}