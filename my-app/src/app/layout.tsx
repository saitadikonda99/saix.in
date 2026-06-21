import type { Metadata } from "next";
import { Merriweather, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/providers";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

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

const siteDescription =
  "Tadikonda Sai Manikanta is a Full-Stack Developer specializing in Next.js, React, Node.js, and Python. Building high-performance, scalable web applications.";

export const metadata: Metadata = {
  metadataBase: new URL("https://saix.in"),
  title: "Tadikonda Sai Manikanta — Full-Stack Developer",
  description: siteDescription,
  keywords: [
    "Tadikonda Sai Manikanta",
    "Sai Manikanta",
    "Sai Tadikonda",
    "Full-Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "Python Developer",
    "Web Developer India",
  ],
  authors: [{ name: "Tadikonda Sai Manikanta", url: "https://saix.in" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Tadikonda Sai Manikanta — Full-Stack Developer",
    description: siteDescription,
    url: "https://saix.in",
    siteName: "Tadikonda Sai Manikanta's Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@sai_tadikonda_",
    title: "Tadikonda Sai Manikanta — Full-Stack Developer",
    description: siteDescription,
  },
  robots: { index: true, follow: true },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Tadikonda Sai Manikanta",
  alternateName: "Sai Tadikonda",
  url: "https://saix.in",
  jobTitle: "Full-Stack Developer",
  knowsAbout: [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "React",
    "Next.js",
    "Node.js",
    "Git",
    "Docker",
    "MySQL",
    "Redis",
  ],
  sameAs: [
    "https://github.com/saitadikonda99",
    "https://linkedin.com/in/tadikondasaimanikanta",
    "https://x.com/sai_tadikonda_",
    "https://dev.to/saitadikonda99",
    "https://instagram.com/saixdotin",
  ],
  email: "saitadikonda.dev@gmail.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className={`${merriweather.variable} ${robotoMono.variable} antialiased`}>
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
