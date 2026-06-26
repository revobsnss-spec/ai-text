import type { TaskType, AIPlatform, Question, PromptLevel } from "@/types";
import { TASK_TYPES, AI_PLATFORMS, getQuestions } from "./tasks";

const PLATFORM_HINTS: Record<AIPlatform, string> = {
  chatgpt: "Optimized for ChatGPT (GPT-4o / GPT-5). Use clear sections, role priming, and explicit constraints.",
  gemini: "Optimized for Google Gemini. Lean into multimodal cues, structured Markdown, and grounded reasoning.",
  claude: "Optimized for Anthropic Claude. Use XML tags for structure and explicit chain-of-thought instructions.",
  midjourney: "Optimized for Midjourney v6+. Use `--ar`, `--v 6`, `--style raw`, and concise comma-separated descriptors.",
  "gpt-image": "Optimized for OpenAI GPT Image (DALL·E 3 / GPT Image 1). Describe subjects in natural language with strong style cues.",
  flux: "Optimized for Flux (Black Forest Labs). Use precise, descriptive language; Flux handles natural prompts well.",
  veo: "Optimized for Google Veo. Combine scene, motion, and cinematic language with explicit timing cues.",
  kling: "Optimized for Kling AI. Use scene + camera + motion in clear sequence; specify realistic or stylized mode.",
  runway: "Optimized for Runway Gen-3/4. Use cinematic language, motion verbs, and shot composition cues.",
  leonardo: "Optimized for Leonardo AI. Combine negative prompts and select model preset cues.",
};

function getAnswer(answers: Record<string, any>, id: string, fallback = ""): string {
  const v = answers[id];
  if (Array.isArray(v)) return v.join(", ");
  if (v === undefined || v === null || v === "") return fallback;
  return String(v);
}

function joinLabels(answers: Record<string, any>, id: string): string {
  const v = answers[id];
  if (Array.isArray(v)) return v.join(", ");
  if (!v) return "";
  return String(v);
}

function platformTag(platform: AIPlatform): string {
  return `[Platform: ${platform.toUpperCase()}]`;
}

/** Build BASIC prompt — short, focused, ready to use. */
export function buildBasicPrompt(
  taskType: TaskType,
  platform: AIPlatform,
  answers: Record<string, any>
): string {
  const hint = PLATFORM_HINTS[platform];
  const platformName = AI_PLATFORMS.find((p) => p.id === platform)?.label ?? platform;

  const segments: string[] = [];
  segments.push(`# ${platformName} Prompt — Basic`);
  segments.push(`> ${hint}`);

  switch (taskType) {
    case "image": {
      const subject = getAnswer(answers, "subject");
      const style = getAnswer(answers, "style", "realistic");
      const lighting = getAnswer(answers, "lighting", "natural");
      const mood = getAnswer(answers, "mood", "calm");
      const colors = getAnswer(answers, "colors");
      const camera = getAnswer(answers, "camera", "eye-level");
      const aspect = getAnswer(answers, "aspect", "16:9");
      const quality = getAnswer(answers, "quality", "high");
      segments.push(`Create an image of **${subject}**.`);
      segments.push(`Style: ${style}. Lighting: ${lighting}. Mood: ${mood}.`);
      if (colors) segments.push(`Color palette: ${colors}.`);
      segments.push(`Camera: ${camera}. Aspect ratio: ${aspect}. Quality: ${quality}.`);
      break;
    }
    case "video": {
      const scene = getAnswer(answers, "scene");
      const duration = getAnswer(answers, "duration", "8s");
      const camera = getAnswer(answers, "camera", "smooth-pan");
      const lighting = getAnswer(answers, "lighting", "natural");
      const voiceover = getAnswer(answers, "voiceover");
      const music = getAnswer(answers, "music", "cinematic");
      const effects = getAnswer(answers, "effects");
      segments.push(`Generate a ${duration} video: ${scene}`);
      segments.push(`Camera: ${camera}. Lighting: ${lighting}. Music: ${music}.`);
      if (voiceover) segments.push(`Voiceover: ${voiceover}.`);
      if (effects) segments.push(`Effects: ${effects}.`);
      break;
    }
    case "website": {
      const industry = getAnswer(answers, "industry");
      const uiStyle = getAnswer(answers, "ui-style", "modern");
      const pages = joinLabels(answers, "pages");
      const features = joinLabels(answers, "features");
      const audience = getAnswer(answers, "audience");
      const colors = getAnswer(answers, "colors");
      const animations = getAnswer(answers, "animations", "smooth");
      const performance = getAnswer(answers, "performance", "fast");
      segments.push(`Design a ${uiStyle} website for the **${industry}** industry targeting ${audience || "general users"}.`);
      if (pages) segments.push(`Pages: ${pages}.`);
      if (features) segments.push(`Features: ${features}.`);
      if (colors) segments.push(`Color scheme: ${colors}.`);
      segments.push(`Animations: ${animations}. Performance: ${performance}.`);
      break;
    }
    case "app": {
      const name = getAnswer(answers, "name");
      const platforms = joinLabels(answers, "platform");
      const features = joinLabels(answers, "features");
      const audience = getAnswer(answers, "audience");
      const design = getAnswer(answers, "design", "modern");
      segments.push(`Plan the **${name}** app for ${platforms || "mobile"} targeting ${audience || "general users"}.`);
      segments.push(`Design style: ${design}.`);
      if (features) segments.push(`Core features: ${features}.`);
      break;
    }
    case "logo": {
      const brand = getAnswer(answers, "brand");
      const industry = getAnswer(answers, "industry");
      const style = getAnswer(answers, "style", "minimal");
      const mood = joinLabels(answers, "mood");
      const colors = getAnswer(answers, "colors");
      segments.push(`Design a ${style} logo for **${brand}**${industry ? ` (${industry})` : ""}.`);
      if (mood) segments.push(`Mood: ${mood}.`);
      if (colors) segments.push(`Colors: ${colors}.`);
      break;
    }
    case "advertisement": {
      const product = getAnswer(answers, "product");
      const medium = getAnswer(answers, "medium", "social");
      const audience = getAnswer(answers, "audience");
      const tone = getAnswer(answers, "tone", "persuasive");
      const offer = getAnswer(answers, "offer");
      segments.push(`Write a ${tone} ${medium} ad for **${product}** targeting ${audience || "general audience"}.`);
      if (offer) segments.push(`Hook / offer: ${offer}.`);
      break;
    }
    case "social": {
      const sp = getAnswer(answers, "platform", "instagram");
      const topic = getAnswer(answers, "topic");
      const goal = getAnswer(answers, "goal", "engage");
      const tone = getAnswer(answers, "tone", "casual");
      const cta = getAnswer(answers, "cta");
      segments.push(`Write a ${tone} ${sp} post about **${topic}** aimed at ${goal}.`);
      if (cta) segments.push(`CTA: ${cta}.`);
      break;
    }
    case "writing": {
      const format = getAnswer(answers, "format", "article");
      const topic = getAnswer(answers, "topic");
      const tone = getAnswer(answers, "tone", "neutral");
      const audience = getAnswer(answers, "audience");
      const length = getAnswer(answers, "length");
      segments.push(`Write a ${tone} ${format} about **${topic}** for ${audience || "a general audience"}.`);
      if (length) segments.push(`Length: ${length}.`);
      break;
    }
    case "marketing": {
      const product = getAnswer(answers, "product");
      const strategy = getAnswer(answers, "strategy", "launch");
      const audience = getAnswer(answers, "audience");
      const channels = joinLabels(answers, "channels");
      segments.push(`Build a ${strategy} marketing strategy for **${product}** targeting ${audience || "general audience"}.`);
      if (channels) segments.push(`Channels: ${channels}.`);
      break;
    }
    case "programming": {
      const language = getAnswer(answers, "language", "typescript");
      const framework = getAnswer(answers, "framework");
      const task = getAnswer(answers, "task");
      const db = getAnswer(answers, "database");
      const auth = getAnswer(answers, "auth");
      segments.push(`Write ${language}${framework ? ` (${framework})` : ""} code to: **${task}**.`);
      if (db && db !== "none") segments.push(`Database: ${db}.`);
      if (auth && auth !== "none") segments.push(`Auth: ${auth}.`);
      break;
    }
    case "business": {
      const industry = getAnswer(answers, "industry");
      const stage = getAnswer(answers, "stage", "idea");
      const problem = getAnswer(answers, "problem");
      const audience = getAnswer(answers, "audience");
      const model = getAnswer(answers, "model");
      segments.push(`Develop a ${stage}-stage ${model || ""} business concept in **${industry}** that solves: ${problem}.`);
      if (audience) segments.push(`Target customer: ${audience}.`);
      break;
    }
    case "other": {
      const description = getAnswer(answers, "description");
      const format = getAnswer(answers, "format", "text");
      const tone = getAnswer(answers, "tone");
      segments.push(`${description}`);
      if (format) segments.push(`Output format: ${format}.`);
      if (tone) segments.push(`Tone: ${tone}.`);
      break;
    }
  }

  return segments.join("\n\n").trim();
}

/** Build PROFESSIONAL prompt — structured, detailed, role-aware. */
export function buildProfessionalPrompt(
  taskType: TaskType,
  platform: AIPlatform,
  answers: Record<string, any>
): string {
  const platformName = AI_PLATFORMS.find((p) => p.id === platform)?.label ?? platform;
  const hint = PLATFORM_HINTS[platform];
  const basic = buildBasicPrompt(taskType, platform, answers);
  const taskLabel = TASK_TYPES.find((t) => t.id === taskType)?.label ?? taskType;

  const lines: string[] = [];
  lines.push(`# ${platformName} Prompt — Professional`);
  lines.push(`## Task: ${taskLabel}`);
  lines.push(`> ${hint}`);
  lines.push("");
  lines.push("## Role");
  lines.push(`Act as a world-class ${taskType} specialist with deep expertise in crafting for ${platformName}.`);
  lines.push("");
  lines.push("## Context");
  lines.push(basic);
  lines.push("");
  lines.push("## Requirements");
  lines.push(
    [
      `- Deliver **production-ready** output suitable for direct use in ${platformName}.`,
      `- Follow industry best practices and current trends for ${taskType}.`,
      `- Maintain consistent tone, terminology, and structure throughout.`,
      `- Where applicable, include a short rationale explaining your key choices.`,
      `- Anticipate follow-up needs and address them proactively.`,
    ].join("\n")
  );
  lines.push("");
  lines.push("## Output Format");
  lines.push(`- Use clear headings and bullet points.`);
  lines.push(`- Provide the final result first, then optional brief notes.`);
  lines.push(`- If multiple options exist, present them in a comparison table.`);
  lines.push("");
  lines.push("## Constraints");
  lines.push(`- Avoid generic filler phrases ("in today's world", "in conclusion").`);
  lines.push(`- Be specific, concrete, and actionable.`);
  lines.push(`- Optimize for ${platformName}'s native capabilities.`);

  return lines.join("\n").trim();
}

/** Build EXPERT prompt — exhaustive, multi-layered, optimized for maximum quality. */
export function buildExpertPrompt(
  taskType: TaskType,
  platform: AIPlatform,
  answers: Record<string, any>
): string {
  const platformName = AI_PLATFORMS.find((p) => p.id === platform)?.label ?? platform;
  const hint = PLATFORM_HINTS[platform];
  const taskLabel = TASK_TYPES.find((t) => t.id === taskType)?.label ?? taskType;
  const questions = getQuestions(taskType);

  const lines: string[] = [];
  lines.push(`# ${platformName} Prompt — EXPERT TIER`);
  lines.push(`## Mission: ${taskLabel}`);
  lines.push(`> ${hint}`);
  lines.push("");
  lines.push("## 1. Role & Persona");
  lines.push(
    `You are a **principal-level ${taskType} strategist** with 15+ years of hands-on experience delivering world-class work for ${platformName}. You combine deep domain knowledge with platform-specific optimization. You think in systems, edge cases, and measurable outcomes.`
  );
  lines.push("");
  lines.push("## 2. Thinking Protocol");
  lines.push(
    [
      `Before producing output, perform the following internal analysis:`,
      `1. Restate the goal in your own words to confirm understanding.`,
      `2. Identify the 3 highest-leverage levers that drive quality for this task.`,
      `3. List assumptions and how to mitigate each.`,
      `4. Plan structure, then write.`,
    ].join("\n")
  );
  lines.push("");
  lines.push("## 3. Inputs");
  for (const q of questions) {
    const v = Array.isArray(answers[q.id]) ? (answers[q.id] as any[]).join(", ") : answers[q.id];
    if (v !== undefined && v !== "") {
      lines.push(`- **${q.label}**: ${v}`);
    }
  }
  lines.push("");
  lines.push("## 4. Deliverables");
  lines.push(
    [
      `Produce output that is:`,
      `- **Specific**: No filler, no generic phrases. Every sentence adds value.`,
      `- **Structured**: Use headings, bullets, tables, or code blocks as appropriate.`,
      `- **Optimized**: Tuned for ${platformName}'s rendering, parsing, and tone.`,
      `- **Defensive**: Address edge cases, failure modes, and follow-up needs.`,
    ].join("\n")
  );
  lines.push("");
  lines.push("## 5. Output Structure");
  lines.push(
    [
      `1. **Executive summary** — 2–3 sentences distilling the answer.`,
      `2. **Main deliverable** — the core output, fully formed and ready to ship.`,
      `3. **Quality bar checklist** — confirm each requirement was met.`,
      `4. **Optional enhancements** — 1–3 ideas to push the work further if needed.`,
    ].join("\n")
  );
  lines.push("");
  lines.push("## 6. Anti-patterns to Avoid");
  lines.push(
    [
      `- Generic openings ("Certainly!", "Here is…").`,
      `- Unsupported claims or vague recommendations.`,
      `- Ignoring platform-specific constraints.`,
      `- Skipping edge cases and error handling.`,
      `- Over-explaining trivial decisions while omitting key ones.`,
    ].join("\n")
  );
  lines.push("");
  lines.push("## 7. Acceptance Criteria");
  lines.push(
    `The output is acceptable ONLY if a senior reviewer can copy-paste it into ${platformName} and ship it without further edits.`
  );

  return lines.join("\n").trim();
}

export function generatePrompts(
  taskType: TaskType,
  platform: AIPlatform,
  answers: Record<string, any>
): { basic: string; professional: string; expert: string } {
  return {
    basic: buildBasicPrompt(taskType, platform, answers),
    professional: buildProfessionalPrompt(taskType, platform, answers),
    expert: buildExpertPrompt(taskType, platform, answers),
  };
}

/** "Improve" — adds further enhancement instructions to an existing prompt. */
export function improvePrompt(prompt: string, platform: AIPlatform): string {
  return `${prompt}\n\n---\n\n## Enhancement Layer\n- Tighten every sentence for maximum signal density.\n- Add a one-line metric or measurable outcome where possible.\n- Surface 2 concrete next steps the user can take immediately.\n- Re-check platform-specific best practices for ${platform}.\n- Output the improved version below, then a 3-bullet changelog.`;
}

/** Translate between English ↔ Arabic — we add explicit cues. */
export function translatePrompt(prompt: string, targetLang: "en" | "ar"): string {
  const langName = targetLang === "ar" ? "Arabic" : "English";
  return `${prompt}\n\n---\n\n## Translation Step\nTranslate the final output above into fluent ${langName}. Preserve technical terms in English (e.g. API names). Keep formatting (headings, bullets, code) intact. Output ONLY the translated text.`;
}

/** Mock delay to simulate streaming — gives a real "AI thinking" feel. */
export function simulateGenerationDelay(level: PromptLevel): number {
  const base = { basic: 600, professional: 1200, expert: 1800 }[level];
  return base + Math.random() * 400;
}