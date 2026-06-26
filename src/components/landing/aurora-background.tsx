"use client";
import { motion } from "framer-motion";

export function AuroraBackground() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden -z-10">
      <div className="aurora-blob aurora-blob-1 h-[500px] w-[500px] -top-20 -left-20" />
      <div className="aurora-blob aurora-blob-2 h-[600px] w-[600px] top-1/3 right-0" />
      <div className="aurora-blob aurora-blob-3 h-[450px] w-[450px] bottom-0 left-1/3" />
      <div className="absolute inset-0 grid-pattern opacity-40" />
    </div>
  );
}