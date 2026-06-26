"use client";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft, Copy, Check, RefreshCw, Sparkles, Languages, Wand2, Heart,
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
      toast.success(`${level[0].toUpperCase() + level.slice(1)} prompt copied!`);
      setTimeout(() => setCopiedLevel(null), 1500);
    } else {
      toast.error("Could not copy");
    }
  };

  const onRegenerate = () => {
    if (!user) return;
    const fresh = generatePrompts(prompt.taskType, prompt.platform, prompt.answers);
    setPrompt({ ...prompt, prompts: fresh });
    setEnhance(initialEnhance);
    toast.success("Regenerated with new variations");
  };

  const onRegenerateFresh = () => {
    if (!user) return;
    const newPrompt = addPrompt(user.id, prompt.taskType, prompt.platform, prompt.answers);
    toast.success("New variation saved");
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
    toast.success("Prompts enhanced");
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
    toast.success(target === "ar" ? "Arabic translation generated" : "English translation generated");
  };

  const onFavorite = () => {
    toggleFavorite(prompt.id);
    setPrompt({ ...prompt, isFavorite: !prompt.isFavorite });
    toast.success(prompt.isFavorite ? "Removed from favorites" : "Saved to favorites");
  };

  const onDelete = () => {
    removePrompt(prompt.id);
    toast.success("Prompt deleted");
    router.push("/history");
  };

  const onDownload = () => {
    const content = `# ${taskLabel} prompt — ${platformLabel}\nGenerated on ${formatDate(prompt.createdAt)}\n\n---\n\n## Basic\n\n${prompt.prompts.basic}\n\n---\n\n## Professional\n\n${prompt.prompts.professional}\n\n---\n\n## Expert\n\n${prompt.prompts.expert}\n`;
    const blob = new Blob([content], { type: "text/markdown" });
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
      {/* Header */}
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
            <ArrowLeft className="h-4 w-4" /> Back to generator
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
            {prompt.isFavorite ? "Saved" : "Save"}
          </Button>
          <Button variant="glass" size="sm" onClick={onDownload}>
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button variant="ghost" size="sm" onClick={onDelete} className="text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      {/* Enhance toolbar */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 flex flex-wrap gap-2"
      >
        <Button variant="outline" size="sm" onClick={onImprove} disabled={enhance.loading}>
          {enhance.loading && enhance.active === "improve" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Wand2 className="h-3.5 w-3.5" />}
          Improve
        </Button>
        <Button variant="outline" size="sm" onClick={() => onTranslate("ar")} disabled={enhance.loading}>
          {enhance.loading && enhance.active === "translate-ar" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Languages className="h-3.5 w-3.5" />}
          Translate to Arabic
        </Button>
        <Button variant="outline" size="sm" onClick={() => onTranslate("en")} disabled={enhance.loading}>
          {enhance.loading && enhance.active === "translate-en" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Languages className="h-3.5 w-3.5" />}
          Translate to English
        </Button>
        <Button variant="outline" size="sm" onClick={onRegenerate} disabled={enhance.loading}>
          <RefreshCw className="h-3.5 w-3.5" /> Regenerate
        </Button>
        <Button variant="outline" size="sm" onClick={onRegenerateFresh} disabled={enhance.loading}>
          <Sparkles className="h-3.5 w-3.5" /> New variation
        </Button>
        {showEnhanced && (
          <Button variant="ghost" size="sm" onClick={() => setEnhance(initialEnhance)}>
            Reset
          </Button>
        )}
      </motion.div>

      {/* Tabs */}
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="professional">Professional</TabsTrigger>
          <TabsTrigger value="expert">Expert</TabsTrigger>
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
                      {level.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {level === "basic" && "Short, focused, ready to use"}
                      {level === "professional" && "Structured, detailed, production-ready"}
                      {level === "expert" && "Exhaustive, multi-layered, maximum quality"}
                    </span>
                  </div>
                  <Button size="sm" variant="default" onClick={() => onCopy(level)}>
                    {copiedLevel === level ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copiedLevel === level ? "Copied" : "Copy"}
                  </Button>
                </div>
                <CardContent className="p-0">
                  {enhance.loading && enhance.active !== null ? (
                    <div className="p-10 grid place-items-center">
                      <Loader2 className="h-6 w-6 animate-spin text-primary mb-2" />
                      <p className="text-xs text-muted-foreground">
                        {enhance.active === "improve" && "Enhancing prompt…"}
                        {enhance.active === "translate-ar" && "Translating to Arabic…"}
                        {enhance.active === "translate-en" && "Translating to English…"}
                      </p>
                    </div>
                  ) : (
                    <pre className="p-5 md:p-6 text-sm leading-relaxed font-mono whitespace-pre-wrap break-words max-h-[60vh] overflow-y-auto scrollbar-thin">
{showEnhanced ? enhance.enhanced[level] : prompt.prompts[level]}
                    </pre>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Quick actions footer */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-between">
        <p className="text-xs text-muted-foreground flex items-center gap-2">
          <ExternalLink className="h-3.5 w-3.5" />
          Paste this into {platformLabel} to get started.
        </p>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard">
              <Sparkles className="h-4 w-4" /> Generate another
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/history">
              <Share2 className="h-4 w-4" /> View history
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}