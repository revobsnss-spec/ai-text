"use client";
import { motion } from "framer-motion";
import { AI_PLATFORMS } from "@/lib/prompts/tasks";

const LOGO_INITIALS: Record<string, string> = {
  chatgpt: "GP",
  gemini: "GE",
  claude: "CL",
  midjourney: "MJ",
  "gpt-image": "GI",
  flux: "FL",
  veo: "VE",
  kling: "KL",
  runway: "RW",
  leonardo: "LE",
};

const COLOR_BG: Record<string, string> = {
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

export function Platforms() {
  return (
    <section id="platforms" className="py-24 md:py-32 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">المنصات</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            محسّن <span className="text-gradient">لكل ذكاء اصطناعي رئيسي</span>.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            كل برومبت مضبوط على خصائص كل منصة — التنسيق والنبرة والطول وأفضل الممارسات.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {AI_PLATFORMS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative rounded-2xl border border-border bg-card p-5 text-center hover:shadow-xl transition-all duration-300"
            >
              <div className={`mx-auto h-14 w-14 rounded-2xl bg-gradient-to-br ${COLOR_BG[p.id]} grid place-items-center text-white font-bold text-lg shadow-lg mb-3`}>
                {LOGO_INITIALS[p.id]}
              </div>
              <h3 className="font-semibold mb-1">{p.label}</h3>
              <p className="text-xs text-muted-foreground leading-snug">{p.description}</p>
              <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">
                {p.category}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}