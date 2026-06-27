"use client";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { PromptCard } from "@/components/shared/prompt-card";
import { EmptyState } from "@/components/shared/empty-state";
import { usePromptStore } from "@/lib/store/prompts";

export default function FavoritesPage() {
  const { prompts } = usePromptStore();
  const favs = prompts.filter((p) => p.isFavorite);

  return (
    <div className="container max-w-7xl py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 grid place-items-center shadow-lg shadow-pink-500/30">
            <Heart className="h-5 w-5 text-white fill-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">المفضلة</h1>
            <p className="text-sm text-muted-foreground">برومبتاتك المحفوظة — جاهزة لإعادة الاستخدام في أي وقت.</p>
          </div>
        </div>
      </motion.div>

      {favs.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="لا توجد مفضلة بعد"
          description="اضغط على أيقونة القلب في أي برومبت لحفظه هنا للوصول السريع."
          cta="تصفح السجل"
          href="/history"
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favs.map((p, i) => (
            <PromptCard key={p.id} prompt={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}