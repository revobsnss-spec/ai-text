"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuroraBackground } from "./aurora-background";

export function CTA() {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-card to-primary/5 p-10 md:p-16 text-center"
        >
          <div className="absolute inset-0 -z-0">
            <AuroraBackground />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-pink-500 shadow-xl shadow-primary/30 mb-6">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Ready to ship <span className="text-gradient">better AI work</span>?
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Join 50,000+ creators, founders and engineers who use AI TEXT to engineer perfect prompts in seconds.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="xl" variant="gradient" asChild className="w-full sm:w-auto group">
                <Link href="/register">
                  Get started — it's free
                  <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button size="xl" variant="glass" asChild className="w-full sm:w-auto">
                <Link href="/dashboard">Try the generator</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}