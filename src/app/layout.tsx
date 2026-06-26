import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Toaster } from "@/components/shared/toaster";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL("https://aitext.app"),
  title: {
    default: "AI TEXT — Generate Perfect Prompts for Any AI",
    template: "%s | AI TEXT",
  },
  description:
    "AI TEXT is the most advanced AI prompt engineering platform. Generate perfect, platform-optimized prompts for ChatGPT, Midjourney, Claude and more — in seconds.",
  keywords: [
    "AI prompt generator",
    "prompt engineering",
    "ChatGPT prompts",
    "Midjourney prompts",
    "Claude prompts",
    "AI tools",
    "prompt templates",
  ],
  authors: [{ name: "AI TEXT" }],
  creator: "AI TEXT",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aitext.app",
    title: "AI TEXT — Advanced AI Prompt Engineering",
    description: "Generate perfect prompts for any AI system — without technical knowledge.",
    siteName: "AI TEXT",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI TEXT — Generate Perfect AI Prompts",
    description: "The smartest way to engineer AI prompts.",
    creator: "@aitext",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="font-sans antialiased min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}