"use client";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight, Copy, Check, RefreshCw, Sparkles, Languages, Wand2, Heart,
  Share2, Trash2, ExternalLink, Loader2, Download,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { usePromptStore } from "@/lib/store/prompts";
import { useAuthStore } from "@/lib/store/auth";
import {
  generatePrompts, improvePrompt, translatePrompt, simulateGenerationDelay,
} from "@/lib/prompts/generator";
import { TASK_TYPES, AI_PLATFORMS } from "@/lib/prompts/tasks";
import { copyToClipboard, formatDate, generateId } from "@/lib/utils";
import type { PromptLevel } from "@/types";

type EnhanceState = {
  active: null | "improve" | "translate-ar" | "translate-en";
  enhanced: Record<PromptLevel, string>;
  loading: boolean;
};

const initialEnhance: EnhanceState = {
  active: null,
  enhanced: { basic: "", professional: "", expert: "" },
  loading: false,
};

const LEVEL_LABEL: Record<PromptLevel, string> = {
  basic: "أساسي",
  professional: "احترافي",
  expert: "خبير",
};

const LEVEL_DESCRIPTION: Record<PromptLevel, string> = {
  basic: "قصير ومركّز، جاهز للاستخدام",
  professional: "منظّم ومفصّل، جاهز للإنتاج",
  expert: "شامل ومتعدد الطبقات، أعلى جودة",
};

export default function ResultPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const router = useRouter();
  const { user } = useAuthStore();
  const { prompts, toggleFavorite, removePrompt, getById, addPrompt } = usePromptStore();
  const [prompt, setPrompt] = useState(() => getById(id));
  const [copiedLevel, setCopiedLevel] = useState<PromptLevel | null>(null);
  const [enhance, setEnhance] = useState<EnhanceState>(initialEnhance);

  useEffect(() => {
    if (!prompt) {
      const found = prompts.find((p) => p.id === id);
      if (found) setPrompt(found);
      else router.push("/history");
    }
  }, [id, prompts, prompt, router]);

  const taskLabel = useMemo(
    () => (prompt ? TASK_TYPES.find((t) => t.id === prompt.taskType)?.label ?? prompt.taskType : ""),
    [prompt]
  );
  const platformLabel = useMemo(
    () => (prompt ? AI_PLATFORMS.find((p) => p.id === prompt.platform)?.label ?? prompt.platform : ""),
    [prompt]
  );

  if (!prompt) {
    return (
      <div className="container py-20 grid place-items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const onCopy = async (level: PromptLevel) => {
    const text = enhance.enhanced[level] || prompt.prompts[level];
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedLevel(level);
      toast.success(`تم نسخ البرومبت ${LEVEL_LABEL[level]}`);
      setTimeout(() => setCopiedLevel(null), 1500);
    } else {
      toast.error("تعذر النسخ");
    }
  };

  const onRegenerate = () => {
    const fresh = generatePrompts(prompt.taskType, prompt.platform, prompt.answers);
    setPrompt({ ...prompt, prompts: fresh });
    setEnhance(initialEnhance);
    toast.success("تم إعادة التوليد بتشكيلة جديدة");
  };

  const onRegenerateFresh = () => {
    if (!user) return;
    const newPrompt = addPrompt(user.id, prompt.taskType, prompt.platform, prompt.answers);
    toast.success("تم حفظ تشكيلة جديدة");
    router.push(`/result/${newPrompt.id}`);
  };

  const onImprove = async () => {
    setEnhance((e) => ({ ...e, loading: true, active: "improve" }));
    await new Promise((r) => setTimeout(r, simulateGenerationDelay("expert")));
    setEnhance({
      active: "improve",
      enhanced: {
        basic: improvePrompt(prompt.prompts.basic, prompt.platform),
        professional: improvePrompt(prompt.prompts.professional, prompt.platform),
        expert: improvePrompt(prompt.prompts.expert, prompt.platform),
      },
      loading: false,
    });
    toast.success("تم تحسين البرومبتات");
  };

  const onTranslate = async (target: "ar" | "en") => {
    setEnhance((e) => ({
      ...e,
      loading: true,
      active: target === "ar" ? "translate-ar" : "translate-en",
    }));
    await new Promise((r) => setTimeout(r, simulateGenerationDelay("professional")));
    setEnhance({
      active: target === "ar" ? "translate-ar" : "translate-en",
      enhanced: {
        basic: translatePrompt(prompt.prompts.basic, target),
        professional: translatePrompt(prompt.prompts.professional, target),
        expert: translatePrompt(prompt.prompts.expert, target),
      },
      loading: false,
    });
    toast.success(target === "ar" ? "تم الترجمة إلى العربية" : "تم الترجمة إلى الإنجليزية");
  };

  const onFavorite = () => {
    toggleFavorite(prompt.id);
    setPrompt({ ...prompt, isFavorite: !prompt.isFavorite });
    toast.success(prompt.isFavorite ? "تمت الإزالة من المفضلة" : "تمت الإضافة للمفضلة");
  };

  const onDelete = () => {
    removePrompt(prompt.id);
    toast.success("تم حذف البرومبت");
    router.push("/history");
  };

  const onDownload = () => {
    const content = `# برومبت ${taskLabel} — ${platformLabel}\nتم التوليد في ${formatDate(prompt.createdAt)}\n\n---\n\n## أساسي\n\n${prompt.prompts.basic}\n\n---\n\n## احترافي\n\n${prompt.prompts.professional}\n\n---\n\n## خبير\n\n${prompt.prompts.expert}\n`;
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `prompt-${generateId()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const showEnhanced = enhance.active !== null;

  return (
    <div className="container max-w-6xl py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
          >
            <ArrowRight className="h-4 w-4" /> العودة للمولّد
          </Link>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="gradient">{taskLabel}</Badge>
            <Badge variant="outline">{platformLabel}</Badge>
            <span className="text-xs text-muted-foreground">{formatDate(prompt.createdAt)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="glass" size="sm" onClick={onFavorite}>
            <Heart className={`h-4 w-4 ${prompt.isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            {prompt.isFavorite ? "محفوظ" : "حفظ"}
          </Button>
          <Button variant="glass" size="sm" onClick={onDownload}>
            <Download className="h-4 w-4" /> تصدير
          </Button>
          <Button variant="ghost" size="sm" onClick={onDelete} className="text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 flex flex-wrap gap-2"
      >
        <Button variant="outline" size="sm" onClick={onImprove} disabled={enhance.loading}>
          {enhance.loading && enhance.active === "improve" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Wand2 className="h-3.5 w-3.5" />}
          تحسين
        </Button>
        <Button variant="outline" size="sm" onClick={() => onTranslate("ar")} disabled={enhance.loading}>
          {enhance.loading && enhance.active === "translate-ar" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Languages className="h-3.5 w-3.5" />}
          ترجم للإنجليزية
        </Button>
        <Button variant="outline" size="sm" onClick={() => onTranslate("en")} disabled={enhance.loading}>
          {enhance.loading && enhance.active === "translate-en" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Languages className="h-3.5 w-3.5" />}
          ترجم للعربية
        </Button>
        <Button variant="outline" size="sm" onClick={onRegenerate} disabled={enhance.loading}>
          <RefreshCw className="h-3.5 w-3.5" /> إعادة توليد
        </Button>
        <Button variant="outline" size="sm" onClick={onRegenerateFresh} disabled={enhance.loading}>
          <Sparkles className="h-3.5 w-3.5" /> تشكيلة جديدة
        </Button>
        {showEnhanced && (
          <Button variant="ghost" size="sm" onClick={() => setEnhance(initialEnhance)}>
            إعادة تعيين
          </Button>
        )}
      </motion.div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="basic">أساسي</TabsTrigger>
          <TabsTrigger value="professional">احترافي</TabsTrigger>
          <TabsTrigger value="expert">خبير</TabsTrigger>
        </TabsList>

        {(["basic", "professional", "expert"] as PromptLevel[]).map((level) => (
          <TabsContent key={level} value={level} className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden border-border/60">
                <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-2">
                    <Badge variant={level === "expert" ? "gradient" : level === "professional" ? "info" : "secondary"}>
                      {LEVEL_LABEL[level]}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {LEVEL_DESCRIPTION[level]}
                    </span>
                  </div>
                  <Button size="sm" variant="default" onClick={() => onCopy(level)}>
                    {copiedLevel === level ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copiedLevel === level ? "تم النسخ" : "نسخ"}
                  </Button>
                </div>
                <CardContent className="p-0">
                  {enhance.loading && enhance.active !== null ? (
                    <div className="p-10 grid place-items-center">
                      <Loader2 className="h-6 w-6 animate-spin text-primary mb-2" />
                      <p className="text-xs text-muted-foreground">
                        {enhance.active === "improve" && "جارٍ تحسين البرومبت…"}
                        {enhance.active === "translate-ar" && "جارٍ الترجمة إلى العربية…"}
                        {enhance.active === "translate-en" && "جارٍ الترجمة إلى الإنجليزية…"}
                      </p>
                    </div>
                  ) : (
                    <pre className="p-5 md:p-6 text-sm leading-relaxed font-mono whitespace-pre-wrap break-words max-h-[60vh] overflow-y-auto scrollbar-thin" dir="auto">
{showEnhanced ? enhance.enhanced[level] : prompt.prompts[level]}
                    </pre>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-between">
        <p className="text-xs text-muted-foreground flex items-center gap-2">
          <ExternalLink className="h-3.5 w-3.5" />
          الصق هذا في {platformLabel} للبدء.
        </p>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard">
              <Sparkles className="h-4 w-4" /> ولّد آخر
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/history">
              <Share2 className="h-4 w-4" /> عرض السجل
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}