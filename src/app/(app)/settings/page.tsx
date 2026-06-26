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
  const [language, setLanguage] = useState<"en" | "ar">(user?.preferences?.language ?? "en");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setNotifications(user.preferences?.notifications ?? true);
      setLanguage(user.preferences?.language ?? "en");
    }
  }, [user]);

  if (!user) return null;

  const onSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    updateProfile({
      name,
      email,
      preferences: { notifications, language, theme: (theme as any) ?? "system" },
    });
    setSaving(false);
    toast.success("Settings saved");
  };

  const onClearHistory = () => {
    if (confirm("Delete all prompts from your history? This cannot be undone.")) {
      clearAll();
      toast.success("History cleared");
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
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
      </motion.div>

      <div className="space-y-6">
        {/* Profile */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" /> Profile
              </CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg">{initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                  <Badge variant={user.role === "admin" ? "gradient" : "secondary"} className="mt-1">
                    {user.role === "admin" ? "Admin" : "User"}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="settings-name">Full name</Label>
                  <Input
                    id="settings-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="settings-email">Email</Label>
                  <Input
                    id="settings-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Appearance */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" /> Appearance
              </CardTitle>
              <CardDescription>Customize how AI TEXT looks for you</CardDescription>
            </CardHeader>
            <CardContent>
              <Label className="mb-3 block">Theme</Label>
              <div className="grid grid-cols-3 gap-2">
                {(["light", "dark", "system"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`p-3 rounded-xl border text-sm font-medium capitalize transition-all ${
                      theme === t
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Preferences */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" /> Preferences
              </CardTitle>
              <CardDescription>Notifications and language</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Email notifications</p>
                  <p className="text-xs text-muted-foreground">Receive product updates and tips</p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>

              <Separator />

              <div>
                <Label className="mb-3 block flex items-center gap-2">
                  <Globe className="h-4 w-4" /> Default language
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {(["en", "ar"] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLanguage(l)}
                      className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                        language === l
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/40"
                      }`}
                    >
                      {l === "en" ? "English" : "العربية (Arabic)"}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Data */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trash2 className="h-5 w-5 text-destructive" /> Data
              </CardTitle>
              <CardDescription>Manage your local data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 rounded-xl border border-destructive/30 bg-destructive/5">
                <div>
                  <p className="font-medium text-sm">Clear prompt history</p>
                  <p className="text-xs text-muted-foreground">
                    Delete all {prompts.length} prompt{prompts.length !== 1 && "s"} from your local storage. Favorites will also be removed.
                  </p>
                </div>
                <Button variant="destructive" size="sm" onClick={onClearHistory}>
                  Clear all
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Save */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="flex justify-end"
        >
          <Button onClick={onSave} size="lg" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Saving…
              </>
            ) : (
              <>
                <Save className="h-4 w-4" /> Save changes
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}