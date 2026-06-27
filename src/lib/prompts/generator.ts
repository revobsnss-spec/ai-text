import type { TaskType, AIPlatform, Question, PromptLevel } from "@/types";
import { TASK_TYPES, AI_PLATFORMS, getQuestions } from "./tasks";

const PLATFORM_HINTS: Record<AIPlatform, string> = {
  chatgpt: "محسّن لـ ChatGPT (GPT-4o / GPT-5). استخدم أقساماً واضحة، تحديد دور، وقيوداً صريحة.",
  gemini: "محسّن لـ Google Gemini. ركّز على الإشارات متعددة الوسائط، Markdown منظّم، والاستدلال المُؤسَّس.",
  claude: "محسّن لـ Anthropic Claude. استخدم وسوم XML للتنظيم وتعليمات استدلال صريحة.",
  midjourney: "محسّن لـ Midjourney v6+. استخدم `--ar`، `--v 6`، `--style raw`، وواصفات مختصرة بفواصل.",
  "gpt-image": "محسّن لـ OpenAI GPT Image. صف المواضيع بلغة طبيعية مع إشارات أسلوبية قوية.",
  flux: "محسّن لـ Flux (Black Forest Labs). استخدم لغة دقيقة وصفية؛ Flux يتعامل جيداً مع البرومبتات الطبيعية.",
  veo: "محسّن لـ Google Veo. ادمج المشهد والحركة واللغة السينمائية مع إشارات توقيت صريحة.",
  kling: "محسّن لـ Kling AI. استخدم تسلسل المشهد + الكاميرا + الحركة بوضوح؛ حدد الوضع الواقعي أو الأسلوبي.",
  runway: "محسّن لـ Runway Gen-3/4. استخدم لغة سينمائية، أفعال حركة، وإشارات تكوين اللقطة.",
  leonardo: "محسّن لـ Leonardo AI. ادمج البرومبتات السلبية واختر إعدادات النموذج المسبقة.",
};

function getAnswer(answers: Record<string, any>, id: string, fallback = ""): string {
  const v = answers[id];
  if (Array.isArray(v)) return v.join(", ");
  if (v === undefined || v === null || v === "") return fallback;
  return String(v);
}

function joinLabels(answers: Record<string, any>, id: string): string {
  const v = answers[id];
  if (Array.isArray(v)) return v.join("، ");
  if (!v) return "";
  return String(v);
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
  segments.push(`# برومبت ${platformName} — أساسي`);
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
      segments.push(`أنشئ صورة لـ **${subject}**.`);
      segments.push(`الأسلوب: ${style}. الإضاءة: ${lighting}. المزاج: ${mood}.`);
      if (colors) segments.push(`لوحة الألوان: ${colors}.`);
      segments.push(`الكاميرا: ${camera}. نسبة العرض: ${aspect}. الجودة: ${quality}.`);
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
      segments.push(`أنشئ فيديو مدته ${duration}: ${scene}`);
      segments.push(`الكاميرا: ${camera}. الإضاءة: ${lighting}. الموسيقى: ${music}.`);
      if (voiceover) segments.push(`التعليق الصوتي: ${voiceover}.`);
      if (effects) segments.push(`المؤثرات: ${effects}.`);
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
      segments.push(`صمم موقعاً ${uiStyle} لمجال **${industry}** يستهدف ${audience || "المستخدمين عموماً"}.`);
      if (pages) segments.push(`الصفحات: ${pages}.`);
      if (features) segments.push(`الميزات: ${features}.`);
      if (colors) segments.push(`نظام الألوان: ${colors}.`);
      segments.push(`الحركات: ${animations}. الأداء: ${performance}.`);
      break;
    }
    case "app": {
      const name = getAnswer(answers, "name");
      const platforms = joinLabels(answers, "platform");
      const features = joinLabels(answers, "features");
      const audience = getAnswer(answers, "audience");
      const design = getAnswer(answers, "design", "modern");
      segments.push(`خطّط لتطبيق **${name}** لـ ${platforms || "الجوال"} يستهدف ${audience || "المستخدمين عموماً"}.`);
      segments.push(`أسلوب التصميم: ${design}.`);
      if (features) segments.push(`الميزات الأساسية: ${features}.`);
      break;
    }
    case "logo": {
      const brand = getAnswer(answers, "brand");
      const industry = getAnswer(answers, "industry");
      const style = getAnswer(answers, "style", "minimal");
      const mood = joinLabels(answers, "mood");
      const colors = getAnswer(answers, "colors");
      segments.push(`صمم شعاراً ${style} لـ **${brand}**${industry ? ` (${industry})` : ""}.`);
      if (mood) segments.push(`المزاج: ${mood}.`);
      if (colors) segments.push(`الألوان: ${colors}.`);
      break;
    }
    case "advertisement": {
      const product = getAnswer(answers, "product");
      const medium = getAnswer(answers, "medium", "social");
      const audience = getAnswer(answers, "audience");
      const tone = getAnswer(answers, "tone", "persuasive");
      const offer = getAnswer(answers, "offer");
      segments.push(`اكتب إعلاناً ${tone} لـ **${product}** في ${medium} يستهدف ${audience || "جمهوراً عاماً"}.`);
      if (offer) segments.push(`الخطاف / العرض: ${offer}.`);
      break;
    }
    case "social": {
      const sp = getAnswer(answers, "platform", "instagram");
      const topic = getAnswer(answers, "topic");
      const goal = getAnswer(answers, "goal", "engage");
      const tone = getAnswer(answers, "tone", "casual");
      const cta = getAnswer(answers, "cta");
      segments.push(`اكتب منشوراً ${tone} على ${sp} عن **${topic}** بهدف ${goal}.`);
      if (cta) segments.push(`الدعوة لاتخاذ إجراء: ${cta}.`);
      break;
    }
    case "writing": {
      const format = getAnswer(answers, "format", "article");
      const topic = getAnswer(answers, "topic");
      const tone = getAnswer(answers, "tone", "neutral");
      const audience = getAnswer(answers, "audience");
      const length = getAnswer(answers, "length");
      segments.push(`اكتب ${format} بأسلوب ${tone} عن **${topic}** لـ ${audience || "جمهور عام"}.`);
      if (length) segments.push(`الطول: ${length}.`);
      break;
    }
    case "marketing": {
      const product = getAnswer(answers, "product");
      const strategy = getAnswer(answers, "strategy", "launch");
      const audience = getAnswer(answers, "audience");
      const channels = joinLabels(answers, "channels");
      segments.push(`ابنِ استراتيجية تسويق ${strategy} لـ **${product}** تستهدف ${audience || "جمهوراً عاماً"}.`);
      if (channels) segments.push(`القنوات: ${channels}.`);
      break;
    }
    case "programming": {
      const language = getAnswer(answers, "language", "typescript");
      const framework = getAnswer(answers, "framework");
      const task = getAnswer(answers, "task");
      const db = getAnswer(answers, "database");
      const auth = getAnswer(answers, "auth");
      segments.push(`اكتب كود ${language}${framework ? ` (${framework})` : ""} لـ: **${task}**.`);
      if (db && db !== "none") segments.push(`قاعدة البيانات: ${db}.`);
      if (auth && auth !== "none") segments.push(`المصادقة: ${auth}.`);
      break;
    }
    case "business": {
      const industry = getAnswer(answers, "industry");
      const stage = getAnswer(answers, "stage", "idea");
      const problem = getAnswer(answers, "problem");
      const audience = getAnswer(answers, "audience");
      const model = getAnswer(answers, "model");
      segments.push(`طوّر مفهوم عمل ${model || ""} في مرحلة ${stage} بمجال **${industry}** يحل: ${problem}.`);
      if (audience) segments.push(`العميل المستهدف: ${audience}.`);
      break;
    }
    case "other": {
      const description = getAnswer(answers, "description");
      const format = getAnswer(answers, "format", "text");
      const tone = getAnswer(answers, "tone");
      segments.push(`${description}`);
      if (format) segments.push(`صيغة المخرجات: ${format}.`);
      if (tone) segments.push(`النبرة: ${tone}.`);
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
  lines.push(`# برومبت ${platformName} — احترافي`);
  lines.push(`## المهمة: ${taskLabel}`);
  lines.push(`> ${hint}`);
  lines.push("");
  lines.push("## الدور");
  lines.push(`تصرف كخبير عالمي في ${taskType} مع خبرة عميقة في صياغة المحتوى لـ ${platformName}.`);
  lines.push("");
  lines.push("## السياق");
  lines.push(basic);
  lines.push("");
  lines.push("## المتطلبات");
  lines.push(
    [
      `- قدّم مخرجات **جاهزة للإنتاج** مناسبة للاستخدام المباشر في ${platformName}.`,
      `- اتبع أفضل الممارسات والاتجاهات الحالية لـ ${taskType}.`,
      `- حافظ على نبرة ومصطلحات وبنية متسقة في كل المخرجات.`,
      `- حيث أمكن، أضف تبريراً موجزاً لخياراتك الرئيسية.`,
      `- توقّع احتياجات المتابعة وعالجها استباقياً.`,
    ].join("\n")
  );
  lines.push("");
  lines.push("## صيغة المخرجات");
  lines.push(`- استخدم عناوين ونقاط واضحة.`);
  lines.push(`- اعرض النتيجة النهائية أولاً، ثم ملاحظات موجزة اختيارية.`);
  lines.push(`- لو كانت هناك خيارات متعددة، اعرضها في جدول مقارنة.`);
  lines.push("");
  lines.push("## القيود");
  lines.push(`- تجنب العبارات العامة ("في عالمنا اليوم"، "في الختام").`);
  lines.push(`- كن محدداً وملموساً وقابلاً للتنفيذ.`);
  lines.push(`- حسّن لقدرات ${platformName} الأصلية.`);

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
  lines.push(`# برومبت ${platformName} — مستوى خبير`);
  lines.push(`## المهمة: ${taskLabel}`);
  lines.push(`> ${hint}`);
  lines.push("");
  lines.push("## 1. الدور والشخصية");
  lines.push(
    `أنت **استراتيجي أول في ${taskType}** مع أكثر من 15 سنة من الخبرة العملية في تقديم عمل عالمي المستوى لـ ${platformName}. تجمع بين المعرفة العميقة بالمجال والتحسين الخاص بالمنصة. تفكر بمنظومات وحالات استثنائية ونتائج قابلة للقياس.`
  );
  lines.push("");
  lines.push("## 2. بروتوكول التفكير");
  lines.push(
    [
      `قبل إنتاج المخرجات، قم بالتحليل الداخلي التالي:`,
      `1. أعد صياغة الهدف بكلماتك للتأكد من الفهم.`,
      `2. حدد أعلى 3 روافع تؤثر على الجودة لهذه المهمة.`,
      `3. اذكر الافتراضات وكيف تخفف من كل منها.`,
      `4. خطط للبنية، ثم اكتب.`,
    ].join("\n")
  );
  lines.push("");
  lines.push("## 3. المدخلات");
  for (const q of questions) {
    const v = Array.isArray(answers[q.id]) ? (answers[q.id] as any[]).join("، ") : answers[q.id];
    if (v !== undefined && v !== "") {
      lines.push(`- **${q.label}**: ${v}`);
    }
  }
  lines.push("");
  lines.push("## 4. المخرجات المطلوبة");
  lines.push(
    [
      `قدّم مخرجات:`,
      `- **محددة**: لا حشو، لا عبارات عامة. كل جملة تضيف قيمة.`,
      `- **منظّمة**: استخدم عناوين ونقاط وجداول وكتل كود حسب الحاجة.`,
      `- **محسّنة**: مضبوطة لعرض وتحليل ونبرة ${platformName}.`,
      `- **دفاعية**: عالج الحالات الاستثنائية وأوضاع الفشل واحتياجات المتابعة.`,
    ].join("\n")
  );
  lines.push("");
  lines.push("## 5. بنية المخرجات");
  lines.push(
    [
      `1. **ملخص تنفيذي** — 2-3 جملة تلخص الإجابة.`,
      `2. **المخرج الرئيسي** — المخرج الأساسي، مكتمل وجاهز للشحن.`,
      `3. **قائمة معايير الجودة** — تأكد من تحقيق كل متطلب.`,
      `4. **تحسينات اختيارية** — 1-3 أفكار لدفع العمل أبعد إذا لزم.`,
    ].join("\n")
  );
  lines.push("");
  lines.push("## 6. أنماط يجب تجنبها");
  lines.push(
    [
      `- افتتاحيات عامة ("بالتأكيد!"، "إليك...").`,
      `- ادعاءات غير مدعومة أو توصيات غامضة.`,
      `- تجاهل القيود الخاصة بالمنصة.`,
      `- تخطي الحالات الاستثنائية ومعالجة الأخطاء.`,
      `- الإفراط في شرح قرارات تافهة مع حذف القرارات الرئيسية.`,
    ].join("\n")
  );
  lines.push("");
  lines.push("## 7. معايير القبول");
  lines.push(
    `المخرج مقبول فقط إذا كان مراجع أول يمكن نسخه ولصقه في ${platformName} وشحنه دون تعديلات إضافية.`
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
  return `${prompt}\n\n---\n\n## طبقة التحسين\n- شدّد كل جملة لأقصى كثافة إشارة.\n- أضف سطراً واحداً بمقياس أو نتيجة قابلة للقياس حيث أمكن.\n- اقترح خطوتين ملموستين فوريتين يمكن للمستخدم اتخاذهما.\n- أعد التحقق من أفضل الممارسات الخاصة بـ ${platform}.\n- اكتب النسخة المحسّنة أدناه، ثم سجل تغييرات من 3 نقاط.`;
}

/** Translate between English ↔ Arabic — we add explicit cues. */
export function translatePrompt(prompt: string, targetLang: "en" | "ar"): string {
  const langName = targetLang === "ar" ? "العربية" : "English";
  return `${prompt}\n\n---\n\n## خطوة الترجمة\nترجم المخرج النهائي أعلاه إلى ${langName} بطلاقة. حافظ على المصطلحات التقنية بالإنجليزية (مثل أسماء API). أبقِ التنسيق (العناوين، النقاط، الكود) كما هو. اكتب فقط النص المترجم.`;
}

/** Mock delay to simulate streaming — gives a real "AI thinking" feel. */
export function simulateGenerationDelay(level: PromptLevel): number {
  const base = { basic: 600, professional: 1200, expert: 1800 }[level];
  return base + Math.random() * 400;
}