"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, History as HistoryIcon, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PromptCard } from "@/components/shared/prompt-card";
import { EmptyState } from "@/components/shared/empty-state";
import { usePromptStore } from "@/lib/store/prompts";
import { TASK_TYPES, AI_PLATFORMS } from "@/lib/prompts/tasks";

export default function HistoryPage() {
  const { prompts } = usePromptStore();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | string>("all");

  const filtered = useMemo(() => {
    return prompts.filter((p) => {
      const matchesQ =
        q === "" ||
        p.prompts.professional.toLowerCase().includes(q.toLowerCase()) ||
        p.taskType.toLowerCase().includes(q.toLowerCase()) ||
        p.platform.toLowerCase().includes(q.toLowerCase());
      const matchesFilter = filter === "all" || p.taskType === filter || p.platform === filter;
      return matchesQ && matchesFilter;
    });
  }, [prompts, q, filter]);

  const filters = useMemo(() => {
    const counts = new Map<string, number>();
    prompts.forEach((p) => counts.set(p.taskType, (counts.get(p.taskType) ?? 0) + 1));
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  }, [prompts]);

  return (
    <div className="container max-w-7xl py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-pink-500 grid place-items-center shadow-lg shadow-primary/30">
            <HistoryIcon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">سجل البرومبتات</h1>
            <p className="text-sm text-muted-foreground">كل برومبت ولّدته على الإطلاق.</p>
          </div>
        </div>
      </motion.div>

      {prompts.length === 0 ? (
        <EmptyState
          title="لا توجد برومبتات بعد"
          description="ولّد أول برومبت لك لتجده هنا. كل برومبت تنشئه يُحفظ تلقائياً."
          cta="ولّد برومبت"
        />
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ابحث في البرومبتات…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="pe-10 h-11"
              />
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setFilter("all")}
              className={filter === "all" ? "border-primary" : ""}
            >
              <Filter className="h-4 w-4" /> الكل
            </Button>
          </div>

          {filters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {filters.slice(0, 8).map(([task, count]) => {
                const t = TASK_TYPES.find((x) => x.id === task);
                const active = filter === task;
                return (
                  <button
                    key={task}
                    onClick={() => setFilter(active ? "all" : task)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      active
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card border-border hover:border-primary/40"
                    }`}
                  >
                    {t?.label ?? task} <span className="opacity-70 me-1">({count})</span>
                  </button>
                );
              })}
              {AI_PLATFORMS.map((p) => {
                const count = prompts.filter((pr) => pr.platform === p.id).length;
                if (count === 0) return null;
                const active = filter === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setFilter(active ? "all" : p.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      active
                        ? "bg-foreground text-background border-foreground"
                        : "bg-card border-border hover:border-foreground/40"
                    }`}
                  >
                    {p.label} <span className="opacity-70 me-1">({count})</span>
                  </button>
                );
              })}
            </div>
          )}

          {filtered.length === 0 ? (
            <EmptyState
              icon={Search}
              title="لا توجد نتائج"
              description="حاول تعديل البحث أو الفلتر."
              cta="إعادة تعيين الفلاتر"
            />
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary">{filtered.length} برومبت</Badge>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((p, i) => (
                  <PromptCard key={p.id} prompt={p} index={i} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}