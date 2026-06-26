"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  History,
  Heart,
  Settings,
  Shield,
  LogOut,
  Menu,
  X,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { useAuthStore } from "@/lib/store/auth";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Generator", icon: Wand2 },
  { href: "/history", label: "History", icon: History },
  { href: "/favorites", label: "Favorites", icon: Heart },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  const initials = user
    ? user.name
        .split(" ")
        .map((s) => s[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "glass border-b border-border/60 shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Logo />
          {user && (
            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors flex items-center gap-2",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-lg bg-accent"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className={cn(
                    "relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors flex items-center gap-2",
                    pathname.startsWith("/admin")
                      ? "text-foreground bg-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <Shield className="h-4 w-4" />
                  Admin
                </Link>
              )}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 rounded-full p-1 hover:bg-accent transition-colors"
                aria-label="Account menu"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                </Avatar>
              </button>
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-64 rounded-xl border border-border bg-popover p-2 shadow-xl"
                  >
                    <div className="px-3 py-2 border-b border-border mb-2">
                      <p className="text-sm font-semibold">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      {user.role === "admin" && (
                        <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                          <Shield className="h-3 w-3" /> Admin
                        </span>
                      )}
                    </div>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-accent"
                    >
                      <LayoutDashboard className="h-4 w-4" /> Dashboard
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-accent"
                    >
                      <Settings className="h-4 w-4" /> Settings
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        router.push("/");
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-accent text-destructive"
                    >
                      <LogOut className="h-4 w-4" /> Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">Get started</Link>
              </Button>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background overflow-hidden"
          >
            <nav className="container py-4 flex flex-col gap-1">
              {user ? (
                <>
                  {NAV_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium",
                        pathname.startsWith(item.href)
                          ? "bg-accent text-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  ))}
                  {user.role === "admin" && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                    >
                      <Shield className="h-4 w-4" /> Admin
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link href="/login" className="px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-accent">
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    className="px-3 py-2.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground text-center"
                  >
                    Get started
                  </Link>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}