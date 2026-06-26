"use client";
import { motion } from "framer-motion";
import { Wand2, Layers, Globe2, Languages, Shield, BarChart3, Heart, History, Smartphone } from "lucide-react";

const FEATURES = [
  { icon: Wand2, title: "Guided wizard", desc: "No blank-page anxiety. Answer a few questions, get world-class prompts.", color: "from-purple-500 to-pink-500" },
  { icon: Layers, title: "3-tier output", desc: "Basic, Professional, and Expert variants for every task — instantly.", color: "from-blue-500 to-cyan-500" },
  { icon: Globe2, title: "10 AI platforms", desc: "Optimized for ChatGPT, Midjourney, Claude, Flux, Veo, Runway, and more.", color: "from-emerald-500 to-teal-500" },
  { icon: Languages, title: "Bilingual", desc: "Translate any prompt between English and Arabic with one click.", color: "from-amber-500 to-orange-500" },
  { icon: Shield, title: "Best-practice baked in", desc: "Every prompt follows the latest prompt-engineering research.", color: "from-rose-500 to-pink-500" },
  { icon: BarChart3, title: "Admin analytics", desc: "Track usage, top categories, and user growth from a single dashboard.", color: "from-indigo-500 to-violet-500" },
  { icon: Heart, title: "Favorites", desc: "Save your best prompts. Build a personal library you can re-use forever.", color: "from-pink-500 to-rose-500" },
  { icon: History, title: "History", desc: "Never lose work. Every prompt you generate is saved and searchable.", color: "from-sky-500 to-blue-500" },
  { icon: Smartphone, title: "Works everywhere", desc: "Beautifully responsive. Generate from your phone, tablet, or laptop.", color: "from-green-500 to-emerald-500" },
];

export function Features() {
  return (
    <section id="features" className="py-24 md:py-32 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">Features</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Everything you need to <span className="text-gradient">engineer the perfect prompt</span>.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Powerful primitives, beautiful design, and an engine tuned for results.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br ${f.color} text-white shadow-lg mb-5`}>
                <f.icon className="h-6 w-6" strokeWidth={2.2} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 pointer-events-none`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}