import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "@/components/layout/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://emipro-calculator.netlify.app"),
  title: {
    default: "EMIPro - Free EMI Calculator for Home, Car & Personal Loans",
    template: "%s | EMIPro",
  },
  description: "Free, open-source EMI calculator with live calculations, amortization schedules, prepayment simulator, loan comparison & more. Works offline. No ads.",
  keywords: ["EMI Calculator", "Loan EMI Calculator", "Home Loan EMI Calculator", "Car Loan EMI Calculator", "Personal Loan EMI Calculator", "Amortization Schedule", "Prepayment Calculator", "Loan Comparison", "EMI Calculator India", "Home Loan Calculator", "Interest Rate Calculator"],
  authors: [{ name: "Mahesh Maddi" }],
  creator: "Mahesh Maddi",
  publisher: "EMIPro",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://emipro-calculator.netlify.app" },
  openGraph: {
    title: "EMIPro - Free EMI Calculator for Home, Car & Personal Loans",
    description: "Calculate loan EMI instantly with charts, amortization schedule & prepayment simulator. 100% free, no ads.",
    type: "website",
    url: "https://emipro-calculator.netlify.app",
    siteName: "EMIPro",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "EMIPro - Loan/EMI Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EMIPro - Free EMI Calculator",
    description: "Calculate loan EMI instantly. Charts, amortization, prepayment simulator & more.",
    images: ["/og-image.svg"],
  },
  manifest: "/manifest.json",
  themeColor: "#6C5CE7",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "EMIPro",
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 px-4 py-6">{children}</main>
            <Footer />
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebApplication",
                "name": "EMIPro",
                "url": "https://emipro-calculator.netlify.app",
                "description": "Free EMI calculator with live calculations, charts, amortization schedules, prepayment simulator, and loan comparison for Indian loans.",
                "applicationCategory": "FinanceApplication",
                "operatingSystem": "Web",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "INR"
                },
                "author": {
                  "@type": "Person",
                  "name": "Mahesh Maddi"
                }
              }),
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
