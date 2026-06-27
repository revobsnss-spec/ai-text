"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore } from "@/lib/store/auth";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.ok) {
      toast.success("أهلاً بعودتك!");
      router.push("/dashboard");
    } else {
      toast.error(result.error || "فشل تسجيل الدخول");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="border-border/60 shadow-2xl shadow-primary/5">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">أهلاً بعودتك</h1>
            <p className="text-sm text-muted-foreground mt-2">سجّل دخول إلى حسابك في AI TEXT</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <div className="relative mt-1.5">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pe-10"
                  required
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">كلمة المرور</Label>
              <div className="relative mt-1.5">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={show ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="px-10"
                  required
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={show ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> جارٍ تسجيل الدخول…
                </>
              ) : (
                <>
                  تسجيل الدخول <ArrowLeft className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <p className="mt-6 text-sm text-center text-muted-foreground">
            ليس لديك حساب؟{" "}
            <Link href="/register" className="font-semibold text-primary hover:underline">
              أنشئ حساباً
            </Link>
          </p>
        </CardContent>
      </Card>

      <p className="mt-4 text-xs text-center text-muted-foreground">
        💡 نصيحة: استخدم بريداً يحتوي على كلمة <code className="px-1.5 py-0.5 rounded bg-muted" dir="ltr">admin</code> (مثل <code className="px-1.5 py-0.5 rounded bg-muted" dir="ltr">admin@aitext.com</code>) لفتح لوحة تحكم الأدمن.
      </p>
    </motion.div>
  );
}