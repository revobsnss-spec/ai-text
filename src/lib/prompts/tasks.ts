import type { TaskType, AIPlatform, Question } from "@/types";

export const TASK_TYPES: { id: TaskType; label: string; icon: string; description: string; color: string }[] = [
  { id: "image", label: "توليد الصور", icon: "ImageIcon", description: "صور مذهلة بالذكاء الاصطناعي", color: "from-pink-500 to-rose-500" },
  { id: "video", label: "توليد الفيديو", icon: "VideoIcon", description: "برومبتات فيديو سينمائية", color: "from-purple-500 to-violet-500" },
  { id: "website", label: "إنشاء موقع", icon: "Globe", description: "مفاهيم مواقع كاملة", color: "from-blue-500 to-cyan-500" },
  { id: "app", label: "تطوير تطبيق", icon: "Smartphone", description: "أفكار تطبيقات جوال وويب", color: "from-emerald-500 to-teal-500" },
  { id: "logo", label: "تصميم شعار", icon: "Sparkles", description: "هوية العلامة والشعارات", color: "from-amber-500 to-orange-500" },
  { id: "advertisement", label: "إعلان", icon: "Megaphone", description: "نصوص وتصاميم إعلانية", color: "from-red-500 to-pink-500" },
  { id: "social", label: "منشور سوشيال ميديا", icon: "Share2", description: "محتوى سوشيال جذاب", color: "from-indigo-500 to-purple-500" },
  { id: "writing", label: "كتابة", icon: "PenLine", description: "مقالات وقصص وسيناريوهات", color: "from-sky-500 to-blue-500" },
  { id: "marketing", label: "تسويق", icon: "TrendingUp", description: "استراتيجيات تسويقية", color: "from-orange-500 to-red-500" },
  { id: "programming", label: "برمجة", icon: "Code2", description: "حلول برمجية وتقنية", color: "from-green-500 to-emerald-500" },
  { id: "business", label: "فكرة عمل", icon: "Lightbulb", description: "خطط مشاريع ناشئة", color: "from-yellow-500 to-amber-500" },
  { id: "other", label: "أخرى", icon: "Wand2", description: "أي شيء آخر", color: "from-slate-500 to-gray-500" },
];

export const AI_PLATFORMS: { id: AIPlatform; label: string; description: string; category: string }[] = [
  { id: "chatgpt", label: "ChatGPT", description: "نموذج OpenAI الرائد", category: "نصوص" },
  { id: "gemini", label: "Gemini", description: "ذكاء Google متعدد الوسائط", category: "نصوص" },
  { id: "claude", label: "Claude", description: "نموذج Anthropic للاستدلال", category: "نصوص" },
  { id: "midjourney", label: "Midjourney", description: "توليد صور فاخر", category: "صور" },
  { id: "gpt-image", label: "GPT Image", description: "نموذج صور OpenAI", category: "صور" },
  { id: "flux", label: "Flux", description: "ذكاء صور Black Forest Labs", category: "صور" },
  { id: "veo", label: "Veo", description: "مولّد فيديوهات Google", category: "فيديو" },
  { id: "kling", label: "Kling", description: "ذكاء فيديو Kuaishou", category: "فيديو" },
  { id: "runway", label: "Runway", description: "مجموعة فيديو إبداعية", category: "فيديو" },
  { id: "leonardo", label: "Leonardo AI", description: "ذكاء فني متعدد الاستخدامات", category: "صور" },
];

export const QUESTIONS: Record<TaskType, Question[]> = {
  image: [
    { id: "subject", label: "الموضوع", description: "ما هو الموضوع الرئيسي لصورتك؟", type: "text", placeholder: "مثال: أسد مهيب في السافانا", required: true },
    {
      id: "style", label: "الأسلوب", type: "select", required: true, default: "realistic",
      options: [
        { value: "realistic", label: "واقعي تصويري" },
        { value: "cinematic", label: "سينمائي" },
        { value: "anime", label: "أنمي / مانجا" },
        { value: "3d", label: "رندر ثلاثي الأبعاد" },
        { value: "illustration", label: "رسم رقمي" },
        { value: "oil-painting", label: "لوحة زيتية" },
        { value: "watercolor", label: "ألوان مائية" },
        { value: "pixel-art", label: "فن البكسل" },
        { value: "cyberpunk", label: "سايبربانك" },
        { value: "minimalist", label: "بسيط" },
      ],
    },
    {
      id: "lighting", label: "الإضاءة", type: "select", default: "natural",
      options: [
        { value: "natural", label: "ضوء طبيعي" },
        { value: "golden-hour", label: "الساعة الذهبية" },
        { value: "studio", label: "إضاءة استوديو" },
        { value: "neon", label: "نيون / سايبربانك" },
        { value: "dramatic", label: "درامية" },
        { value: "soft", label: "ناعمة منتشرة" },
        { value: "backlit", label: "إضاءة خلفية" },
      ],
    },
    {
      id: "mood", label: "المزاج", type: "select", default: "calm",
      options: [
        { value: "calm", label: "هادئ ومسالم" },
        { value: "epic", label: "ملحمي وقوي" },
        { value: "mysterious", label: "غامض" },
        { value: "joyful", label: "مبتهج ونابض" },
        { value: "dark", label: "مظلم وكئيب" },
        { value: "dreamy", label: "حالم وأثيري" },
        { value: "energetic", label: "نشيط" },
      ],
    },
    { id: "colors", label: "لوحة الألوان", description: "صف الألوان السائدة", type: "text", placeholder: "مثال: ألوان ترابية دافئة مع لمسات ذهبية" },
    {
      id: "camera", label: "زاوية الكاميرا", type: "select", default: "eye-level",
      options: [
        { value: "eye-level", label: "مستوى العين" },
        { value: "low-angle", label: "منخفضة" },
        { value: "high-angle", label: "عالية" },
        { value: "aerial", label: "جوية / درون" },
        { value: "close-up", label: "قريبة / ماكرو" },
        { value: "wide-shot", label: "لقطة واسعة" },
      ],
    },
    {
      id: "aspect", label: "نسبة العرض للارتفاع", type: "select", default: "16:9",
      options: [
        { value: "1:1", label: "1:1 (مربع)" },
        { value: "16:9", label: "16:9 (أفقي)" },
        { value: "9:16", label: "9:16 (عمودي)" },
        { value: "4:3", label: "4:3" },
        { value: "21:9", label: "21:9 (سينمائي)" },
      ],
    },
    {
      id: "quality", label: "مستوى الجودة", type: "select", default: "high",
      options: [
        { value: "draft", label: "مسودة / مفهوم" },
        { value: "high", label: "جودة عالية" },
        { value: "ultra", label: "تفاصيل فائقة / 8K" },
      ],
    },
  ],
  video: [
    { id: "scene", label: "وصف المشهد", description: "صف ما يحدث في الفيديو", type: "textarea", placeholder: "درون يطير فوق جبال ضبابية عند الشروق...", required: true },
    {
      id: "duration", label: "المدة", type: "select", default: "8s",
      options: [
        { value: "4s", label: "4 ثوانٍ" },
        { value: "8s", label: "8 ثوانٍ" },
        { value: "15s", label: "15 ثانية" },
        { value: "30s", label: "30 ثانية" },
        { value: "60s", label: "دقيقة واحدة" },
        { value: "3min", label: "2-3 دقائق" },
      ],
    },
    {
      id: "camera", label: "حركة الكاميرا", type: "select", default: "smooth-pan",
      options: [
        { value: "static", label: "ثابتة" },
        { value: "smooth-pan", label: "تحريك سلس" },
        { value: "orbit", label: "دوران 360°" },
        { value: "zoom", label: "زووم بطيء" },
        { value: "tracking", label: "لقطة تتبع" },
        { value: "drone", label: "درون / جوية" },
        { value: "handheld", label: "يدوية" },
      ],
    },
    {
      id: "lighting", label: "الإضاءة", type: "select", default: "natural",
      options: [
        { value: "natural", label: "ضوء طبيعي" },
        { value: "golden-hour", label: "الساعة الذهبية" },
        { value: "studio", label: "استوديو" },
        { value: "neon", label: "نيون / سايبربانك" },
        { value: "moody", label: "مزاجية / خافتة" },
      ],
    },
    { id: "voiceover", label: "هل تحتاج تعليق صوتي؟", type: "text", placeholder: "مثال: راوي ذكر، عميق وهادئ (أو اتركه فارغاً)" },
    {
      id: "music", label: "أسلوب الموسيقى", type: "select", default: "cinematic",
      options: [
        { value: "cinematic", label: "سينمائية أوركسترالية" },
        { value: "electronic", label: "إلكترونية / سينث" },
        { value: "acoustic", label: "أكوستيك / ناعمة" },
        { value: "ambient", label: "محيطية" },
        { value: "none", label: "بدون موسيقى" },
      ],
    },
    { id: "effects", label: "المؤثرات الخاصة", type: "text", placeholder: "مثال: تأثيرات الجسيمات، حركة بطيئة، انعكاسات العدسة" },
  ],
  website: [
    { id: "industry", label: "المجال / النيتش", type: "text", placeholder: "مثال: SaaS، مطعم، بورتفوليو، تجارة إلكترونية", required: true },
    {
      id: "ui-style", label: "أسلوب الواجهة", type: "select", default: "modern",
      options: [
        { value: "minimal", label: "بسيط ونظيف" },
        { value: "modern", label: "حديث وجريء" },
        { value: "brutalist", label: "بروتالي" },
        { value: "playful", label: "مرح وملوّن" },
        { value: "luxury", label: "فاخر وأنيق" },
        { value: "retro", label: "ريترو / عتيق" },
        { value: "glassmorphism", label: "زجاجي" },
      ],
    },
    {
      id: "pages", label: "الصفحات المطلوبة", type: "multiselect",
      options: [
        { value: "home", label: "الرئيسية" },
        { value: "about", label: "من نحن" },
        { value: "services", label: "الخدمات" },
        { value: "pricing", label: "الأسعار" },
        { value: "blog", label: "المدونة" },
        { value: "contact", label: "تواصل معنا" },
        { value: "portfolio", label: "أعمالنا" },
        { value: "team", label: "الفريق" },
        { value: "faq", label: "الأسئلة الشائعة" },
      ],
    },
    {
      id: "features", label: "الميزات الرئيسية", type: "multiselect",
      options: [
        { value: "auth", label: "تسجيل دخول" },
        { value: "payments", label: "مدفوعات / شراء" },
        { value: "dashboard", label: "لوحة تحكم المستخدم" },
        { value: "cms", label: "نظام إدارة محتوى" },
        { value: "search", label: "بحث" },
        { value: "chat", label: "دردشة مباشرة" },
        { value: "multi-language", label: "متعدد اللغات" },
        { value: "dark-mode", label: "وضع داكن" },
      ],
    },
    { id: "audience", label: "الجمهور المستهدف", type: "text", placeholder: "مثال: محترفون شباب، مشترون B2B" },
    { id: "colors", label: "نظام الألوان", type: "text", placeholder: "مثال: أسود + أخضر نيون، ألوان باستيل" },
    {
      id: "animations", label: "مستوى الحركات", type: "select", default: "smooth",
      options: [
        { value: "none", label: "بدون حركات" },
        { value: "subtle", label: "انتقالات خفيفة" },
        { value: "smooth", label: "سلس وحديث" },
        { value: "rich", label: "غني وسينمائي" },
      ],
    },
    {
      id: "performance", label: "هدف الأداء", type: "select", default: "fast",
      options: [
        { value: "fast", label: "سريع جداً (90+ Lighthouse)" },
        { value: "balanced", label: "متوازن" },
        { value: "feature-rich", label: "غني بالميزات" },
      ],
    },
  ],
  app: [
    { id: "name", label: "اسم / فكرة التطبيق", type: "text", placeholder: "مثال: متتبع لياقة للعدائين", required: true },
    {
      id: "platform", label: "المنصة المستهدفة", type: "multiselect", default: ["mobile"],
      options: [
        { value: "mobile", label: "جوال (iOS / Android)" },
        { value: "web", label: "تطبيق ويب" },
        { value: "desktop", label: "حاسوب" },
        { value: "wearable", label: "أجهزة قابلة للارتداء" },
      ],
    },
    {
      id: "features", label: "الميزات الأساسية", type: "multiselect",
      options: [
        { value: "auth", label: "تسجيل دخول" },
        { value: "profile", label: "ملفات المستخدمين" },
        { value: "notifications", label: "إشعارات" },
        { value: "social", label: "تغذية اجتماعية" },
        { value: "chat", label: "رسائل / دردشة" },
        { value: "payments", label: "مشتريات داخل التطبيق" },
        { value: "offline", label: "وضع عدم الاتصال" },
        { value: "ai", label: "تكامل ذكاء اصطناعي" },
      ],
    },
    { id: "audience", label: "المستخدمون المستهدفون", type: "text", placeholder: "مثال: جيل Z، فرق المؤسسات" },
    {
      id: "design", label: "أسلوب التصميم", type: "select", default: "modern",
      options: [
        { value: "modern", label: "حديث بسيط" },
        { value: "playful", label: "مرح" },
        { value: "professional", label: "احترافي / مؤسسي" },
        { value: "bold", label: "جريء ومعبّر" },
      ],
    },
  ],
  logo: [
    { id: "brand", label: "اسم العلامة", type: "text", placeholder: "مثال: أورورا تك", required: true },
    { id: "industry", label: "المجال", type: "text", placeholder: "مثال: برمجيات AI" },
    {
      id: "style", label: "الأسلوب", type: "select", default: "minimal",
      options: [
        { value: "minimal", label: "بسيط" },
        { value: "wordmark", label: "كتابي" },
        { value: "lettermark", label: "حروف" },
        { value: "iconic", label: "أيقوني" },
        { value: "abstract", label: "تجريدي" },
        { value: "mascot", label: "شخصية" },
        { value: "emblem", label: "شعار مميز" },
      ],
    },
    {
      id: "mood", label: "الشخصية / المزاج", type: "multiselect",
      options: [
        { value: "modern", label: "حديث" },
        { value: "luxury", label: "فاخر" },
        { value: "playful", label: "مرح" },
        { value: "bold", label: "جريء" },
        { value: "trustworthy", label: "موثوق" },
        { value: "techy", label: "تقني" },
        { value: "organic", label: "عضوي / طبيعي" },
      ],
    },
    { id: "colors", label: "الألوان المفضلة", type: "text", placeholder: "مثال: أزرق غامق + ذهبي" },
  ],
  advertisement: [
    { id: "product", label: "المنتج / الخدمة", type: "text", placeholder: "مثال: مساعد كتابة AI", required: true },
    {
      id: "medium", label: "وسيط الإعلان", type: "select", default: "social",
      options: [
        { value: "social", label: "إعلان سوشيال ميديا" },
        { value: "display", label: "بانر إعلاني" },
        { value: "video", label: "إعلان فيديو" },
        { value: "search", label: "نص إعلان بحث" },
        { value: "print", label: "إعلان مطبوع" },
      ],
    },
    { id: "audience", label: "الجمهور المستهدف", type: "text", placeholder: "مثال: أصحاب المشاريع الصغيرة" },
    {
      id: "tone", label: "النبرة", type: "select", default: "persuasive",
      options: [
        { value: "persuasive", label: "مقنعة" },
        { value: "urgent", label: "عاجلة / FOMO" },
        { value: "friendly", label: "ودودة" },
        { value: "luxury", label: "فاخرة" },
        { value: "funny", label: "فكاهية" },
        { value: "educational", label: "تعليمية" },
      ],
    },
    { id: "offer", label: "العرض / الخطاف", type: "text", placeholder: "مثال: خصم 50%، تجربة مجانية، لفترة محدودة" },
  ],
  social: [
    {
      id: "platform", label: "منصة السوشيال", type: "select", default: "instagram",
      options: [
        { value: "instagram", label: "إنستغرام" },
        { value: "twitter", label: "تويتر / X" },
        { value: "linkedin", label: "لينكدإن" },
        { value: "tiktok", label: "تيك توك" },
        { value: "facebook", label: "فيسبوك" },
        { value: "youtube", label: "يوتيوب" },
      ],
    },
    { id: "topic", label: "الموضوع / الفكرة", type: "text", placeholder: "مثال: نصائح للإنتاجية", required: true },
    {
      id: "goal", label: "الهدف", type: "select", default: "engage",
      options: [
        { value: "engage", label: "تفاعل" },
        { value: "educate", label: "تعليم" },
        { value: "sell", label: "بيع / ترويج" },
        { value: "inspire", label: "إلهام" },
        { value: "announce", label: "إعلان" },
      ],
    },
    {
      id: "tone", label: "النبرة", type: "select", default: "casual",
      options: [
        { value: "casual", label: "عفوي ومرح" },
        { value: "professional", label: "احترافي" },
        { value: "witty", label: "ذكي" },
        { value: "inspiring", label: "ملهم" },
      ],
    },
    { id: "cta", label: "الدعوة لاتخاذ إجراء", type: "text", placeholder: "مثال: احفظ هذا المنشور، الرابط في البايو" },
  ],
  writing: [
    {
      id: "format", label: "الصيغة", type: "select", default: "article",
      options: [
        { value: "article", label: "مقال / منشور مدونة" },
        { value: "essay", label: "مقال طويل" },
        { value: "story", label: "قصة قصيرة" },
        { value: "script", label: "سيناريو" },
        { value: "email", label: "بريد إلكتروني" },
        { value: "speech", label: "خطاب" },
      ],
    },
    { id: "topic", label: "الموضوع", type: "textarea", placeholder: "عن ماذا يجب أن يكون؟", required: true },
    {
      id: "tone", label: "النبرة", type: "select", default: "neutral",
      options: [
        { value: "neutral", label: "محايدة" },
        { value: "formal", label: "رسمية" },
        { value: "casual", label: "عفوية" },
        { value: "persuasive", label: "مقنعة" },
        { value: "witty", label: "ذكية / فكاهية" },
        { value: "poetic", label: "شاعرية" },
      ],
    },
    { id: "audience", label: "الجمهور المستهدف", type: "text", placeholder: "مثال: مبتدئون، محترفون" },
    { id: "length", label: "الطول", type: "text", placeholder: "مثال: 800 كلمة، 5 صفحات" },
  ],
  marketing: [
    { id: "product", label: "المنتج / العلامة", type: "text", placeholder: "مثال: تطبيق لياقة جديد", required: true },
    {
      id: "strategy", label: "الهدف التسويقي", type: "select", default: "launch",
      options: [
        { value: "launch", label: "إطلاق منتج" },
        { value: "awareness", label: "وعي بالعلامة" },
        { value: "conversion", label: "تحويل / مبيعات" },
        { value: "retention", label: "الاحتفاظ بالعملاء" },
        { value: "positioning", label: "تحديد الموقع" },
      ],
    },
    { id: "audience", label: "الجمهور المستهدف", type: "textarea", placeholder: "صف عميلك المثالي" },
    { id: "budget", label: "نطاق الميزانية", type: "text", placeholder: "مثال: 5-10 آلاف دولار/شهر" },
    {
      id: "channels", label: "القنوات", type: "multiselect",
      options: [
        { value: "social", label: "سوشيال ميديا" },
        { value: "email", label: "بريد إلكتروني" },
        { value: "seo", label: "SEO / محتوى" },
        { value: "ads", label: "إعلانات مدفوعة" },
        { value: "influencer", label: "مؤثرين" },
        { value: "pr", label: "علاقات عامة" },
      ],
    },
  ],
  programming: [
    {
      id: "language", label: "اللغة", type: "select", default: "typescript",
      options: [
        { value: "typescript", label: "TypeScript" },
        { value: "javascript", label: "JavaScript" },
        { value: "python", label: "Python" },
        { value: "go", label: "Go" },
        { value: "rust", label: "Rust" },
        { value: "java", label: "Java" },
        { value: "swift", label: "Swift" },
        { value: "kotlin", label: "Kotlin" },
        { value: "csharp", label: "C#" },
      ],
    },
    { id: "framework", label: "الفريمورك", type: "text", placeholder: "مثال: Next.js، React، Django، FastAPI" },
    { id: "task", label: "ماذا تريد بناء؟", type: "textarea", placeholder: "مثال: REST API لتطبيق مهام مع JWT auth", required: true },
    {
      id: "database", label: "قاعدة البيانات", type: "select",
      options: [
        { value: "postgres", label: "PostgreSQL" },
        { value: "mongodb", label: "MongoDB" },
        { value: "mysql", label: "MySQL" },
        { value: "sqlite", label: "SQLite" },
        { value: "firebase", label: "Firebase" },
        { value: "none", label: "بدون" },
      ],
    },
    {
      id: "auth", label: "المصادقة", type: "select",
      options: [
        { value: "jwt", label: "JWT" },
        { value: "oauth", label: "OAuth (Google، GitHub...)" },
        { value: "session", label: "جلسة" },
        { value: "none", label: "بدون" },
      ],
    },
  ],
  business: [
    { id: "industry", label: "المجال", type: "text", placeholder: "مثال: EdTech، FinTech، صحة", required: true },
    {
      id: "stage", label: "المرحلة", type: "select", default: "idea",
      options: [
        { value: "idea", label: "مرحلة الفكرة" },
        { value: "mvp", label: "MVP" },
        { value: "growth", label: "نمو" },
        { value: "scale", label: "توسّع" },
      ],
    },
    { id: "problem", label: "المشكلة التي تحلّها", type: "textarea", placeholder: "ما نقطة الألم التي تعالجها؟", required: true },
    { id: "audience", label: "العميل المستهدف", type: "text", placeholder: "مثال: أصحاب المشاريع الصغيرة" },
    {
      id: "model", label: "نموذج العمل", type: "select",
      options: [
        { value: "saas", label: "اشتراك SaaS" },
        { value: "marketplace", label: "سوق" },
        { value: "ecommerce", label: "تجارة إلكترونية" },
        { value: "freemium", label: "مجاني مع ميزات مدفوعة" },
        { value: "service", label: "خدمات / وكالة" },
        { value: "other", label: "أخرى" },
      ],
    },
  ],
  other: [
    { id: "description", label: "صف ما تحتاجه", type: "textarea", placeholder: "أخبرنا بما تريد تحقيقه...", required: true },
    {
      id: "format", label: "صيغة المخرجات المرغوبة", type: "select", default: "text",
      options: [
        { value: "text", label: "نص" },
        { value: "structured", label: "منظّم" },
        { value: "list", label: "قائمة" },
        { value: "table", label: "جدول" },
      ],
    },
    { id: "tone", label: "النبرة المفضلة", type: "text", placeholder: "مثال: ودودة، احترافية" },
  ],
};

export function getQuestions(taskType: TaskType): Question[] {
  return QUESTIONS[taskType] || [];
}