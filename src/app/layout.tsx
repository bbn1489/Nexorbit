import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexorbit — Launch into the Future of Building",
  description: "Nexorbit empowers teams to ship products at lightspeed. AI-powered workflows, real-time collaboration, and infrastructure that scales beyond the stars.",
  keywords: ["SaaS", "platform", "AI", "developer tools", "deployment", "infrastructure"],
  openGraph: {
    title: "Nexorbit — Launch into the Future of Building",
    description: "AI-powered workflows, real-time collaboration, and infrastructure that scales beyond the stars.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
