import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { Github, Twitter, Linkedin, Sparkles } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border/60 bg-background/50 backdrop-blur-sm">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
              المنصة الأكثر تطوراً لهندسة البرومبتات. أنشئ برومبتات مثالية لأي ذكاء اصطناعي في ثوانٍ معدودة.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <Link href="#" className="h-9 w-9 rounded-lg border border-border bg-background hover:bg-accent grid place-items-center transition-colors">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="#" className="h-9 w-9 rounded-lg border border-border bg-background hover:bg-accent grid place-items-center transition-colors">
                <Github className="h-4 w-4" />
              </Link>
              <Link href="#" className="h-9 w-9 rounded-lg border border-border bg-background hover:bg-accent grid place-items-center transition-colors">
                <Linkedin className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">المنتج</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="/#features" className="hover:text-foreground transition-colors">المميزات</Link></li>
              <li><Link href="/dashboard" className="hover:text-foreground transition-colors">المولّد</Link></li>
              <li><Link href="/#platforms" className="hover:text-foreground transition-colors">المنصات</Link></li>
              <li><Link href="/#pricing" className="hover:text-foreground transition-colors">الأسعار</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">الشركة</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition-colors">من نحن</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">المدونة</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">الوظائف</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">اتصل بنا</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">قانوني</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition-colors">الخصوصية</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">الشروط</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">الكوكيز</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">الأمان</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between gap-4 text-sm text-muted-foreground">
          <p>© {year} AI TEXT. جميع الحقوق محفوظة.</p>
          <p className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            صُنع للمبدعين والمؤسسين والمهندسين.
          </p>
        </div>
      </div>
    </footer>
  );
}