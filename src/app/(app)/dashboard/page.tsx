import { PromptWizard } from "@/components/wizard/prompt-wizard";

export const metadata = {
  title: "Prompt Generator",
  description: "Generate perfect AI prompts in 3 simple steps.",
};

export default function DashboardPage() {
  return <PromptWizard />;
}