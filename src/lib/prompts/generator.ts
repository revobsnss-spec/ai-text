import type { TaskType, AIPlatform, PromptLevel } from "@/types";
import { TASK_TYPES, AI_PLATFORMS } from "./tasks";

// ============================================================
// ⚠️ IMPORTANT — design philosophy:
// These functions produce the FINAL, READY-TO-USE prompt that
// the user will copy and paste directly into the target AI tool.
// They do NOT produce meta-instructions ("you are an expert…").
// ============================================================

const PLATFORM_TIPS: Record<AIPlatform, string> = {
  chatgpt: "💡 محسّن لـ ChatGPT — يمكنك إضافة '--style raw' أو أي توجيهات إضافية.",
  gemini: "💡 محسّن لـ Gemini — يفهم التعليمات الطبيعية متعدد الوسائط.",
  claude: "💡 محسّن لـ Claude — استجب بلغة طبيعية مع تنسيق Markdown.",
  midjourney: "💡 محسّن لـ Midjourney — أضف البادئات في النهاية: --ar 1:1 --v 6 --style raw.",
  "gpt-image": "💡 محسّن لـ GPT Image — يفهم اللغة الطبيعية المفصّلة.",
  flux: "💡 محسّن لـ Flux — يفهم البرومبتات الطبيعية الطويلة.",
  veo: "💡 محسّن لـ Google Veo — اجمع بين وصف المشهد والحركة واللغة السينمائية.",
  kling: "💡 محسّن لـ Kling — استخدم التسلسل: مشهد → كاميرا → حركة.",
  runway: "💡 محسّن لـ Runway — استخدم لغة سينمائية وأفعال حركة.",
  leonardo: "💡 محسّن لـ Leonardo — يمكنك إضافة البرومبت السلبي عند الحاجة.",
};

const STYLE_AR: Record<string, string> = {
  realistic: "واقعي تصويري فائق الجودة",
  cinematic: "سينمائي بإضاءة درامية",
  anime: "بأسلوب أنمي ياباني",
  "3d": "رندر ثلاثي الأبعاد (3D Render)",
  illustration: "رسم توضيحي رقمي",
  "oil-painting": "لوحة زيتية كلاسيكية",
  watercolor: "ألوان مائية ناعمة",
  "pixel-art": "فن البكسل retro",
  cyberpunk: "سايبربانك مع نيون",
  minimalist: "بسيط ونظيف (minimal)",
};

const LIGHTING_AR: Record<string, string> = {
  natural: "إضاءة طبيعية ناعمة",
  "golden-hour": "إضاءة الساعة الذهبية الدافئة",
  studio: "إضاءة استوديو احترافية",
  neon: "إضاءة نيون ملونة (وردي، أزرق، بنفسجي)",
  dramatic: "إضاءة درامية بظلال قوية (chiaroscuro)",
  soft: "إضاءة ناعمة منتشرة",
  backlit: "إضاءة خلفية (silhouette)",
};

const MOOD_AR: Record<string, string> = {
  calm: "هادئ ومسالم",
  epic: "ملحمي وقوي",
  mysterious: "غامض ومثير",
  joyful: "مبتهج ونابض بالحياة",
  dark: "مظلم وكئيب",
  dreamy: "حالم وأثيري",
  energetic: "نشيط وديناميكي",
};

const CAMERA_AR: Record<string, string> = {
  "eye-level": "مستوى العين",
  "low-angle": "من زاوية منخفضة (drama)",
  "high-angle": "من زاوية عالية",
  aerial: "جوية / درون من فوق",
  "close-up": "قريبة جداً (ماكرو)",
  "wide-shot": "لقطة واسعة",
};

const ASPECT_AR: Record<string, string> = {
  "1:1": "1:1 مربع",
  "16:9": "16:9 عرض سينمائي",
  "9:16": "9:16 عمودي (Story, Reels)",
  "4:3": "4:3 كلاسيكي",
  "21:9": "21:9 عريض جداً (cinematic)",
};

const QUALITY_AR: Record<string, string> = {
  draft: "جودة مسودة للمفاهيم",
  high: "جودة عالية",
  ultra: "جودة فائقة 8K مع تفاصيل دقيقة",
};

function pick<T>(map: Record<string, T>, key: string | undefined, fallback: T): T {
  if (!key) return fallback;
  return map[key] ?? fallback;
}

function getAnswer(answers: Record<string, any>, id: string, fallback = ""): string {
  const v = answers[id];
  if (Array.isArray(v)) return v.join(", ");
  if (v === undefined || v === null || v === "") return fallback;
  return String(v);
}

function joinList(answers: Record<string, any>, id: string): string {
  const v = answers[id];
  if (Array.isArray(v)) return v.join("، ");
  if (!v) return "";
  return String(v);
}

// ============================================================
// 🖼️  IMAGE GENERATION
// ============================================================

function imageBasic(answers: Record<string, any>): string {
  const subject = getAnswer(answers, "subject");
  const style = pick(STYLE_AR, getAnswer(answers, "style"), "واقعي تصويري");
  const lighting = pick(LIGHTING_AR, getAnswer(answers, "lighting"), "إضاءة طبيعية");
  const mood = pick(MOOD_AR, getAnswer(answers, "mood"), "هادئ");
  const colors = getAnswer(answers, "colors");
  const aspect = pick(ASPECT_AR, getAnswer(answers, "aspect"), "16:9");
  const quality = pick(QUALITY_AR, getAnswer(answers, "quality"), "جودة عالية");

  let p = `${subject}، بأسلوب ${style}، ${lighting}، بمزاج ${mood}`;
  if (colors) p += `، لوحة ألوان ${colors}`;
  p += `، ${aspect}، ${quality}.`;

  return p;
}

function imageProfessional(answers: Record<string, any>): string {
  const subject = getAnswer(answers, "subject");
  const style = pick(STYLE_AR, getAnswer(answers, "style"), "واقعي تصويري");
  const lighting = pick(LIGHTING_AR, getAnswer(answers, "lighting"), "إضاءة طبيعية");
  const mood = pick(MOOD_AR, getAnswer(answers, "mood"), "هادئ");
  const colors = getAnswer(answers, "colors");
  const camera = pick(CAMERA_AR, getAnswer(answers, "camera"), "مستوى العين");
  const aspect = pick(ASPECT_AR, getAnswer(answers, "aspect"), "16:9");
  const quality = pick(QUALITY_AR, getAnswer(answers, "quality"), "جودة عالية");

  let p = `أنشئ صورة احترافية لـ: **${subject}**.\n\n`;
  p += `**الأسلوب البصري**: ${style}.\n`;
  p += `**الإضاءة**: ${lighting}.\n`;
  p += `**المزاج العام**: ${mood}.\n`;
  if (colors) p += `**لوحة الألوان**: ${colors}.\n`;
  p += `**زاوية الكاميرا**: ${camera}.\n`;
  p += `**نسبة العرض**: ${aspect}.\n`;
  p += `**الجودة**: ${quality}.\n\n`;
  p += `اجعل الصورة تبدو كأنها التقطت بواسطة مصور محترف، مع اهتمام خاص بالتفاصيل الدقيقة والملمس والإضاءة الواقعية.`;
  return p;
}

function imageExpert(answers: Record<string, any>): string {
  const subject = getAnswer(answers, "subject");
  const style = pick(STYLE_AR, getAnswer(answers, "style"), "واقعي تصويري فائق الجودة");
  const lighting = pick(LIGHTING_AR, getAnswer(answers, "lighting"), "إضاءة استوديو احترافية");
  const mood = pick(MOOD_AR, getAnswer(answers, "mood"), "ملحمي وقوي");
  const colors = getAnswer(answers, "colors");
  const camera = pick(CAMERA_AR, getAnswer(answers, "camera"), "مستوى العين");
  const aspect = pick(ASPECT_AR, getAnswer(answers, "aspect"), "16:9");
  const quality = pick(QUALITY_AR, getAnswer(answers, "quality"), "جودة فائقة 8K");

  const platform = getAnswer(answers, "_platform", "");

  let p = `أنشئ صورة فوتوغرافية احترافية عالمية المستوى.\n\n`;
  p += `## الموضوع\n${subject}.\n\n`;
  p += `## المواصفات الفنية\n`;
  p += `- **الأسلوب البصري**: ${style}\n`;
  p += `- **نوع الكاميرا**: تصوير بكاميرا رقمية احترافية (medium format أو full-frame)\n`;
  p += `- **العدسة**: 85mm f/1.4 (بورتريه) أو 35mm f/1.4 (مناظر طبيعية)\n`;
  p += `- **الإضاءة**: ${lighting}\n`;
  p += `- **زاوية الكاميرا**: ${camera}\n`;
  p += `- **المزاج**: ${mood}\n`;
  p += `- **الجودة**: ${quality}\n`;
  p += `- **نسبة العرض**: ${aspect}\n`;
  if (colors) p += `- **لوحة الألوان**: ${colors}\n`;
  p += `\n## إعدادات الكاميرا المقترحة\n`;
  p += `- فتحة العدسة: f/1.4 - f/2.8 (للحصول على بوكيه ناعم)\n`;
  p += `- ISO: 100-400 (للحصول على ضوضاء منخفضة)\n`;
  p += `- سرعة الغالق: 1/125s - 1/250s\n`;
  p += `- توازن اللون الأبيض: مخصص للمشهد\n`;
  p += `\n## تعليمات إضافية\n`;
  p += `- ركّز على التركيب (composition) والقاعدة الذهبية\n`;
  p += `- التقط التفاصيل الدقيقة (الملمس، البشرة، المواد)\n`;
  p += `- استخدم الإضاءة لخلق عمق وبعد ثلاثي الأبعاد\n`;
  p += `- اجعل الصورة تبدو طبيعية وغير مُعدَّلة بشكل مبالغ فيه\n`;
  p += `- أضف عمق ميدان (depth of field) مناسب للموضوع\n`;
  if (platform === "midjourney") {
    p += `\n## وسائط Midjourney\n--ar ${getAnswer(answers, "aspect", "16:9")} --v 6 --style raw --q 2`;
  }
  return p;
}

// ============================================================
// 🎬  VIDEO GENERATION
// ============================================================

function videoBasic(answers: Record<string, any>): string {
  const scene = getAnswer(answers, "scene");
  const duration = getAnswer(answers, "duration", "8s");
  const camera = getAnswer(answers, "camera", "smooth-pan");
  const music = getAnswer(answers, "music", "cinematic");

  return `فيديو مدته ${duration}: ${scene}. حركة الكاميرا: ${camera}. موسيقى: ${music}.`;
}

function videoProfessional(answers: Record<string, any>): string {
  const scene = getAnswer(answers, "scene");
  const duration = getAnswer(answers, "duration", "8s");
  const camera = getAnswer(answers, "camera", "smooth-pan");
  const lighting = getAnswer(answers, "lighting", "natural");
  const voiceover = getAnswer(answers, "voiceover");
  const music = getAnswer(answers, "music", "cinematic");
  const effects = getAnswer(answers, "effects");

  let p = `أنشئ فيديو احترافي بالمواصفات التالية:\n\n`;
  p += `**المشهد**: ${scene}\n`;
  p += `**المدة**: ${duration}\n`;
  p += `**حركة الكاميرا**: ${camera}\n`;
  p += `**الإضاءة**: ${lighting}\n`;
  p += `**الموسيقى**: ${music}\n`;
  if (voiceover) p += `**التعليق الصوتي**: ${voiceover}\n`;
  if (effects) p += `**المؤثرات الخاصة**: ${effects}\n\n`;
  p += `اجعل الفيديو يبدو كإنتاج احترافي مع انتقالات سلسة وإيقاع بصري مميز.`;
  return p;
}

function videoExpert(answers: Record<string, any>): string {
  const scene = getAnswer(answers, "scene");
  const duration = getAnswer(answers, "duration", "8s");
  const camera = getAnswer(answers, "camera", "smooth-pan");
  const lighting = getAnswer(answers, "lighting", "natural");
  const voiceover = getAnswer(answers, "voiceover");
  const music = getAnswer(answers, "music", "cinematic");
  const effects = getAnswer(answers, "effects");

  let p = `أنشئ فيديو سينمائي عالي الجودة بالمواصفات التالية:\n\n`;
  p += `## وصف المشهد\n${scene}\n\n`;
  p += `## المواصفات التقنية\n`;
  p += `- **الدقة**: 4K (3840×2160) أو 1080p\n`;
  p += `- **معدل الإطارات**: 24fps (سينمائي) أو 30fps\n`;
  p += `- **المدة**: ${duration}\n`;
  p += `- **حركة الكاميرا**: ${camera}\n`;
  p += `- **الإضاءة**: ${lighting}\n`;
  if (effects) p += `- **المؤثرات**: ${effects}\n`;
  p += `\n## الصوت\n`;
  p += `- **الموسيقى**: ${music}\n`;
  if (voiceover) p += `- **التعليق الصوتي**: ${voiceover}\n`;
  p += `\n## الأسلوب السينمائي\n`;
  p += `- ابدأ بلقطة تأسيسية (establishing shot)\n`;
  p += `- استخدم قانون الأثلاث في التركيب\n`;
  p += `- انتقالات سلسة (cuts, dissolves)\n`;
  p += `- ركّز على سرد القصص البصرية\n`;
  p += `- اختم بلقطة قوية لا تُنسى`;
  return p;
}

// ============================================================
// 🌐  WEBSITE
// ============================================================

function websiteBasic(answers: Record<string, any>): string {
  const industry = getAnswer(answers, "industry");
  const uiStyle = getAnswer(answers, "ui-style", "modern");
  const pages = joinList(answers, "pages");
  const features = joinList(answers, "features");
  const colors = getAnswer(answers, "colors");

  let p = `صمم موقعاً إلكترونياً احترافياً لمجال **${industry}** بأسلوب ${uiStyle}.\n\n`;
  if (pages) p += `**الصفحات المطلوبة**: ${pages}.\n`;
  if (features) p += `**الميزات**: ${features}.\n`;
  if (colors) p += `**الألوان**: ${colors}.`;
  return p;
}

function websiteProfessional(answers: Record<string, any>): string {
  const industry = getAnswer(answers, "industry");
  const uiStyle = getAnswer(answers, "ui-style", "modern");
  const pages = joinList(answers, "pages");
  const features = joinList(answers, "features");
  const audience = getAnswer(answers, "audience");
  const colors = getAnswer(answers, "colors");
  const animations = getAnswer(answers, "animations", "smooth");

  let p = `صمم موقعاً إلكترونياً احترافياً وحديثاً.\n\n`;
  p += `**المجال**: ${industry}\n`;
  p += `**الجمهور المستهدف**: ${audience || "عام"}\n`;
  p += `**أسلوب التصميم**: ${uiStyle}\n`;
  if (colors) p += `**لوحة الألوان**: ${colors}\n`;
  if (pages) p += `**الصفحات**: ${pages}\n`;
  if (features) p += `**الميزات**: ${features}\n`;
  p += `**مستوى الحركات**: ${animations}\n\n`;
  p += `قدم الكود كاملاً بـ HTML + Tailwind CSS، مع:\n`;
  p += `- تصميم متجاوب 100% (موبايل، تابلت، ديسكتوب)\n`;
  p += `- أداء عالي (Lighthouse 90+)\n`;
  p += `- SEO محسّن\n`;
  p += `- إمكانية وصول (accessibility) كاملة`;
  return p;
}

function websiteExpert(answers: Record<string, any>): string {
  const industry = getAnswer(answers, "industry");
  const uiStyle = getAnswer(answers, "ui-style", "modern");
  const pages = joinList(answers, "pages");
  const features = joinList(answers, "features");
  const audience = getAnswer(answers, "audience");
  const colors = getAnswer(answers, "colors");
  const animations = getAnswer(answers, "animations", "smooth");
  const performance = getAnswer(answers, "performance", "fast");

  let p = `صمم موقعاً إلكترونياً على مستوى عالمي لشركات الفئة A.\n\n`;
  p += `## المتطلبات\n`;
  p += `- **المجال**: ${industry}\n`;
  p += `- **الجمهور المستهدف**: ${audience || "عام"}\n`;
  p += `- **أسلوب التصميم**: ${uiStyle} بأسلوب Apple/Stripe/Linear\n`;
  if (colors) p += `- **نظام الألوان**: ${colors} (متناسق مع الهوية البصرية)\n`;
  if (pages) p += `- **الصفحات**: ${pages}\n`;
  if (features) p += `- **الميزات الوظيفية**: ${features}\n`;
  p += `\n## معايير الأداء\n`;
  p += `- **هدف الأداء**: ${performance}\n`;
  p += `- Lighthouse Score: 95+ في كل الفئات\n`;
  p += `- First Contentful Paint: < 1.5s\n`;
  p += `- Time to Interactive: < 3s\n`;
  p += `\n## المتطلبات التقنية\n`;
  p += `- HTML5 دلالي (semantic) + CSS3 + JavaScript حديث\n`;
  p += `- Tailwind CSS للأسلوب\n`;
  p += `- تصميم Mobile-First مع breakpoints احترافية\n`;
  p += `- **مستوى الحركات**: ${animations} (Framer Motion)\n`;
  p += `- صور محسّنة (WebP/AVIF) مع lazy loading\n`;
  p += `- SEO كامل (meta tags, structured data, sitemap)\n`;
  p += `- WCAG 2.1 AA accessibility\n`;
  p += `\n## المخرجات\nقدم:\n`;
  p += `1. هيكل HTML كامل ومنظَّم\n`;
  p += `2. CSS/Tailwind لكل مكون\n`;
  p += `3. JavaScript للتفاعلات\n`;
  p += `4. قائمة بأفضل الممارسات المطبقة`;
  return p;
}

// ============================================================
// 📱  APP
// ============================================================

function appBasic(answers: Record<string, any>): string {
  const name = getAnswer(answers, "name");
  const platforms = joinList(answers, "platform");
  const features = joinList(answers, "features");
  const audience = getAnswer(answers, "audience");
  const design = getAnswer(answers, "design", "modern");

  let p = `صمم تطبيق **${name}** لمنصة ${platforms || "جوال"}، يستهدف ${audience || "مستخدمين عامين"}، بأسلوب تصميم ${design}.\n`;
  if (features) p += `الميزات الأساسية: ${features}.`;
  return p;
}

function appProfessional(answers: Record<string, any>): string {
  const name = getAnswer(answers, "name");
  const platforms = joinList(answers, "platform");
  const features = joinList(answers, "features");
  const audience = getAnswer(answers, "audience");
  const design = getAnswer(answers, "design", "modern");

  let p = `خطّط لتطبيق جوال/ويب احترافي.\n\n`;
  p += `**اسم التطبيق**: ${name}\n`;
  p += `**المنصات**: ${platforms || "متعدد"}\n`;
  p += `**الجمهور المستهدف**: ${audience || "عام"}\n`;
  p += `**أسلوب التصميم**: ${design}\n`;
  if (features) p += `**الميزات الأساسية**: ${features}\n\n`;
  p += `قدم:\n`;
  p += `- خريطة تدفق المستخدم (User Flow)\n`;
  p += `- هيكل التنقل (Navigation structure)\n`;
  p += `- قائمة الشاشات الرئيسية\n`;
  p += `- استراتيجية التطوير المقترحة`;
  return p;
}

function appExpert(answers: Record<string, any>): string {
  const name = getAnswer(answers, "name");
  const platforms = joinList(answers, "platform");
  const features = joinList(answers, "features");
  const audience = getAnswer(answers, "audience");
  const design = getAnswer(answers, "design", "modern");

  let p = `صمم تطبيقاً على مستوى عالمي ينافس أفضل التطبيقات في فئته.\n\n`;
  p += `## نظرة عامة\n- **الاسم**: ${name}\n`;
  p += `- **المنصات**: ${platforms || "متعدد"}\n`;
  p += `- **الجمهور**: ${audience || "عام"}\n`;
  p += `- **أسلوب التصميم**: ${design} (بأسلوب Linear/Notion/Headspace)\n`;
  if (features) p += `- **الميزات**: ${features}\n`;
  p += `\n## هيكل التطبيق\n`;
  p += `1. **شاشات Onboarding** (3 شاشات تعريفية)\n`;
  p += `2. **الشاشة الرئيسية** (Dashboard)\n`;
  p += `3. **الشاشات الأساسية** (حسب الميزات)\n`;
  p += `4. **الإعدادات**\n`;
  p += `5. **الملف الشخصي**\n`;
  p += `\n## متطلبات UX/UI\n`;
  p += `- ميكرو-إنتراكشنز على كل إجراء\n`;
  p += `- حالات فارغة (Empty States) جذابة\n`;
  p += `- Skeleton loading أثناء التحميل\n`;
  p += `- رسائل خطأ ودودة\n`;
  p += `- Dark/Light mode كامل\n`;
  p += `\n## معايير تقنية\n`;
  p += `- أداء ممتاز (60fps scrolling)\n`;
  p += `- يعمل offline (مع sync)\n`;
  p += `- Push notifications ذكية\n`;
  p += `- أمان على مستوى enterprise`;
  return p;
}

// ============================================================
// ✨  LOGO
// ============================================================

function logoBasic(answers: Record<string, any>): string {
  const brand = getAnswer(answers, "brand");
  const industry = getAnswer(answers, "industry");
  const style = getAnswer(answers, "style", "minimal");
  const mood = joinList(answers, "mood");
  const colors = getAnswer(answers, "colors");

  let p = `صمم شعاراً بستايل ${style} لعلامة **${brand}**${industry ? ` في مجال ${industry}` : ""}.`;
  if (mood) p += ` إحساس: ${mood}.`;
  if (colors) p += ` ألوان: ${colors}.`;
  p += ` الشعار يجب أن يكون بسيطاً، لا يُنسى، ويعمل في كل الأحجام.`;
  return p;
}

function logoProfessional(answers: Record<string, any>): string {
  const brand = getAnswer(answers, "brand");
  const industry = getAnswer(answers, "industry");
  const style = getAnswer(answers, "style", "minimal");
  const mood = joinList(answers, "mood");
  const colors = getAnswer(answers, "colors");

  let p = `صمم شعاراً احترافياً قوي الماركة.\n\n`;
  p += `**اسم العلامة**: ${brand}\n`;
  if (industry) p += `**المجال**: ${industry}\n`;
  p += `**أسلوب الشعار**: ${style}\n`;
  if (mood) p += `**الشخصية**: ${mood}\n`;
  if (colors) p += `**الألوان**: ${colors}\n\n`;
  p += `قدم:\n`;
  p += `- شعار رئيسي (Primary)\n`;
  p += `- نسخة مبسطة (Favicon)\n`;
  p += `- لوحة الألوان مع الأكواد (HEX)\n`;
  p += `- المساحات الآمنة (Clear space)\n`;
  p += `- الاستخدامات المختلفة (أبيض، أسود، ملون)`;
  return p;
}

function logoExpert(answers: Record<string, any>): string {
  const brand = getAnswer(answers, "brand");
  const industry = getAnswer(answers, "industry");
  const style = getAnswer(answers, "style", "minimal");
  const mood = joinList(answers, "mood");
  const colors = getAnswer(answers, "colors");

  let p = `صمم نظام هوية بصرية كامل لعلامة تجارية احترافية.\n\n`;
  p += `## معلومات العلامة\n- **الاسم**: ${brand}\n`;
  if (industry) p += `- **المجال**: ${industry}\n`;
  p += `- **أسلوب الشعار**: ${style} (مستوحى من أفضل الماركات العالمية)\n`;
  if (mood) p += `- **الشخصية**: ${mood}\n`;
  if (colors) p += `- **الألوان**: ${colors}\n`;
  p += `\n## المخرجات المطلوبة\n`;
  p += `### الشعار\n`;
  p += `- نسخة كاملة (Full lockup)\n`;
  p += `- نسخة مختصرة (Brand mark)\n`;
  p += `- Favicon (مقاسات 16، 32، 48)\n`;
  p += `- نسخة بالأبيض والأسود\n`;
  p += `- نسخة عكسية (Dark mode)\n`;
  p += `\n### نظام الألوان\n`;
  p += `- لون رئيسي + ثانوي + مميز\n`;
  p += `- أكواد HEX، RGB، CMYK\n`;
  p += `\n### الخطوط المقترحة\n`;
  p += `- خط العلامة (Display)\n`;
  p += `- خط النصوص (Body)\n`;
  p += `\n### دليل الاستخدام\n`;
  p += `- المساحات الآمنة\n`;
  p += `- الحد الأدنى للحجم\n`;
  p += `- الاستخدامات الخاطئة (Do's & Don'ts)`;
  return p;
}

// ============================================================
// 📢  ADVERTISEMENT
// ============================================================

function adBasic(answers: Record<string, any>): string {
  const product = getAnswer(answers, "product");
  const medium = getAnswer(answers, "medium", "social");
  const audience = getAnswer(answers, "audience");
  const tone = getAnswer(answers, "tone", "persuasive");
  const offer = getAnswer(answers, "offer");

  let p = `اكتب نصاً إعلانياً ${tone} لـ **${product}** في ${medium} يستهدف ${audience || "جمهوراً عاماً"}.`;
  if (offer) p += `\n\nالخطاف / العرض: ${offer}.`;
  return p;
}

function adProfessional(answers: Record<string, any>): string {
  const product = getAnswer(answers, "product");
  const medium = getAnswer(answers, "medium", "social");
  const audience = getAnswer(answers, "audience");
  const tone = getAnswer(answers, "tone", "persuasive");
  const offer = getAnswer(answers, "offer");

  let p = `اكتب إعلاناً احترافياً يحقق النتائج.\n\n`;
  p += `**المنتج/الخدمة**: ${product}\n`;
  p += `**الوسيط**: ${medium}\n`;
  p += `**الجمهور المستهدف**: ${audience || "عام"}\n`;
  p += `**النبرة**: ${tone}\n`;
  if (offer) p += `**العرض**: ${offer}\n`;
  p += `\nقدم:\n`;
  p += `- **Hook (أول 3 ثوانٍ)**: جملة تجذب الانتباه فوراً\n`;
  p += `- **Body**: شرح القيمة المضافة\n`;
  p += `- **CTA (دعوة لاتخاذ إجراء)**: واضحة ومحددة\n`;
  p += `- **3 نسخ مختلفة** لاختبار A/B`;
  return p;
}

function adExpert(answers: Record<string, any>): string {
  const product = getAnswer(answers, "product");
  const medium = getAnswer(answers, "medium", "social");
  const audience = getAnswer(answers, "audience");
  const tone = getAnswer(answers, "tone", "persuasive");
  const offer = getAnswer(answers, "offer");

  let p = `أنشئ حملة إعلانية متكاملة تحقق ROI عالٍ.\n\n`;
  p += `## الاستراتيجية\n`;
  p += `- **المنتج**: ${product}\n`;
  p += `- **الوسيط**: ${medium}\n`;
  p += `- **الجمهور**: ${audience || "عام"}\n`;
  p += `- **النبرة**: ${tone}\n`;
  if (offer) p += `- **العرض**: ${offer}\n`;
  p += `\n## الاستراتيجية الإبداعية\n`;
  p += `- **Hook (3 ثوانٍ)**: جملة صادمة أو سؤال مثير\n`;
  p += `- **Problem**: ألم العميل\n`;
  p += `- **Solution**: كيف يحل منتجك المشكلة\n`;
  p += `- **Proof**: دليل اجتماعي أو أرقام\n`;
  p += `- **CTA**: واحد واضح لا لبس فيه\n`;
  p += `\n## المخرجات\n`;
  p += `### نسخة 1: عاطفية\n`;
  p += `### نسخة 2: عقلانية\n`;
  p += `### نسخة 3: عاجلة (FOMO)\n`;
  p += `\n## توصيات\n`;
  p += `- الجمهور البارد: ركّز على المشكلة\n`;
  p += `- الجمهور الدافئ: ركّز على الحل\n`;
  p += `- الجمهور الساخن: اذكر العرض مباشرة`;
  return p;
}

// ============================================================
// 📱  SOCIAL MEDIA POST
// ============================================================

function socialBasic(answers: Record<string, any>): string {
  const platform = getAnswer(answers, "platform", "instagram");
  const topic = getAnswer(answers, "topic");
  const goal = getAnswer(answers, "goal", "engage");
  const tone = getAnswer(answers, "tone", "casual");
  const cta = getAnswer(answers, "cta");

  let p = `اكتب منشوراً ${tone} على ${platform} عن **${topic}** بهدف ${goal}.`;
  if (cta) p += ` في النهاية: ${cta}.`;
  p += `\n\nاجعله قصيراً، جذاباً، ومناسباً لطبيعة المنصة.`;
  return p;
}

function socialProfessional(answers: Record<string, any>): string {
  const platform = getAnswer(answers, "platform", "instagram");
  const topic = getAnswer(answers, "topic");
  const goal = getAnswer(answers, "goal", "engage");
  const tone = getAnswer(answers, "tone", "casual");
  const cta = getAnswer(answers, "cta");

  let p = `اكتب منشوراً احترافياً يحقق الهدف.\n\n`;
  p += `**المنصة**: ${platform}\n`;
  p += `**الموضوع**: ${topic}\n`;
  p += `**الهدف**: ${goal}\n`;
  p += `**النبرة**: ${tone}\n`;
  if (cta) p += `**CTA**: ${cta}\n\n`;
  p += `قدم:\n`;
  p += `- Hook قوي في أول سطر\n`;
  p += `- Body يضيف قيمة حقيقية\n`;
  p += `- CTA واضح\n`;
  p += `- 5-10 هاشتاقات ذات صلة (إن لزم)`;
  return p;
}

function socialExpert(answers: Record<string, any>): string {
  const platform = getAnswer(answers, "platform", "instagram");
  const topic = getAnswer(answers, "topic");
  const goal = getAnswer(answers, "goal", "engage");
  const tone = getAnswer(answers, "tone", "casual");
  const cta = getAnswer(answers, "cta");

  let p = `أنشئ منشوراً يحقق أقصى تفاعل على ${platform}.\n\n`;
  p += `## الاستراتيجية\n`;
  p += `- **الموضوع**: ${topic}\n`;
  p += `- **الهدف**: ${goal}\n`;
  p += `- **النبرة**: ${tone}\n`;
  if (cta) p += `- **CTA**: ${cta}\n`;
  p += `\n## هيكل المنشور\n`;
  p += `1. **Hook** (أول سطر يوقف الـ scroll)\n`;
  p += `2. **Value** (معلومة أو قصة أو insight)\n`;
  p += `3. **Engagement** (سؤال أو استفتاء)\n`;
  p += `4. **CTA** (دعوة لاتخاذ إجراء)\n`;
  p += `\n## نصائح خاصة بـ ${platform}\n`;
  if (platform === "instagram") p += `- أول سطر مهم جداً (يُعرض قبل "المزيد")\n- استخدم إيموجي باعتدال\n- caption قوي + هاشتاقات استراتيجية\n`;
  if (platform === "twitter" || platform === "x") p += `- قصير جداً (280 حرف)\n- جملة واحدة مؤثرة\n- thread إذا احتجت سياق أكثر\n`;
  if (platform === "linkedin") p += `- احترافي ولكن إنساني\n- قصة شخصية أو درس\n- إيموجي بحذر\n`;
  if (platform === "tiktok") p += `- قصير جداً، punchy\n- يتحدى التوقعات\n`;
  if (platform === "facebook") p += `- قصصي، عاطفي\n- يثير نقاشاً\n`;
  if (platform === "youtube") p += `- وصف مُحسَّن لـ SEO\n- أول سطرين يجذبان\n`;
  return p;
}

// ============================================================
// ✍️  WRITING
// ============================================================

function writingBasic(answers: Record<string, any>): string {
  const format = getAnswer(answers, "format", "article");
  const topic = getAnswer(answers, "topic");
  const tone = getAnswer(answers, "tone", "neutral");
  const audience = getAnswer(answers, "audience");
  const length = getAnswer(answers, "length");

  let p = `اكتب ${format} بأسلوب ${tone} عن **${topic}** موجهاً لـ ${audience || "جمهور عام"}.`;
  if (length) p += `\n\nالطول: ${length}.`;
  return p;
}

function writingProfessional(answers: Record<string, any>): string {
  const format = getAnswer(answers, "format", "article");
  const topic = getAnswer(answers, "topic");
  const tone = getAnswer(answers, "tone", "neutral");
  const audience = getAnswer(answers, "audience");
  const length = getAnswer(answers, "length");

  let p = `اكتب ${format} احترافي عالي الجودة.\n\n`;
  p += `**الموضوع**: ${topic}\n`;
  p += `**النبرة**: ${tone}\n`;
  p += `**الجمهور**: ${audience || "عام"}\n`;
  if (length) p += `**الطول**: ${length}\n`;
  p += `\n## الهيكل\n`;
  p += `1. **عنوان جذاب**\n`;
  p += `2. **مقدمة** تشد الانتباه\n`;
  p += `3. **3-5 نقاط رئيسية** بأمثلة\n`;
  p += `4. **خاتمة** مع CTA أو insight\n\n`;
  p += `اجعل الكتابة واضحة، محددة، وقابلة للتطبيق.`;
  return p;
}

function writingExpert(answers: Record<string, any>): string {
  const format = getAnswer(answers, "format", "article");
  const topic = getAnswer(answers, "topic");
  const tone = getAnswer(answers, "tone", "neutral");
  const audience = getAnswer(answers, "audience");
  const length = getAnswer(answers, "length");

  let p = `اكتب ${format} بمستوى احترافي للنشر في أبرز المنصات.\n\n`;
  p += `## معلومات أساسية\n`;
  p += `- **الموضوع**: ${topic}\n`;
  p += `- **الجمهور**: ${audience || "عام"}\n`;
  p += `- **النبرة**: ${tone}\n`;
  if (length) p += `- **الطول**: ${length}\n`;
  p += `\n## الاستراتيجية الإبداعية\n`;
  p += `- **Hook قوي** في أول 3 أسطر\n`;
  p += `- **Storytelling** لجذب الانتباه\n`;
  p += `- **Data & Examples** للمصداقية\n`;
  p += `- **Original insights** لا معلومات عامة\n`;
  p += `- **Actionable takeaways** للقراء\n`;
  p += `\n## الهيكل\n`;
  p += `1. **عنوان** (Hook-driven)\n`;
  p += `2. **مقدمة** تشد القارئ\n`;
  p += `3. **المحتوى الأساسي** منظم في أقسام\n`;
  p += `4. **خاتمة** تلهم\n\n`;
  p += `## معايير الجودة\n`;
  p += `- كل جملة تضيف قيمة\n`;
  p += `- لا حشو ولا تكرار\n`;
  p += `- صوت فريد مميز\n`;
  p += `- مُحسَّن للقراءة على الجوال`;
  return p;
}

// ============================================================
// 📈  MARKETING
// ============================================================

function marketingBasic(answers: Record<string, any>): string {
  const product = getAnswer(answers, "product");
  const strategy = getAnswer(answers, "strategy", "launch");
  const audience = getAnswer(answers, "audience");
  const channels = joinList(answers, "channels");

  let p = `ضع استراتيجية تسويق ${strategy} لـ **${product}** تستهدف ${audience || "جمهوراً عاماً"}.`;
  if (channels) p += `\nالقنوات: ${channels}.`;
  return p;
}

function marketingProfessional(answers: Record<string, any>): string {
  const product = getAnswer(answers, "product");
  const strategy = getAnswer(answers, "strategy", "launch");
  const audience = getAnswer(answers, "audience");
  const channels = joinList(answers, "channels");
  const budget = getAnswer(answers, "budget");

  let p = `ضع استراتيجية تسويق شاملة.\n\n`;
  p += `**المنتج/العلامة**: ${product}\n`;
  p += `**الهدف**: ${strategy}\n`;
  p += `**الجمهور المستهدف**: ${audience || "عام"}\n`;
  if (budget) p += `**الميزانية**: ${budget}\n`;
  if (channels) p += `**القنوات**: ${channels}\n\n`;
  p += `قدم:\n`;
  p += `- **ملخص تنفيذي** للاستراتيجية\n`;
  p += `- **شخصيات الجمهور** (Personas)\n`;
  p += `- **القنوات** بترتيب الأولوية\n`;
  p += `- **خطة المحتوى** لأول 30 يوم\n`;
  p += `- **KPIs** لقياس النجاح\n`;
  p += `- **الميزانية المقترحة**`;
  return p;
}

function marketingExpert(answers: Record<string, any>): string {
  const product = getAnswer(answers, "product");
  const strategy = getAnswer(answers, "strategy", "launch");
  const audience = getAnswer(answers, "audience");
  const channels = joinList(answers, "channels");
  const budget = getAnswer(answers, "budget");

  let p = `ضع استراتيجية تسويق احترافية قابلة للتنفيذ تحقق ROI عالٍ.\n\n`;
  p += `## نظرة عامة\n- **المنتج**: ${product}\n`;
  p += `- **الاستراتيجية**: ${strategy}\n`;
  p += `- **الجمهور**: ${audience || "عام"}\n`;
  if (channels) p += `- **القنوات**: ${channels}\n`;
  if (budget) p += `- **الميزانية**: ${budget}\n`;
  p += `\n## المرحلة 1: البحث والتحليل\n`;
  p += `- تحليل الجمهور المستهدف\n`;
  p += `- تحليل المنافسين\n`;
  p += `- تحديد الموقع في السوق\n`;
  p += `\n## المرحلة 2: التموضع والرسالة\n`;
  p += `- القيمة المضافة الفريدة (USP)\n`;
  p += `- الرسالة الرئيسية\n`;
  p += `- صوت العلامة (Brand voice)\n`;
  p += `\n## المرحلة 3: القنوات والتكتيكات\n`;
  p += `- لكل قناة: التكتيكات والمحتوى\n`;
  p += `- ميزانية مقترحة\n`;
  p += `- الجدول الزمني\n`;
  p += `\n## المرحلة 4: القياس والتحسين\n`;
  p += `- KPIs الرئيسية\n`;
  p += `- أدوات التتبع\n`;
  p += `- خطة التحسين المستمر`;
  return p;
}

// ============================================================
// 💻  PROGRAMMING
// ============================================================

function programmingBasic(answers: Record<string, any>): string {
  const language = getAnswer(answers, "language", "typescript");
  const framework = getAnswer(answers, "framework");
  const task = getAnswer(answers, "task");

  let p = `اكتب كود ${language}${framework ? ` (${framework})` : ""} من أجل: **${task}**.\n\n`;
  p += `قدم كود نظيف، موثَّق، وقابل للتشغيل مباشرة.`;
  return p;
}

function programmingProfessional(answers: Record<string, any>): string {
  const language = getAnswer(answers, "language", "typescript");
  const framework = getAnswer(answers, "framework");
  const task = getAnswer(answers, "task");
  const db = getAnswer(answers, "database");
  const auth = getAnswer(answers, "auth");

  let p = `اكتب حلاً برمجياً احترافياً.\n\n`;
  p += `**اللغة**: ${language}\n`;
  if (framework) p += `**الفريمورك**: ${framework}\n`;
  p += `**المطلوب**: ${task}\n`;
  if (db && db !== "none") p += `**قاعدة البيانات**: ${db}\n`;
  if (auth && auth !== "none") p += `**المصادقة**: ${auth}\n`;
  p += `\nالمتطلبات:\n`;
  p += `- كود نظيف ومنظم (Clean Code)\n`;
  p += `- معالجة الأخطاء بشكل صحيح\n`;
  p += `- تعليقات واضحة\n`;
  p += `- أمثلة استخدام\n`;
  p += `- اختبارات أساسية`;
  return p;
}

function programmingExpert(answers: Record<string, any>): string {
  const language = getAnswer(answers, "language", "typescript");
  const framework = getAnswer(answers, "framework");
  const task = getAnswer(answers, "task");
  const db = getAnswer(answers, "database");
  const auth = getAnswer(answers, "auth");

  let p = `قدّم حلاً برمجياً على مستوى production.\n\n`;
  p += `## نظرة عامة\n- **اللغة**: ${language}\n`;
  if (framework) p += `- **الفريمورك**: ${framework}\n`;
  p += `- **المطلوب**: ${task}\n`;
  if (db && db !== "none") p += `- **قاعدة البيانات**: ${db}\n`;
  if (auth && auth !== "none") p += `- **المصادقة**: ${auth}\n`;
  p += `\n## معايير الكود\n`;
  p += `- اتبع SOLID principles\n`;
  p += `- Type-safe بالكامل\n`;
  p += `- معالجة شاملة للأخطاء (try/catch, error boundaries)\n`;
  p += `- Logging احترافي\n`;
  p += `- لا hard-coded secrets\n`;
  p += `- Async/await صحيح\n`;
  p += `- لا memory leaks\n`;
  p += `\n## البنية المطلوبة\n`;
  p += `1. **الكود الرئيسي** كامل وقابل للتشغيل\n`;
  p += `2. **النماذج/Models** إن لزم\n`;
  p += `3. **معالجة الطلبات/Requests**\n`;
  p += `4. **التحقق من المدخلات** (Validation)\n`;
  p += `5. **اختبارات وحدة** (Unit tests) للوظائف الحرجة\n`;
  p += `6. **تعليقات JSDoc** للوظائف العامة\n`;
  p += `7. **README قصير** يشرح كيفية التشغيل`;
  return p;
}

// ============================================================
// 💡  BUSINESS IDEA
// ============================================================

function businessBasic(answers: Record<string, any>): string {
  const industry = getAnswer(answers, "industry");
  const problem = getAnswer(answers, "problem");
  const audience = getAnswer(answers, "audience");

  let p = `طوّر فكرة عمل في مجال **${industry}** تحل المشكلة التالية: ${problem}.`;
  if (audience) p += `\nالعملاء المستهدفون: ${audience}.`;
  return p;
}

function businessProfessional(answers: Record<string, any>): string {
  const industry = getAnswer(answers, "industry");
  const stage = getAnswer(answers, "stage", "idea");
  const problem = getAnswer(answers, "problem");
  const audience = getAnswer(answers, "audience");
  const model = getAnswer(answers, "model");

  let p = `طوّر فكرة عمل قابلة للتنفيذ.\n\n`;
  p += `**المجال**: ${industry}\n`;
  p += `**المرحلة**: ${stage}\n`;
  p += `**المشكلة**: ${problem}\n`;
  if (audience) p += `**العملاء**: ${audience}\n`;
  if (model) p += `**نموذج العمل**: ${model}\n`;
  p += `\nقدم:\n`;
  p += `- **الوصف** (ماذا ولماذا)\n`;
  p += `- **القيمة المضافة**\n`;
  p += `- **شخصية العميل**\n`;
  p += `- **الميزة التنافسية**\n`;
  p += `- **نموذج تحقيق الدخل**\n`;
  p += `- **أول 3 خطوات** للتنفيذ`;
  return p;
}

function businessExpert(answers: Record<string, any>): string {
  const industry = getAnswer(answers, "industry");
  const stage = getAnswer(answers, "stage", "idea");
  const problem = getAnswer(answers, "problem");
  const audience = getAnswer(answers, "audience");
  const model = getAnswer(answers, "model");

  let p = `طوّر خطة عمل متكاملة لمشروع ناشئ.\n\n`;
  p += `## الملخص التنفيذي\n`;
  p += `- **المجال**: ${industry}\n`;
  p += `- **المرحلة**: ${stage}\n`;
  p += `- **المشكلة المُعالَجة**: ${problem}\n`;
  if (audience) p += `- **العملاء المستهدفون**: ${audience}\n`;
  if (model) p += `- **نموذج العمل**: ${model}\n`;
  p += `\n## تحليل السوق\n`;
  p += `- حجم السوق (TAM/SAM/SOM)\n`;
  p += `- المنافسون الرئيسيون\n`;
  p += `- الفرصة\n`;
  p += `\n## المنتج\n`;
  p += `- الحل المقترح\n`;
  p += `- القيمة المضافة الفريدة (USP)\n`;
  p += `- خارطة طريق المنتج\n`;
  p += `\n## نموذج العمل\n`;
  p += `- مصادر الدخل\n`;
  p += `- هيكل التسعير\n`;
  p += `- التوقعات المالية (سنة 1)\n`;
  p += `\n## استراتيجية النمو\n`;
  p += `- قنوات الاستحواذ\n`;
  p += `- استراتيجية التسويق\n`;
  p += `- الشراكات المحتملة\n`;
  p += `\n## الفريق والمتطلبات\n`;
  p += `- الأدوار الحرجة\n`;
  p += `- التمويل المطلوب\n`;
  p += `- خارطة طريق 12 شهراً`;
  return p;
}

// ============================================================
// 🌐  OTHER (generic)
// ============================================================

function otherBasic(answers: Record<string, any>): string {
  const description = getAnswer(answers, "description");
  const format = getAnswer(answers, "format", "text");
  const tone = getAnswer(answers, "tone");

  let p = `${description}\n\n`;
  if (format && format !== "text") p += `**الصيغة المطلوبة**: ${format}\n`;
  if (tone) p += `**النبرة**: ${tone}\n`;
  return p.trim();
}

function otherProfessional(answers: Record<string, any>): string {
  const description = getAnswer(answers, "description");
  const format = getAnswer(answers, "format", "text");
  const tone = getAnswer(answers, "tone");

  let p = `${description}\n\n`;
  p += `قدم مخرجاً احترافياً عالي الجودة، منظماً، وقابلاً للاستخدام المباشر.\n`;
  if (format && format !== "text") p += `\n**الصيغة**: ${format}`;
  if (tone) p += `\n**النبرة**: ${tone}`;
  return p;
}

function otherExpert(answers: Record<string, any>): string {
  const description = getAnswer(answers, "description");
  const format = getAnswer(answers, "format", "text");
  const tone = getAnswer(answers, "tone");

  let p = `${description}\n\n`;
  p += `قدم أفضل مخرج ممكن، مع:\n`;
  p += `- اهتمام شديد بالتفاصيل\n`;
  p += `- تنسيق واضح ومنظم\n`;
  p += `- أمثلة عملية حيث أمكن\n`;
  p += `- قيمة مضافة تتجاوز الطلب الحرفي\n`;
  if (format && format !== "text") p += `\n**الصيغة**: ${format}`;
  if (tone) p += `\n**النبرة**: ${tone}`;
  return p;
}

// ============================================================
// 🎯  MAIN DISPATCHER
// ============================================================

function build(taskType: TaskType, level: PromptLevel, platform: AIPlatform, answers: Record<string, any>): string {
  // Inject platform hint for engines that need it
  const enrichedAnswers = { ...answers, _platform: platform };
  const tip = PLATFORM_TIPS[platform];

  let prompt = "";
  try {
    if (taskType === "image") {
      prompt = level === "basic" ? imageBasic(enrichedAnswers) : level === "professional" ? imageProfessional(enrichedAnswers) : imageExpert(enrichedAnswers);
    } else if (taskType === "video") {
      prompt = level === "basic" ? videoBasic(enrichedAnswers) : level === "professional" ? videoProfessional(enrichedAnswers) : videoExpert(enrichedAnswers);
    } else if (taskType === "website") {
      prompt = level === "basic" ? websiteBasic(enrichedAnswers) : level === "professional" ? websiteProfessional(enrichedAnswers) : websiteExpert(enrichedAnswers);
    } else if (taskType === "app") {
      prompt = level === "basic" ? appBasic(enrichedAnswers) : level === "professional" ? appProfessional(enrichedAnswers) : appExpert(enrichedAnswers);
    } else if (taskType === "logo") {
      prompt = level === "basic" ? logoBasic(enrichedAnswers) : level === "professional" ? logoProfessional(enrichedAnswers) : logoExpert(enrichedAnswers);
    } else if (taskType === "advertisement") {
      prompt = level === "basic" ? adBasic(enrichedAnswers) : level === "professional" ? adProfessional(enrichedAnswers) : adExpert(enrichedAnswers);
    } else if (taskType === "social") {
      prompt = level === "basic" ? socialBasic(enrichedAnswers) : level === "professional" ? socialProfessional(enrichedAnswers) : socialExpert(enrichedAnswers);
    } else if (taskType === "writing") {
      prompt = level === "basic" ? writingBasic(enrichedAnswers) : level === "professional" ? writingProfessional(enrichedAnswers) : writingExpert(enrichedAnswers);
    } else if (taskType === "marketing") {
      prompt = level === "basic" ? marketingBasic(enrichedAnswers) : level === "professional" ? marketingProfessional(enrichedAnswers) : marketingExpert(enrichedAnswers);
    } else if (taskType === "programming") {
      prompt = level === "basic" ? programmingBasic(enrichedAnswers) : level === "professional" ? programmingProfessional(enrichedAnswers) : programmingExpert(enrichedAnswers);
    } else if (taskType === "business") {
      prompt = level === "basic" ? businessBasic(enrichedAnswers) : level === "professional" ? businessProfessional(enrichedAnswers) : businessExpert(enrichedAnswers);
    } else {
      prompt = level === "basic" ? otherBasic(enrichedAnswers) : level === "professional" ? otherProfessional(enrichedAnswers) : otherExpert(enrichedAnswers);
    }
  } catch {
    prompt = "حدث خطأ في توليد البرومبت. حاول مرة أخرى.";
  }

  return `${prompt}\n\n${tip}`;
}

export function buildBasicPrompt(taskType: TaskType, platform: AIPlatform, answers: Record<string, any>): string {
  return build(taskType, "basic", platform, answers);
}

export function buildProfessionalPrompt(taskType: TaskType, platform: AIPlatform, answers: Record<string, any>): string {
  return build(taskType, "professional", platform, answers);
}

export function buildExpertPrompt(taskType: TaskType, platform: AIPlatform, answers: Record<string, any>): string {
  return build(taskType, "expert", platform, answers);
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

/** "Improve" — appends enhancement instructions to the user's prompt. */
export function improvePrompt(prompt: string, _platform: AIPlatform): string {
  return `${prompt}\n\n---\n\n✨ نسخة محسّنة من البرومبت أعلاه:\n\n1. حسّن الوصف بإضافة 3-5 تفاصيل بصرية محددة (إضاءة، زاوية، مزاج، حركة).\n2. أضف كلمات مفتاحية فنية (cinematic, bokeh, rim lighting, etc).\n3. حدد بوضوح النتيجة المرجوة في أول جملة.\n4. اختم بمواصفات تقنية (دقة، نسبة عرض، إضاءة).\n\nأعد كتابة البرومبت كاملاً مع التحسينات.`;
}

/** Translate between English ↔ Arabic — adds explicit cues. */
export function translatePrompt(prompt: string, targetLang: "en" | "ar"): string {
  const langName = targetLang === "ar" ? "العربية" : "English";
  return `${prompt}\n\n---\n\n🌐 ترجم المخرج النهائي أعلاه إلى ${langName} بطلاقة. حافظ على المصطلحات التقنية بالإنجليزية (مثل أسماء المنصات والتقنيات). أبقِ التنسيق (العناوين، النقاط، الكود) كما هو. اكتب فقط النص المترجم.`;
}

/** Mock delay to simulate streaming — gives a real "AI thinking" feel. */
export function simulateGenerationDelay(level: PromptLevel): number {
  const base = { basic: 500, professional: 1000, expert: 1600 }[level];
  return base + Math.random() * 400;
}