"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { Question } from "@/types";

interface Props {
  question: Question;
  value: string | string[] | number;
  onChange: (value: any) => void;
}

export function QuestionField({ question, value, onChange }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-2"
    >
      <div>
        <Label className="text-base font-semibold flex items-center gap-1.5">
          {question.label}
          {question.required && <span className="text-destructive">*</span>}
        </Label>
        {question.description && (
          <p className="text-xs text-muted-foreground mt-1">{question.description}</p>
        )}
      </div>

      {question.type === "text" && (
        <Input
          placeholder={question.placeholder}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="h-11"
          dir="auto"
        />
      )}

      {question.type === "textarea" && (
        <Textarea
          placeholder={question.placeholder}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="min-h-[110px]"
          dir="auto"
        />
      )}

      {question.type === "select" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {question.options?.map((opt) => {
            const selected = value === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange(opt.value)}
                className={cn(
                  "px-3.5 py-2.5 rounded-xl border text-sm font-medium text-right transition-all",
                  selected
                    ? "border-primary bg-primary/10 text-foreground shadow-sm"
                    : "border-border bg-card hover:border-primary/40 hover:bg-accent"
                )}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}

      {question.type === "radio" && (
        <div className="space-y-2">
          {question.options?.map((opt) => {
            const selected = value === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange(opt.value)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-xl border text-right transition-all",
                  selected
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/40"
                )}
              >
                <span
                  className={cn(
                    "h-4 w-4 rounded-full border-2 grid place-items-center shrink-0",
                    selected ? "border-primary" : "border-border"
                  )}
                >
                  {selected && <span className="h-2 w-2 rounded-full bg-primary" />}
                </span>
                <div className="flex-1">
                  <div className="text-sm font-medium">{opt.label}</div>
                  {opt.description && (
                    <div className="text-xs text-muted-foreground">{opt.description}</div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {question.type === "multiselect" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {question.options?.map((opt) => {
            const arr = (Array.isArray(value) ? value : []) as string[];
            const selected = arr.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  if (selected) onChange(arr.filter((v) => v !== opt.value));
                  else onChange([...arr, opt.value]);
                }}
                className={cn(
                  "px-3 py-2.5 rounded-xl border text-sm font-medium text-right transition-all flex items-center gap-2",
                  selected
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-card hover:border-primary/40 hover:bg-accent"
                )}
              >
                <span
                  className={cn(
                    "h-4 w-4 rounded grid place-items-center border shrink-0",
                    selected ? "bg-primary border-primary text-primary-foreground" : "border-border"
                  )}
                >
                  {selected && <Check className="h-3 w-3" strokeWidth={3} />}
                </span>
                <span className="truncate flex-1 text-right">{opt.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}