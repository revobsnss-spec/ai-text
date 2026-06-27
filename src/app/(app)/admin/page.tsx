"use client";
import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Users, Sparkles, TrendingUp, Activity, Shield, Crown, Globe,
  BarChart3, ArrowUpLeft, Database,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatsCard } from "@/components/admin/stats-card";
import { usePromptStore } from "@/lib/store/prompts";
import { useAuthStore } from "@/lib/store/auth";
import { TASK_TYPES, AI_PLATFORMS } from "@/lib/prompts/tasks";
import { relativeTime } from "@/lib/utils";

export default function AdminPage() {
  const { prompts } = usePromptStore();
  const { user } = useAuthStore();

  const totalPrompts = prompts.length;
  const totalFavorites = prompts.filter((p) => p.isFavorite).length;
  const taskDistribution = useMemo(() => {
    const map = new Map<string, number>();
    prompts.forEach((p) => map.set(p.taskType, (map.get(p.taskType) ?? 0) + 1));
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([id, count]) => ({
        task: TASK_TYPES.find((t) => t.id === id),
        count,
        pct: totalPrompts === 0 ? 0 : (count / totalPrompts) * 100,
      }));
  }, [prompts, totalPrompts]);

  const platformDistribution = useMemo(() => {
    const map = new Map<string, number>();
    prompts.forEach((p) => map.set(p.platform, (map.get(p.platform) ?? 0) + 1));
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([id, count]) => ({
        platform: AI_PLATFORMS.find((p) => p.id === id),
        count,
        pct: totalPrompts === 0 ? 0 : (count / totalPrompts) * 100,
      }));
  }, [prompts, totalPrompts]);

  const mockUsers = useMemo(() => {
    const seed = [
      { name: "سارة خان", email: "sara@studio.io", role: "user" },
      { name: "دانيال م.", email: "daniel@indie.dev", role: "user" },
      { name: "لينا أ.", email: "lina@northwind.co", role: "user" },
      { name: "أحمد ر.", email: "ahmed@design.eg", role: "user" },
      { name: "ماريا ج.", email: "maria@ux.studio", role: "user" },
    ];
    if (user) seed.unshift({ name: user.name, email: user.email, role: user.role });
    return seed;
  }, [user]);

  const recentPrompts = prompts.slice(0, 6);

  return (
    <div className="container max-w-7xl py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-start justify-between gap-4"
      >
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold mb-3 text-primary">
            <Shield className="h-3.5 w-3.5" /> لوحة تحكم المسؤول
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">أهلاً بعودتك، {user?.name?.split(" ")[0]}</h1>
          <p className="text-sm text-muted-foreground">نظرة عامة على النظام والتحليلات</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard icon={Sparkles} label="إجمالي البرومبتات" value={totalPrompts} trend={{ value: 12, positive: true }} index={0} />
        <StatsCard icon={Users} label="المستخدمون النشطون" value={mockUsers.length} trend={{ value: 8, positive: true }} color="from-blue-500 to-cyan-500" index={1} />
        <StatsCard icon={Activity} label="إجمالي المفضلة" value={totalFavorites} trend={{ value: 24, positive: true }} color="from-pink-500 to-rose-500" index={2} />
        <StatsCard icon={TrendingUp} label="المتوسط لكل مستخدم" value={mockUsers.length === 0 ? 0 : (totalPrompts / mockUsers.length).toFixed(1)} trend={{ value: 5, positive: true }} color="from-emerald-500 to-teal-500" index={3} />
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="overview">النظرة العامة</TabsTrigger>
          <TabsTrigger value="users">المستخدمون</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
          <TabsTrigger value="system">النظام</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0 space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" /> الفئات الأكثر استخداماً
                </CardTitle>
                <CardDescription>أعلى أنواع المهام عبر جميع المستخدمين</CardDescription>
              </CardHeader>
              <CardContent>
                {taskDistribution.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-8 text-center">
                    لا توجد بيانات بعد. ولّد بعض البرومبتات لرؤية التحليلات.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {taskDistribution.slice(0, 6).map((row, i) => (
                      <motion.div
                        key={row.task?.id ?? i}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <div className="flex items-center justify-between text-sm mb-1.5">
                          <span className="font-medium">{row.task?.label ?? row.task?.id}</span>
                          <span className="text-muted-foreground">{row.count}</span>
                        </div>
                        <Progress value={row.pct} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>أفضل المنصات</CardTitle>
                <CardDescription>حسب الاستخدام</CardDescription>
              </CardHeader>
              <CardContent>
                {platformDistribution.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-6 text-center">لا توجد بيانات</p>
                ) : (
                  <div className="space-y-3">
                    {platformDistribution.slice(0, 5).map((row) => (
                      <div key={row.platform?.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-pink-500 grid place-items-center text-white text-xs font-bold">
                            {row.platform?.label.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-sm font-medium">{row.platform?.label}</div>
                            <div className="text-xs text-muted-foreground">{row.count} برومبت</div>
                          </div>
                        </div>
                        <Badge variant="secondary">{row.pct.toFixed(0)}%</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>النشاط الأخير</CardTitle>
              <CardDescription>أحدث البرومبتات المولّدة في النظام</CardDescription>
            </CardHeader>
            <CardContent>
              {recentPrompts.length === 0 ? (
                <p className="text-sm text-muted-foreground py-6 text-center">لا يوجد نشاط حديث</p>
              ) : (
                <div className="space-y-2">
                  {recentPrompts.map((p) => {
                    const t = TASK_TYPES.find((x) => x.id === p.taskType);
                    const pl = AI_PLATFORMS.find((x) => x.id === p.platform);
                    return (
                      <div key={p.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className={`h-9 w-9 rounded-lg bg-gradient-to-br ${t?.color ?? "from-slate-500 to-slate-600"} grid place-items-center text-white text-xs font-bold shrink-0`}>
                            {t?.label?.[0] ?? "?"}
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-medium truncate">
                              {t?.label} · {pl?.label}
                            </div>
                            <div className="text-xs text-muted-foreground">{relativeTime(p.createdAt)}</div>
                          </div>
                        </div>
                        <ArrowUpLeft className="h-4 w-4 text-muted-foreground" />
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" /> إدارة المستخدمين
              </CardTitle>
              <CardDescription>المستخدمون المسجلون ونشاطهم</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockUsers.map((u, i) => {
                  const userPrompts = i === 0 && user ? prompts.filter((p) => p.userId === user.id).length : Math.floor(Math.random() * 30) + 5;
                  const initials = u.name.split(" ").map((s) => s[0]).join("").slice(0, 2);
                  return (
                    <motion.div
                      key={u.email}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium flex items-center gap-2">
                            {u.name}
                            {u.role === "admin" && (
                              <Badge variant="gradient" className="text-[10px] h-4 px-1.5">
                                <Crown className="h-2.5 w-2.5 ml-0.5" /> مسؤول
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground" dir="ltr">{u.email}</div>
                        </div>
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-semibold">{userPrompts}</div>
                        <div className="text-xs text-muted-foreground">برومبت</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-0 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>توزيع المنصات</CardTitle>
                <CardDescription>عبر جميع البرومبتات</CardDescription>
              </CardHeader>
              <CardContent>
                {platformDistribution.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-6 text-center">لا توجد بيانات</p>
                ) : (
                  <div className="space-y-4">
                    {platformDistribution.map((row) => (
                      <div key={row.platform?.id}>
                        <div className="flex items-center justify-between text-sm mb-1.5">
                          <span className="font-medium">{row.platform?.label}</span>
                          <span className="text-muted-foreground">{row.count}</span>
                        </div>
                        <Progress value={row.pct} />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>التفاعل</CardTitle>
                <CardDescription>المفضلة مقارنة بالإجمالي</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-end justify-between mb-2">
                    <div>
                      <div className="text-3xl font-bold">{totalFavorites}</div>
                      <div className="text-sm text-muted-foreground">إجمالي المفضلة</div>
                    </div>
                    <Badge variant="success">
                      {totalPrompts === 0 ? 0 : ((totalFavorites / totalPrompts) * 100).toFixed(0)}% معدل
                    </Badge>
                  </div>
                  <Progress value={totalPrompts === 0 ? 0 : (totalFavorites / totalPrompts) * 100} />
                </div>
                <div className="pt-4 border-t border-border">
                  <div className="text-sm font-medium mb-3">رؤى</div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      المنصة الأكثر استخداماً: <strong className="text-foreground">{platformDistribution[0]?.platform?.label ?? "—"}</strong>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      الفئة الأكثر استخداماً: <strong className="text-foreground">{taskDistribution[0]?.task?.label ?? "—"}</strong>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      إجمالي البرومبتات المحفوظة: <strong className="text-foreground">{totalPrompts}</strong>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system" className="mt-0 space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Database className="h-4 w-4 text-primary" /> التخزين
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{(prompts.length * 0.024).toFixed(2)} م.ب</div>
                <div className="text-xs text-muted-foreground mt-1">من 100 م.ب حصة محلية</div>
                <Progress value={Math.min((prompts.length * 0.024) / 100 * 100, 100)} className="mt-3" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary" /> حالة API
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-medium">يعمل</span>
                </div>
                <div className="text-xs text-muted-foreground mt-2">جميع الأنظمة سليمة</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" /> الأمان
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm font-medium">الصفحات المحمية مفعلة</div>
                <div className="text-xs text-muted-foreground mt-1">محمي بالمصادقة · التحقق بـ Zod</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>الإعدادات</CardTitle>
              <CardDescription>إدارة إعدادات مستوى المنصة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { label: "البرومبتات الأساسية", on: true },
                  { label: "البرومبتات الاحترافية", on: true },
                  { label: "البرومبتات على مستوى الخبراء", on: true },
                  { label: "الترجمة (عربي ↔ إنجليزي)", on: true },
                  { label: "محسّن AI", on: true },
                  { label: "التسجيل العام", on: true },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <span className="text-sm font-medium">{s.label}</span>
                    <Badge variant={s.on ? "success" : "secondary"}>
                      {s.on ? "مفعّل" : "معطّل"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}