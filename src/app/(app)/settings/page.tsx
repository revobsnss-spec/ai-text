"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Bell, Palette, Globe, Trash2, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/lib/store/auth";
import { usePromptStore } from "@/lib/store/prompts";
import { useTheme } from "next-themes";

export default function SettingsPage() {
  const { user, updateProfile } = useAuthStore();
  const { clearAll, prompts } = usePromptStore();
  const { theme, setTheme } = useTheme();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [notifications, setNotifications] = useState(user?.preferences?.notifications ?? true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setNotifications(user.preferences?.notifications ?? true);
    }
  }, [user]);

  if (!user) return null;

  const onSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    updateProfile({
      name,
      email,
      preferences: {
        notifications,
        language: "ar",
        theme: (theme as any) ?? "system",
      },
    });
    setSaving(false);
    toast.success("تم حفظ الإعدادات");
  };

  const onClearHistory = () => {
    if (confirm("هل تريد حذف جميع البرومبتات من سجلك؟ لا يمكن التراجع عن هذا.")) {
      clearAll();
      toast.success("تم مسح السجل");
    }
  };

  const initials = name.split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="container max-w-3xl py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">الإعدادات</h1>
        <p className="text-sm text-muted-foreground">إدارة حسابك وتفضيلاتك</p>
      </motion.div>

      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" /> الملف الشخصي
              </CardTitle>
              <CardDescription>تحديث معلوماتك الشخصية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg">{initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs text-muted-foreground" dir="ltr">{user.email}</p>
                  <Badge variant={user.role === "admin" ? "gradient" : "secondary"} className="mt-1">
                    {user.role === "admin" ? "مسؤول" : "مستخدم"}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="settings-name">الاسم الكامل</Label>
                  <Input
                    id="settings-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="settings-email">البريد الإلكتروني</Label>
                  <Input
                    id="settings-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5"
                    dir="ltr"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" /> المظهر
              </CardTitle>
              <CardDescription>خصص كيف يبدو AI TEXT لك</CardDescription>
            </CardHeader>
            <CardContent>
              <Label className="mb-3 block">السمة</Label>
              <div className="grid grid-cols-3 gap-2">
                {(["light", "dark", "system"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                      theme === t
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    {t === "light" ? "فاتح" : t === "dark" ? "داكن" : "النظام"}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" /> التفضيلات
              </CardTitle>
              <CardDescription>الإشعارات</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">إشعارات البريد الإلكتروني</p>
                  <p className="text-xs text-muted-foreground">تلقي تحديثات المنتج والنصائح</p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trash2 className="h-5 w-5 text-destructive" /> البيانات
              </CardTitle>
              <CardDescription>إدارة بياناتك المحلية</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 rounded-xl border border-destructive/30 bg-destructive/5">
                <div>
                  <p className="font-medium text-sm">مسح سجل البرومبتات</p>
                  <p className="text-xs text-muted-foreground">
                    حذف جميع الـ {prompts.length} برومبت من التخزين المحلي. ستُحذف المفضلة أيضاً.
                  </p>
                </div>
                <Button variant="destructive" size="sm" onClick={onClearHistory}>
                  مسح الكل
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="flex justify-end"
        >
          <Button onClick={onSave} size="lg" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> جارٍ الحفظ…
              </>
            ) : (
              <>
                <Save className="h-4 w-4" /> حفظ التغييرات
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}