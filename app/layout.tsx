import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { TabsProvider } from "@/components/TabsContext";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { site } from "@/data/site";

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["500"],
});

const siteUrl = "https://drorbrook.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} - ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.pitch,
  keywords: [
    "Dror Brook",
    "engineering manager",
    "engineering leadership",
    "mentoring",
    "podcast",
    "Beyond the Sprint",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${site.name} - ${site.tagline}`,
    description: site.pitch,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} - ${site.tagline}`,
    description: site.pitch,
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="flex min-h-screen flex-col font-sans">
        <div className="bg-aurora" aria-hidden="true" />
        <div className="bg-grain" aria-hidden="true" />
        <a
          href="#sections"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:border focus:border-border focus:bg-surface focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <TabsProvider>
            <Nav />
            <main className="flex-1">{children}</main>
            <Footer />
          </TabsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
