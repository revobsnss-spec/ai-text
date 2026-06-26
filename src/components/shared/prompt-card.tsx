"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Copy, Trash2, Eye, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { GeneratedPrompt } from "@/types";
import { TASK_TYPES, AI_PLATFORMS } from "@/lib/prompts/tasks";
import { copyToClipboard, relativeTime, truncate } from "@/lib/utils";
import { usePromptStore } from "@/lib/store/prompts";
import { toast } from "sonner";

export function PromptCard({ prompt, index = 0 }: { prompt: GeneratedPrompt; index?: number }) {
  const { toggleFavorite, removePrompt } = usePromptStore();
  const task = TASK_TYPES.find((t) => t.id === prompt.taskType);
  const platform = AI_PLATFORMS.find((p) => p.id === prompt.platform);

  const onCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const ok = await copyToClipboard(prompt.prompts.professional);
    if (ok) toast.success("Professional prompt copied");
  };

  const onFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(prompt.id);
  };

  const onDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    removePrompt(prompt.id);
    toast.success("Prompt deleted");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
    >
      <Link href={`/result/${prompt.id}`} className="block group">
        <Card className="h-full hover:shadow-xl hover:border-primary/30 transition-all duration-300 overflow-hidden">
          <div className={`h-1.5 bg-gradient-to-r ${task?.color ?? "from-slate-500 to-slate-600"}`} />
          <CardContent className="p-5">
            <div className="flex items-center justify-between gap-2 mb-3">
              <Badge variant="secondary">{task?.label ?? prompt.taskType}</Badge>
              <Badge variant="outline">{platform?.label ?? prompt.platform}</Badge>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3 min-h-[3.75rem]">
              {truncate(prompt.prompts.professional, 200)}
            </p>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Calendar className="h-3 w-3" /> {relativeTime(prompt.createdAt)}
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={onCopy}
                  aria-label="Copy"
                >
                  <Copy className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={onFav}
                  aria-label="Favorite"
                >
                  <Heart
                    className={`h-3.5 w-3.5 ${prompt.isFavorite ? "fill-red-500 text-red-500" : ""}`}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={onDelete}
                  aria-label="Delete"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
                <span className="h-8 w-8 grid place-items-center text-primary">
                  <Eye className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}