import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AuthGuard } from "@/components/layout/auth-guard";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <AuthGuard>{children}</AuthGuard>
      </main>
      <Footer />
    </div>
  );
}