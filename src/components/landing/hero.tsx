"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Star, Zap, ShieldCheck } from "lucide-react";
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
            <span className="text-muted-foreground">يدعم الآن 10 منصات ذكاء اصطناعي و 12 نوع مهمة</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.15]">
            أنشئ <span className="text-gradient">برومبتات مثالية</span>
            <br className="hidden sm:block" /> لأي ذكاء اصطناعي
            <span className="block mt-2 text-foreground">— في ثوانٍ معدودة.</span>
          </h1>

          <p className="mt-7 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            AI TEXT هي المنصة الأكثر تطوراً لهندسة البرومبتات. أجب على بعض الأسئلة الموجّهة واحصل على برومبتات <strong className="text-foreground">عادية واحترافية وعلى مستوى الخبراء</strong> — محسّنة لـ ChatGPT و Midjourney و Claude وغيرها.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="xl" variant="gradient" asChild className="w-full sm:w-auto group">
              <Link href="/dashboard">
                ابدأ التوليد مجاناً
                <ArrowLeft className="transition-transform group-hover:-translate-x-0.5" />
              </Link>
            </Button>
            <Button size="xl" variant="glass" asChild className="w-full sm:w-auto">
              <Link href="#features">شاهد كيف يعمل</Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              بدون بطاقة ائتمان
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-amber-500" />
              توليد في أقل من 10 ثوانٍ
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              يحبها أكثر من 50,000 مبدع
            </span>
          </div>
        </motion.div>

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
              <span className="me-4 text-xs font-mono text-muted-foreground" dir="ltr">aitext.app/generator</span>
            </div>
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
              {[
                { step: "01", title: "اختر المهمة", desc: "صورة، فيديو، برمجة، تسويق…", icon: "🎯" },
                { step: "02", title: "اختر منصة AI", desc: "ChatGPT، Midjourney، Claude…", icon: "🤖" },
                { step: "03", title: "احصل على 3 برومبتات", desc: "عادي · احترافي · خبير", icon: "✨" },
              ].map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.15 }}
                  className="p-6 md:p-8"
                >
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <div className="text-xs font-mono text-primary font-bold mb-1">الخطوة {s.step}</div>
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