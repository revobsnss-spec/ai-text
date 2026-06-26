"use client";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function StatsCard({
  icon: Icon,
  label,
  value,
  trend,
  color = "from-primary to-pink-500",
  index = 0,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: { value: number; positive: boolean };
  color?: string;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="hover:shadow-lg transition-shadow overflow-hidden">
        <div className={`h-1 bg-gradient-to-r ${color}`} />
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${color} grid place-items-center text-white shadow-lg`}>
              <Icon className="h-5 w-5" strokeWidth={2.2} />
            </div>
            {trend && (
              <span className={`text-xs font-semibold ${trend.positive ? "text-emerald-500" : "text-red-500"}`}>
                {trend.positive ? "+" : ""}{trend.value}%
              </span>
            )}
          </div>
          <div className="text-3xl font-bold tracking-tight">{value}</div>
          <div className="text-sm text-muted-foreground mt-1">{label}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
}