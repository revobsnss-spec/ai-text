import type { TaskType, AIPlatform, Question } from "@/types";

export const TASK_TYPES: { id: TaskType; label: string; icon: string; description: string; color: string }[] = [
  { id: "image", label: "Image Generation", icon: "ImageIcon", description: "Stunning AI-generated images", color: "from-pink-500 to-rose-500" },
  { id: "video", label: "Video Generation", icon: "VideoIcon", description: "Cinematic video prompts", color: "from-purple-500 to-violet-500" },
  { id: "website", label: "Website Creation", icon: "Globe", description: "Full website concepts", color: "from-blue-500 to-cyan-500" },
  { id: "app", label: "App Development", icon: "Smartphone", description: "Mobile & web app ideas", color: "from-emerald-500 to-teal-500" },
  { id: "logo", label: "Logo Design", icon: "Sparkles", description: "Brand identity & logos", color: "from-amber-500 to-orange-500" },
  { id: "advertisement", label: "Advertisement", icon: "Megaphone", description: "Ad copy & creatives", color: "from-red-500 to-pink-500" },
  { id: "social", label: "Social Media Post", icon: "Share2", description: "Engaging social content", color: "from-indigo-500 to-purple-500" },
  { id: "writing", label: "Writing", icon: "PenLine", description: "Articles, stories, scripts", color: "from-sky-500 to-blue-500" },
  { id: "marketing", label: "Marketing", icon: "TrendingUp", description: "Marketing strategies", color: "from-orange-500 to-red-500" },
  { id: "programming", label: "Programming", icon: "Code2", description: "Code & tech solutions", color: "from-green-500 to-emerald-500" },
  { id: "business", label: "Business Idea", icon: "Lightbulb", description: "Startup & business plans", color: "from-yellow-500 to-amber-500" },
  { id: "other", label: "Other", icon: "Wand2", description: "Anything else", color: "from-slate-500 to-gray-500" },
];

export const AI_PLATFORMS: { id: AIPlatform; label: string; description: string; category: string }[] = [
  { id: "chatgpt", label: "ChatGPT", description: "OpenAI's flagship LLM", category: "Text" },
  { id: "gemini", label: "Gemini", description: "Google's multimodal AI", category: "Text" },
  { id: "claude", label: "Claude", description: "Anthropic's reasoning model", category: "Text" },
  { id: "midjourney", label: "Midjourney", description: "Premium image generation", category: "Image" },
  { id: "gpt-image", label: "GPT Image", description: "OpenAI image model", category: "Image" },
  { id: "flux", label: "Flux", description: "Black Forest Labs image AI", category: "Image" },
  { id: "veo", label: "Veo", description: "Google's video generator", category: "Video" },
  { id: "kling", label: "Kling", description: "Kuaishou video AI", category: "Video" },
  { id: "runway", label: "Runway", description: "Creative video suite", category: "Video" },
  { id: "leonardo", label: "Leonardo AI", description: "Versatile art AI", category: "Image" },
];

export const QUESTIONS: Record<TaskType, Question[]> = {
  image: [
    { id: "subject", label: "Subject", description: "What is the main subject of your image?", type: "text", placeholder: "e.g. A majestic lion in the savanna", required: true },
    {
      id: "style", label: "Style", type: "select", required: true, default: "realistic",
      options: [
        { value: "realistic", label: "Photorealistic" },
        { value: "cinematic", label: "Cinematic" },
        { value: "anime", label: "Anime / Manga" },
        { value: "3d", label: "3D Render" },
        { value: "illustration", label: "Digital Illustration" },
        { value: "oil-painting", label: "Oil Painting" },
        { value: "watercolor", label: "Watercolor" },
        { value: "pixel-art", label: "Pixel Art" },
        { value: "cyberpunk", label: "Cyberpunk" },
        { value: "minimalist", label: "Minimalist" },
      ],
    },
    {
      id: "lighting", label: "Lighting", type: "select", default: "natural",
      options: [
        { value: "natural", label: "Natural daylight" },
        { value: "golden-hour", label: "Golden hour" },
        { value: "studio", label: "Studio lighting" },
        { value: "neon", label: "Neon / Cyberpunk" },
        { value: "dramatic", label: "Dramatic chiaroscuro" },
        { value: "soft", label: "Soft diffused" },
        { value: "backlit", label: "Backlit silhouette" },
      ],
    },
    {
      id: "mood", label: "Mood", type: "select", default: "calm",
      options: [
        { value: "calm", label: "Calm & peaceful" },
        { value: "epic", label: "Epic & powerful" },
        { value: "mysterious", label: "Mysterious" },
        { value: "joyful", label: "Joyful & vibrant" },
        { value: "dark", label: "Dark & moody" },
        { value: "dreamy", label: "Dreamy & ethereal" },
        { value: "energetic", label: "Energetic" },
      ],
    },
    { id: "colors", label: "Color Palette", description: "Describe the dominant colors", type: "text", placeholder: "e.g. warm earth tones with golden highlights" },
    {
      id: "camera", label: "Camera Angle", type: "select", default: "eye-level",
      options: [
        { value: "eye-level", label: "Eye level" },
        { value: "low-angle", label: "Low angle" },
        { value: "high-angle", label: "High angle" },
        { value: "aerial", label: "Aerial / Drone" },
        { value: "close-up", label: "Close-up / Macro" },
        { value: "wide-shot", label: "Wide shot" },
      ],
    },
    {
      id: "aspect", label: "Aspect Ratio", type: "select", default: "16:9",
      options: [
        { value: "1:1", label: "1:1 (Square)" },
        { value: "16:9", label: "16:9 (Landscape)" },
        { value: "9:16", label: "9:16 (Portrait)" },
        { value: "4:3", label: "4:3" },
        { value: "21:9", label: "21:9 (Cinematic)" },
      ],
    },
    {
      id: "quality", label: "Quality Level", type: "select", default: "high",
      options: [
        { value: "draft", label: "Draft / Concept" },
        { value: "high", label: "High quality" },
        { value: "ultra", label: "Ultra-detailed / 8K" },
      ],
    },
  ],
  video: [
    { id: "scene", label: "Scene Description", description: "Describe what happens in the video", type: "textarea", placeholder: "A drone flies over misty mountains at sunrise...", required: true },
    {
      id: "duration", label: "Duration", type: "select", default: "8s",
      options: [
        { value: "4s", label: "4 seconds" },
        { value: "8s", label: "8 seconds" },
        { value: "15s", label: "15 seconds" },
        { value: "30s", label: "30 seconds" },
        { value: "60s", label: "1 minute" },
        { value: "3min", label: "2-3 minutes" },
      ],
    },
    {
      id: "camera", label: "Camera Movement", type: "select", default: "smooth-pan",
      options: [
        { value: "static", label: "Static / Locked" },
        { value: "smooth-pan", label: "Smooth pan" },
        { value: "orbit", label: "Orbit / 360°" },
        { value: "zoom", label: "Slow zoom in/out" },
        { value: "tracking", label: "Tracking shot" },
        { value: "drone", label: "Drone / Aerial" },
        { value: "handheld", label: "Handheld" },
      ],
    },
    {
      id: "lighting", label: "Lighting", type: "select", default: "natural",
      options: [
        { value: "natural", label: "Natural light" },
        { value: "golden-hour", label: "Golden hour" },
        { value: "studio", label: "Studio" },
        { value: "neon", label: "Neon / Cyberpunk" },
        { value: "moody", label: "Moody / Low-key" },
      ],
    },
    { id: "voiceover", label: "Voiceover Needed?", type: "text", placeholder: "e.g. Male narrator, deep and calm (or leave blank for none)" },
    {
      id: "music", label: "Music Style", type: "select", default: "cinematic",
      options: [
        { value: "cinematic", label: "Cinematic orchestral" },
        { value: "electronic", label: "Electronic / Synth" },
        { value: "acoustic", label: "Acoustic / Soft" },
        { value: "ambient", label: "Ambient" },
        { value: "none", label: "No music" },
      ],
    },
    { id: "effects", label: "Special Effects", type: "text", placeholder: "e.g. particle effects, slow motion, lens flares" },
  ],
  website: [
    {
      id: "industry", label: "Industry / Niche", type: "text", placeholder: "e.g. SaaS, Restaurant, Portfolio, E-commerce", required: true,
    },
    {
      id: "ui-style", label: "UI Style", type: "select", default: "modern",
      options: [
        { value: "minimal", label: "Minimal & clean" },
        { value: "modern", label: "Modern & bold" },
        { value: "brutalist", label: "Brutalist" },
        { value: "playful", label: "Playful & colorful" },
        { value: "luxury", label: "Luxury & elegant" },
        { value: "retro", label: "Retro / Vintage" },
        { value: "glassmorphism", label: "Glassmorphism" },
      ],
    },
    {
      id: "pages", label: "Pages Required", type: "multiselect",
      options: [
        { value: "home", label: "Home" },
        { value: "about", label: "About" },
        { value: "services", label: "Services" },
        { value: "pricing", label: "Pricing" },
        { value: "blog", label: "Blog" },
        { value: "contact", label: "Contact" },
        { value: "portfolio", label: "Portfolio" },
        { value: "team", label: "Team" },
        { value: "faq", label: "FAQ" },
      ],
    },
    {
      id: "features", label: "Key Features", type: "multiselect",
      options: [
        { value: "auth", label: "Authentication" },
        { value: "payments", label: "Payments / Checkout" },
        { value: "dashboard", label: "User dashboard" },
        { value: "cms", label: "CMS / Blog system" },
        { value: "search", label: "Search functionality" },
        { value: "chat", label: "Live chat" },
        { value: "multi-language", label: "Multi-language" },
        { value: "dark-mode", label: "Dark mode" },
      ],
    },
    { id: "audience", label: "Target Audience", type: "text", placeholder: "e.g. young professionals, B2B buyers" },
    { id: "colors", label: "Color Scheme", type: "text", placeholder: "e.g. black + neon green, pastel palette" },
    {
      id: "animations", label: "Animation Level", type: "select", default: "smooth",
      options: [
        { value: "none", label: "No animations" },
        { value: "subtle", label: "Subtle transitions" },
        { value: "smooth", label: "Smooth & modern" },
        { value: "rich", label: "Rich & cinematic" },
      ],
    },
    {
      id: "performance", label: "Performance Target", type: "select", default: "fast",
      options: [
        { value: "fast", label: "Lightning fast (90+ Lighthouse)" },
        { value: "balanced", label: "Balanced" },
        { value: "feature-rich", label: "Feature-rich" },
      ],
    },
  ],
  app: [
    { id: "name", label: "App Name / Idea", type: "text", placeholder: "e.g. A fitness tracker for runners", required: true },
    {
      id: "platform", label: "Target Platform", type: "multiselect", default: ["mobile"],
      options: [
        { value: "mobile", label: "Mobile (iOS / Android)" },
        { value: "web", label: "Web app" },
        { value: "desktop", label: "Desktop" },
        { value: "wearable", label: "Wearable" },
      ],
    },
    {
      id: "features", label: "Core Features", type: "multiselect",
      options: [
        { value: "auth", label: "User authentication" },
        { value: "profile", label: "User profiles" },
        { value: "notifications", label: "Push notifications" },
        { value: "social", label: "Social feed" },
        { value: "chat", label: "Messaging / Chat" },
        { value: "payments", label: "In-app purchases" },
        { value: "offline", label: "Offline mode" },
        { value: "ai", label: "AI integration" },
      ],
    },
    { id: "audience", label: "Target Users", type: "text", placeholder: "e.g. Gen Z, enterprise teams" },
    {
      id: "design", label: "Design Style", type: "select", default: "modern",
      options: [
        { value: "modern", label: "Modern minimal" },
        { value: "playful", label: "Playful" },
        { value: "professional", label: "Professional / Corporate" },
        { value: "bold", label: "Bold & expressive" },
      ],
    },
  ],
  logo: [
    { id: "brand", label: "Brand Name", type: "text", placeholder: "e.g. Aurora Tech", required: true },
    { id: "industry", label: "Industry", type: "text", placeholder: "e.g. AI software" },
    {
      id: "style", label: "Style", type: "select", default: "minimal",
      options: [
        { value: "minimal", label: "Minimalist" },
        { value: "wordmark", label: "Wordmark" },
        { value: "lettermark", label: "Lettermark" },
        { value: "iconic", label: "Iconic / Pictorial" },
        { value: "abstract", label: "Abstract" },
        { value: "mascot", label: "Mascot" },
        { value: "emblem", label: "Emblem" },
      ],
    },
    {
      id: "mood", label: "Mood / Personality", type: "multiselect",
      options: [
        { value: "modern", label: "Modern" },
        { value: "luxury", label: "Luxury" },
        { value: "playful", label: "Playful" },
        { value: "bold", label: "Bold" },
        { value: "trustworthy", label: "Trustworthy" },
        { value: "techy", label: "Tech-forward" },
        { value: "organic", label: "Organic / Natural" },
      ],
    },
    { id: "colors", label: "Preferred Colors", type: "text", placeholder: "e.g. deep blue + gold" },
  ],
  advertisement: [
    { id: "product", label: "Product / Service", type: "text", placeholder: "e.g. AI writing assistant", required: true },
    {
      id: "medium", label: "Ad Medium", type: "select", default: "social",
      options: [
        { value: "social", label: "Social media ad" },
        { value: "display", label: "Display banner" },
        { value: "video", label: "Video ad" },
        { value: "search", label: "Search ad copy" },
        { value: "print", label: "Print ad" },
      ],
    },
    { id: "audience", label: "Target Audience", type: "text", placeholder: "e.g. small business owners" },
    {
      id: "tone", label: "Tone", type: "select", default: "persuasive",
      options: [
        { value: "persuasive", label: "Persuasive" },
        { value: "urgent", label: "Urgent / FOMO" },
        { value: "friendly", label: "Friendly" },
        { value: "luxury", label: "Luxury" },
        { value: "funny", label: "Humorous" },
        { value: "educational", label: "Educational" },
      ],
    },
    { id: "offer", label: "Offer / Hook", type: "text", placeholder: "e.g. 50% off, free trial, limited time" },
  ],
  social: [
    {
      id: "platform", label: "Social Platform", type: "select", default: "instagram",
      options: [
        { value: "instagram", label: "Instagram" },
        { value: "twitter", label: "Twitter / X" },
        { value: "linkedin", label: "LinkedIn" },
        { value: "tiktok", label: "TikTok" },
        { value: "facebook", label: "Facebook" },
        { value: "youtube", label: "YouTube" },
      ],
    },
    { id: "topic", label: "Topic / Theme", type: "text", placeholder: "e.g. productivity tips", required: true },
    {
      id: "goal", label: "Goal", type: "select", default: "engage",
      options: [
        { value: "engage", label: "Engagement" },
        { value: "educate", label: "Educate" },
        { value: "sell", label: "Sell / Promote" },
        { value: "inspire", label: "Inspire" },
        { value: "announce", label: "Announce" },
      ],
    },
    {
      id: "tone", label: "Tone", type: "select", default: "casual",
      options: [
        { value: "casual", label: "Casual & fun" },
        { value: "professional", label: "Professional" },
        { value: "witty", label: "Witty" },
        { value: "inspiring", label: "Inspiring" },
      ],
    },
    { id: "cta", label: "Call to Action", type: "text", placeholder: "e.g. Save this post, link in bio" },
  ],
  writing: [
    {
      id: "format", label: "Format", type: "select", default: "article",
      options: [
        { value: "article", label: "Article / Blog post" },
        { value: "essay", label: "Essay" },
        { value: "story", label: "Short story" },
        { value: "script", label: "Script / Screenplay" },
        { value: "email", label: "Email" },
        { value: "speech", label: "Speech" },
      ],
    },
    { id: "topic", label: "Topic", type: "textarea", placeholder: "What should it be about?", required: true },
    {
      id: "tone", label: "Tone", type: "select", default: "neutral",
      options: [
        { value: "neutral", label: "Neutral" },
        { value: "formal", label: "Formal" },
        { value: "casual", label: "Casual" },
        { value: "persuasive", label: "Persuasive" },
        { value: "witty", label: "Witty / Humorous" },
        { value: "poetic", label: "Poetic" },
      ],
    },
    { id: "audience", label: "Target Audience", type: "text", placeholder: "e.g. beginners, professionals" },
    { id: "length", label: "Length", type: "text", placeholder: "e.g. 800 words, 5 pages" },
  ],
  marketing: [
    { id: "product", label: "Product / Brand", type: "text", placeholder: "e.g. A new fitness app", required: true },
    {
      id: "strategy", label: "Marketing Goal", type: "select", default: "launch",
      options: [
        { value: "launch", label: "Product launch" },
        { value: "awareness", label: "Brand awareness" },
        { value: "conversion", label: "Conversion / Sales" },
        { value: "retention", label: "Customer retention" },
        { value: "positioning", label: "Market positioning" },
      ],
    },
    { id: "audience", label: "Target Audience", type: "textarea", placeholder: "Describe your ideal customer" },
    { id: "budget", label: "Budget Range", type: "text", placeholder: "e.g. $5k-$10k/month" },
    {
      id: "channels", label: "Channels", type: "multiselect",
      options: [
        { value: "social", label: "Social media" },
        { value: "email", label: "Email" },
        { value: "seo", label: "SEO / Content" },
        { value: "ads", label: "Paid ads" },
        { value: "influencer", label: "Influencer" },
        { value: "pr", label: "PR" },
      ],
    },
  ],
  programming: [
    {
      id: "language", label: "Language", type: "select", default: "typescript",
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
    {
      id: "framework", label: "Framework", type: "text", placeholder: "e.g. Next.js, React, Django, FastAPI",
    },
    { id: "task", label: "What do you want to build?", type: "textarea", placeholder: "e.g. A REST API for a todo app with JWT auth", required: true },
    {
      id: "database", label: "Database", type: "select",
      options: [
        { value: "postgres", label: "PostgreSQL" },
        { value: "mongodb", label: "MongoDB" },
        { value: "mysql", label: "MySQL" },
        { value: "sqlite", label: "SQLite" },
        { value: "firebase", label: "Firebase" },
        { value: "none", label: "None" },
      ],
    },
    {
      id: "auth", label: "Authentication", type: "select",
      options: [
        { value: "jwt", label: "JWT" },
        { value: "oauth", label: "OAuth (Google, GitHub, etc.)" },
        { value: "session", label: "Session-based" },
        { value: "none", label: "None" },
      ],
    },
  ],
  business: [
    { id: "industry", label: "Industry", type: "text", placeholder: "e.g. EdTech, FinTech, Health", required: true },
    {
      id: "stage", label: "Stage", type: "select", default: "idea",
      options: [
        { value: "idea", label: "Idea stage" },
        { value: "mvp", label: "MVP" },
        { value: "growth", label: "Growth" },
        { value: "scale", label: "Scaling" },
      ],
    },
    { id: "problem", label: "Problem You're Solving", type: "textarea", placeholder: "What pain point are you addressing?", required: true },
    { id: "audience", label: "Target Customer", type: "text", placeholder: "e.g. small business owners" },
    {
      id: "model", label: "Business Model", type: "select",
      options: [
        { value: "saas", label: "SaaS Subscription" },
        { value: "marketplace", label: "Marketplace" },
        { value: "ecommerce", label: "E-commerce" },
        { value: "freemium", label: "Freemium" },
        { value: "service", label: "Service / Agency" },
        { value: "other", label: "Other" },
      ],
    },
  ],
  other: [
    { id: "description", label: "Describe what you need", type: "textarea", placeholder: "Tell us what you want to accomplish...", required: true },
    {
      id: "format", label: "Desired Output Format", type: "select", default: "text",
      options: [
        { value: "text", label: "Text" },
        { value: "structured", label: "Structured" },
        { value: "list", label: "List" },
        { value: "table", label: "Table" },
      ],
    },
    { id: "tone", label: "Preferred Tone", type: "text", placeholder: "e.g. friendly, professional" },
  ],
};

export function getQuestions(taskType: TaskType): Question[] {
  return QUESTIONS[taskType] || [];
}