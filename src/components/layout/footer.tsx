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
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              The most advanced AI prompt engineering platform. Generate perfect prompts for any AI in seconds.
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
            <h4 className="font-semibold mb-4 text-sm">Product</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="/#features" className="hover:text-foreground transition-colors">Features</Link></li>
              <li><Link href="/dashboard" className="hover:text-foreground transition-colors">Generator</Link></li>
              <li><Link href="/#platforms" className="hover:text-foreground transition-colors">Platforms</Link></li>
              <li><Link href="/#pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Company</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Legal</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition-colors">Privacy</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Terms</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Cookies</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between gap-4 text-sm text-muted-foreground">
          <p>© {year} AI TEXT. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Built for creators, founders & engineers.
          </p>
        </div>
      </div>
    </footer>
  );
}