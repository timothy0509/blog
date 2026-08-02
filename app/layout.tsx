import type { Metadata } from 'next';
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import 'katex/dist/katex.min.css';
import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { AnimatedMain } from '@/components/animations/AnimatedLayout';
import { config } from '@/lib/config';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '700'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
});

const displayFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | SYJC CTF Writeups',
    default: 'SYJC CTF Writeups',
  },
  description: 'CTF writeups from Sing Yin Jockey Club - capturing flags together.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: config.site.url,
    siteName: config.site.name,
    title: 'SYJC CTF Writeups',
    description: 'CTF writeups from Sing Yin Jockey Club - capturing flags together.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SYJC CTF Writeups',
    description: 'CTF writeups from Sing Yin Jockey Club - capturing flags together.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-h-screen flex flex-col selection:bg-[#DFE104] selection:text-black noise-overlay bg-graph-paper ${jetbrainsMono.variable} ${spaceGrotesk.variable} ${displayFont.variable} font-sans`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SiteHeader />
        <AnimatedMain>
          {children}
        </AnimatedMain>
        <SiteFooter />
      </body>
    </html>
  );
}
