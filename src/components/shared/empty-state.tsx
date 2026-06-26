import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Wand2 } from "lucide-react";

export function EmptyState({
  icon: Icon = Wand2,
  title,
  description,
  cta,
  href = "/dashboard",
}: {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  cta?: string;
  href?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-dashed border-border bg-card/50 py-20 px-6 text-center"
    >
      <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-pink-500/20 grid place-items-center mb-5">
        <Icon className="h-7 w-7 text-primary" />
      </div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">{description}</p>
      {cta && (
        <Button asChild>
          <Link href={href}>
            <Sparkles className="h-4 w-4" /> {cta}
          </Link>
        </Button>
      )}
    </motion.div>
  );
}