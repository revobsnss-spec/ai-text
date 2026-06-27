import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Toaster } from "@/components/shared/toaster";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-text.app"),
  title: {
    default: "AI TEXT — أنشئ برومبتات مثالية لأي ذكاء اصطناعي",
    template: "%s | AI TEXT",
  },
  description:
    "AI TEXT هي المنصة الأكثر تطوراً لهندسة البرومبتات. أنشئ برومبتات مثالية ومحسّنة لـ ChatGPT و Midjourney و Claude والمزيد — في ثوانٍ.",
  keywords: [
    "مولد البرومبتات",
    "هندسة البرومبتات",
    "برومبتات ChatGPT",
    "برومبتات Midjourney",
    "أدوات الذكاء الاصطناعي",
  ],
  authors: [{ name: "AI TEXT" }],
  creator: "AI TEXT",
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "https://ai-text.app",
    title: "AI TEXT — منصة هندسة البرومبتات",
    description: "أنشئ برومبتات مثالية لأي ذكاء اصطناعي — بدون خبرة تقنية.",
    siteName: "AI TEXT",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI TEXT — أنشئ برومبتات AI مثالية",
    description: "الطريقة الأذكى لهندسة البرومبتات.",
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
    <html lang="ar" dir="rtl" suppressHydrationWarning className={cairo.variable}>
      <body className="font-sans antialiased min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}