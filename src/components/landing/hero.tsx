"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star, Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuroraBackground } from "./aurora-background";

export function Hero() {
  return (
    <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
      <AuroraBackground />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 backdrop-blur-sm px-3.5 py-1.5 text-xs font-medium mb-6 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-muted-foreground">Now with 10 AI platforms & 12 task types</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            Generate <span className="text-gradient">perfect prompts</span>
            <br className="hidden sm:block" /> for any AI
            <span className="block mt-2 text-foreground">— in seconds.</span>
          </h1>

          <p className="mt-7 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            AI TEXT is the most advanced prompt engineering platform. Answer a few guided questions and get <strong className="text-foreground">basic, professional, and expert-level</strong> prompts — tuned for ChatGPT, Midjourney, Claude, and more.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="xl" variant="gradient" asChild className="w-full sm:w-auto group">
              <Link href="/dashboard">
                Start generating free
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button size="xl" variant="glass" asChild className="w-full sm:w-auto">
              <Link href="#features">See how it works</Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              No credit card
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-amber-500" />
              Generate in &lt; 10 seconds
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              Loved by 50,000+ creators
            </span>
          </div>
        </motion.div>

        {/* Hero preview card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-20 mx-auto max-w-5xl"
        >
          <div className="relative rounded-2xl border border-border bg-card/80 backdrop-blur-xl shadow-2xl shadow-primary/10 overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-border bg-muted/30">
              <span className="h-3 w-3 rounded-full bg-red-500/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <span className="h-3 w-3 rounded-full bg-green-500/70" />
              <span className="ml-4 text-xs font-mono text-muted-foreground">aitext.app/generator</span>
            </div>
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
              {[
                { step: "01", title: "Choose task", desc: "Image, video, code, marketing…", icon: "🎯" },
                { step: "02", title: "Pick AI platform", desc: "ChatGPT, Midjourney, Claude…", icon: "🤖" },
                { step: "03", title: "Get 3 prompts", desc: "Basic · Pro · Expert", icon: "✨" },
              ].map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.15 }}
                  className="p-6 md:p-8"
                >
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <div className="text-xs font-mono text-primary font-bold mb-1">STEP {s.step}</div>
                  <h3 className="text-lg font-semibold mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}