import { Header } from "@/components/layout/header";
import { AuroraBackground } from "@/components/landing/aurora-background";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="relative flex-1 grid place-items-center py-12 px-4">
        <AuroraBackground />
        <div className="relative w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}