"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2, Sparkles, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StepsIndicator } from "./steps-indicator";
import { TaskTypeCard } from "./task-type-card";
import { PlatformCard } from "./platform-card";
import { QuestionField } from "./question-field";
import { TASK_TYPES, AI_PLATFORMS, getQuestions } from "@/lib/prompts/tasks";
import { generatePrompts } from "@/lib/prompts/generator";
import { useAuthStore } from "@/lib/store/auth";
import { usePromptStore } from "@/lib/store/prompts";
import type { TaskType, AIPlatform } from "@/types";

const STEPS = [
  { id: "task", label: "Task" },
  { id: "platform", label: "Platform" },
  { id: "details", label: "Details" },
];

export function PromptWizard() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { addPrompt } = usePromptStore();

  const [step, setStep] = useState(0);
  const [taskType, setTaskType] = useState<TaskType | null>(null);
  const [platform, setPlatform] = useState<AIPlatform | null>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isGenerating, setIsGenerating] = useState(false);

  const questions = taskType ? getQuestions(taskType) : [];

  const canProceed = () => {
    if (step === 0) return !!taskType;
    if (step === 1) return !!platform;
    if (step === 2) {
      return questions
        .filter((q) => q.required)
        .every((q) => {
          const v = answers[q.id];
          if (Array.isArray(v)) return v.length > 0;
          return v !== undefined && v !== "";
        });
    }
    return false;
  };

  const handleGenerate = async () => {
    if (!taskType || !platform || !user) return;
    setIsGenerating(true);
    // simulate engine compute time
    await new Promise((r) => setTimeout(r, 1400));
    const saved = addPrompt(user.id, taskType, platform, answers);
    setIsGenerating(false);
    toast.success("Prompts generated!");
    router.push(`/result/${saved.id}`);
  };

  const onNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      handleGenerate();
    }
  };

  const onBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="container max-w-5xl py-10 md:py-14">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 backdrop-blur-sm px-3 py-1 text-xs font-medium mb-4">
          <Wand2 className="h-3.5 w-3.5 text-primary" />
          Prompt Generator
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Build the <span className="text-gradient">perfect prompt</span>
        </h1>
        <p className="text-muted-foreground mt-2">3 simple steps. World-class output.</p>
      </div>

      <StepsIndicator steps={STEPS} current={step} />

      <Card className="border-border/60 shadow-xl shadow-primary/5 overflow-hidden">
        <CardContent className="p-6 md:p-10">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="task"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="text-xl font-semibold mb-1">What do you want to create?</h2>
                <p className="text-sm text-muted-foreground mb-6">Pick the type of task you're working on.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {TASK_TYPES.map((t) => (
                    <TaskTypeCard
                      key={t.id}
                      type={t}
                      selected={taskType === t.id}
                      onSelect={() => setTaskType(t.id)}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="platform"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="text-xl font-semibold mb-1">Which AI platform?</h2>
                <p className="text-sm text-muted-foreground mb-6">We'll tune the prompt for that platform's quirks.</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {AI_PLATFORMS.map((p) => (
                    <PlatformCard
                      key={p.id}
                      platform={p}
                      selected={platform === p.id}
                      onSelect={() => setPlatform(p.id)}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && taskType && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="text-xl font-semibold mb-1">Tell us a bit more</h2>
                <p className="text-sm text-muted-foreground mb-6">Answer a few questions — the more detail, the better the output.</p>
                <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin">
                  {questions.map((q) => (
                    <QuestionField
                      key={q.id}
                      question={q}
                      value={answers[q.id] ?? q.default ?? (q.type === "multiselect" ? [] : "")}
                      onChange={(v) => setAnswers({ ...answers, [q.id]: v })}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>

        <div className="border-t border-border bg-muted/30 px-6 md:px-10 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} disabled={step === 0 || isGenerating}>
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <Button
            onClick={onNext}
            disabled={!canProceed() || isGenerating}
            variant={step === 2 ? "gradient" : "default"}
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Generating…
              </>
            ) : step === 2 ? (
              <>
                <Sparkles className="h-4 w-4" /> Generate prompts
              </>
            ) : (
              <>
                Continue <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}