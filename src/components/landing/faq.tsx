"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "Do I need any technical knowledge to use AI TEXT?",
    a: "Nope. The whole point is to remove the technical barrier. You answer a few friendly questions and we generate professional, expert-level prompts for you — fully ready to paste into any AI tool.",
  },
  {
    q: "Which AI platforms are supported?",
    a: "We support ChatGPT, Gemini, Claude, Midjourney, GPT Image, Flux, Veo, Kling, Runway, and Leonardo AI — with platform-specific formatting, tone, and best practices baked into every output.",
  },
  {
    q: "What's the difference between Basic, Professional, and Expert prompts?",
    a: "Basic is short and direct — perfect for quick experiments. Professional adds structure, role-priming, and constraints for production use. Expert is exhaustive: it includes thinking protocols, deliverables, acceptance criteria, and anti-patterns.",
  },
  {
    q: "Can I edit or improve prompts after generating?",
    a: "Absolutely. Every prompt is yours. You can copy, tweak, translate between English and Arabic, regenerate, or run the built-in AI 'Improve' enhancer for a second pass.",
  },
  {
    q: "Is my data private?",
    a: "Yes. All accounts, prompts, and favorites are stored locally on your device by default. We don't sell your data. Period.",
  },
  {
    q: "Do you offer an API?",
    a: "API access is on the roadmap. For now, the product is fully usable through the web UI.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24 md:py-32 relative">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">FAQ</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Questions, <span className="text-gradient">answered</span>.
          </h2>
        </motion.div>

        <div className="space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className={cn(
                  "rounded-xl border bg-card overflow-hidden transition-colors",
                  isOpen ? "border-primary/40 shadow-lg shadow-primary/5" : "border-border"
                )}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-semibold text-sm md:text-base">{item.q}</span>
                  <span
                    className={cn(
                      "grid place-items-center h-7 w-7 rounded-full border border-border shrink-0 transition-colors",
                      isOpen && "bg-primary text-primary-foreground border-primary"
                    )}
                  >
                    {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}