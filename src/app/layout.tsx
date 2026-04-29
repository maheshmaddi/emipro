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
  title: "EMIPro - Best-in-Class Loan/EMI Calculator",
  description: "Free, open-source EMI calculator with live calculations, charts, and amortization schedules. Perfect for home loans, car loans, personal loans, and more.",
  keywords: ["EMI Calculator", "Loan Calculator", "Home Loan EMI", "Car Loan EMI", "Personal Loan EMI"],
  openGraph: {
    title: "EMIPro - Best-in-Class Loan/EMI Calculator",
    description: "Free, open-source EMI calculator with live calculations, charts, and amortization schedules. Perfect for home loans, car loans, personal loans, and more.",
    type: "website",
    url: "https://emipro.app",
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
    title: "EMIPro - Best-in-Class Loan/EMI Calculator",
    description: "Free, open-source EMI calculator with live calculations, charts, and amortization schedules.",
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
        </Providers>
      </body>
    </html>
  );
}
