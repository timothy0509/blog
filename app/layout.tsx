import type { Metadata } from "next";
import { DM_Sans, Playfair_Display, Geist_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Timothy | CTF Writeups",
  description: "CTF writeups and security research by Timothy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable} ${geistMono.variable}`}>
      <body className={`antialiased min-h-screen flex flex-col font-[family-name:var(--font-dm-sans)] bg-[#fafafa] text-zinc-900 selection:bg-zinc-900 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}