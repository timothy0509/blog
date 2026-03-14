import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={`antialiased min-h-screen flex flex-col font-[family-name:var(--font-inter)] bg-[#fafafa] text-zinc-900 selection:bg-zinc-900 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}