"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth";
import { Loader2 } from "lucide-react";

export function AuthGuard({ children, adminOnly = false }: { children: React.ReactNode; adminOnly?: boolean }) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    // Zustand persist hydrates async; small delay to be safe
    const t = setTimeout(() => {
      const u = useAuthStore.getState().user;
      if (!u) {
        router.replace("/login");
      } else if (adminOnly && u.role !== "admin") {
        router.replace("/dashboard");
      }
    }, 50);
    return () => clearTimeout(t);
  }, [router, adminOnly]);

  if (!user) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (adminOnly && user.role !== "admin") {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <p className="text-muted-foreground">Admin access required.</p>
      </div>
    );
  }

  return <>{children}</>;
}