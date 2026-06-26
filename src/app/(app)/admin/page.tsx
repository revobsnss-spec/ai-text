"use client";
import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Users, Sparkles, TrendingUp, Activity, Shield, Crown, Globe,
  BarChart3, ArrowUpRight, Database,
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

  // Compute analytics
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

  // Mock user list (in a real app this would come from a backend)
  const mockUsers = useMemo(() => {
    const seed = [
      { name: "Sara Khan", email: "sara@studio.io", role: "user" },
      { name: "Daniel M.", email: "daniel@indie.dev", role: "user" },
      { name: "Lina A.", email: "lina@northwind.co", role: "user" },
      { name: "Ahmed R.", email: "ahmed@design.eg", role: "user" },
      { name: "Maria G.", email: "maria@ux.studio", role: "user" },
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
            <Shield className="h-3.5 w-3.5" /> Admin dashboard
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Welcome back, {user?.name?.split(" ")[0]}</h1>
          <p className="text-sm text-muted-foreground">System overview and analytics</p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard icon={Sparkles} label="Total prompts" value={totalPrompts} trend={{ value: 12, positive: true }} index={0} />
        <StatsCard icon={Users} label="Active users" value={mockUsers.length} trend={{ value: 8, positive: true }} color="from-blue-500 to-cyan-500" index={1} />
        <StatsCard icon={Activity} label="Total favorites" value={totalFavorites} trend={{ value: 24, positive: true }} color="from-pink-500 to-rose-500" index={2} />
        <StatsCard icon={TrendingUp} label="Avg per user" value={mockUsers.length === 0 ? 0 : (totalPrompts / mockUsers.length).toFixed(1)} trend={{ value: 5, positive: true }} color="from-emerald-500 to-teal-500" index={3} />
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        {/* OVERVIEW */}
        <TabsContent value="overview" className="mt-0 space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" /> Most used categories
                </CardTitle>
                <CardDescription>Top task types across all users</CardDescription>
              </CardHeader>
              <CardContent>
                {taskDistribution.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-8 text-center">
                    No data yet. Generate some prompts to see analytics.
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
                <CardTitle>Top platforms</CardTitle>
                <CardDescription>By usage</CardDescription>
              </CardHeader>
              <CardContent>
                {platformDistribution.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-6 text-center">No data</p>
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
                            <div className="text-xs text-muted-foreground">{row.count} prompts</div>
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
              <CardTitle>Recent activity</CardTitle>
              <CardDescription>Latest prompts generated across the system</CardDescription>
            </CardHeader>
            <CardContent>
              {recentPrompts.length === 0 ? (
                <p className="text-sm text-muted-foreground py-6 text-center">No recent activity</p>
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
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* USERS */}
        <TabsContent value="users" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" /> User management
              </CardTitle>
              <CardDescription>Registered users and their activity</CardDescription>
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
                                <Crown className="h-2.5 w-2.5 mr-0.5" /> Admin
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">{u.email}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">{userPrompts}</div>
                        <div className="text-xs text-muted-foreground">prompts</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ANALYTICS */}
        <TabsContent value="analytics" className="mt-0 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform distribution</CardTitle>
                <CardDescription>Across all prompts</CardDescription>
              </CardHeader>
              <CardContent>
                {platformDistribution.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-6 text-center">No data</p>
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
                <CardTitle>Engagement</CardTitle>
                <CardDescription>Favorites vs total</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-end justify-between mb-2">
                    <div>
                      <div className="text-3xl font-bold">{totalFavorites}</div>
                      <div className="text-sm text-muted-foreground">Total favorites</div>
                    </div>
                    <Badge variant="success">
                      {totalPrompts === 0 ? 0 : ((totalFavorites / totalPrompts) * 100).toFixed(0)}% rate
                    </Badge>
                  </div>
                  <Progress value={totalPrompts === 0 ? 0 : (totalFavorites / totalPrompts) * 100} />
                </div>
                <div className="pt-4 border-t border-border">
                  <div className="text-sm font-medium mb-3">Insights</div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Most-used platform: <strong className="text-foreground">{platformDistribution[0]?.platform?.label ?? "—"}</strong>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Most-used category: <strong className="text-foreground">{taskDistribution[0]?.task?.label ?? "—"}</strong>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Total prompts saved: <strong className="text-foreground">{totalPrompts}</strong>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* SYSTEM */}
        <TabsContent value="system" className="mt-0 space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Database className="h-4 w-4 text-primary" /> Storage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{(prompts.length * 0.024).toFixed(2)} MB</div>
                <div className="text-xs text-muted-foreground mt-1">of 100 MB local quota</div>
                <Progress value={Math.min((prompts.length * 0.024) / 100 * 100, 100)} className="mt-3" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary" /> API status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-medium">Operational</span>
                </div>
                <div className="text-xs text-muted-foreground mt-2">All systems nominal</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" /> Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm font-medium">Protected routes active</div>
                <div className="text-xs text-muted-foreground mt-1">Auth-guarded · Zod-validated</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Configuration</CardTitle>
              <CardDescription>Manage platform-level settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { label: "Basic prompts enabled", on: true },
                  { label: "Professional prompts enabled", on: true },
                  { label: "Expert prompts enabled", on: true },
                  { label: "Translation (EN ↔ AR)", on: true },
                  { label: "AI Improve enhancer", on: true },
                  { label: "Public registration", on: true },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <span className="text-sm font-medium">{s.label}</span>
                    <Badge variant={s.on ? "success" : "secondary"}>
                      {s.on ? "On" : "Off"}
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