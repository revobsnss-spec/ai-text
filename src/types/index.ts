export type TaskType =
  | "image"
  | "video"
  | "website"
  | "app"
  | "logo"
  | "advertisement"
  | "social"
  | "writing"
  | "marketing"
  | "programming"
  | "business"
  | "other";

export type AIPlatform =
  | "chatgpt"
  | "gemini"
  | "claude"
  | "midjourney"
  | "gpt-image"
  | "flux"
  | "veo"
  | "kling"
  | "runway"
  | "leonardo";

export type PromptLevel = "basic" | "professional" | "expert";

export type QuestionType = "text" | "textarea" | "select" | "multiselect" | "radio" | "slider";

export interface QuestionOption {
  value: string;
  label: string;
  description?: string;
}

export interface Question {
  id: string;
  label: string;
  description?: string;
  type: QuestionType;
  options?: QuestionOption[];
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  default?: string | string[] | number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "user" | "admin";
  createdAt: string;
  preferences?: {
    language: "en" | "ar";
    theme: "light" | "dark" | "system";
    notifications: boolean;
  };
}

export interface GeneratedPrompt {
  id: string;
  userId: string;
  taskType: TaskType;
  platform: AIPlatform;
  answers: Record<string, string | string[] | number>;
  prompts: {
    basic: string;
    professional: string;
    expert: string;
  };
  isFavorite: boolean;
  createdAt: string;
  title?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface WizardState {
  step: number;
  taskType: TaskType | null;
  platform: AIPlatform | null;
  answers: Record<string, string | string[] | number>;
  isGenerating: boolean;
  result: GeneratedPrompt["prompts"] | null;
}