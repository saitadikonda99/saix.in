import type { Metadata } from "next";
import { Merriweather, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/providers";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "@/components/header/header";

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Tadikonda Sai Manikanta's Portfolio",
  description:
    "Tadikonda Sai Manikanta, a Full-Stack Developer passionate about crafting high-performance, scalable web applications. With expertise in Next.js, React, Node.js, and Go.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${merriweather.variable} ${robotoMono.variable} antialiased`}>
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
        <Header />
      </body>
    </html>
  );
}
