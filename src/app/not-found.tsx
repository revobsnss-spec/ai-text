import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] grid place-items-center px-4">
      <div className="text-center max-w-md">
        <div className="text-7xl md:text-8xl font-bold text-gradient mb-3">404</div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">الصفحة غير موجودة</h1>
        <p className="text-muted-foreground mb-6">
          الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <Button asChild>
          <Link href="/">
            <Home className="h-4 w-4" /> العودة للرئيسية
          </Link>
        </Button>
      </div>
    </div>
  );
}