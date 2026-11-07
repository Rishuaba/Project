import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Outfit, Syne } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NavigationProvider } from "@/components/NavigationProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import { navigation } from "@/config/navigation";
import "./globals.css";

const display = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sharukh",
    template: "%s — Sharukh",
  },
  description:
    "A demonstration studio site with a file-based menu, restrained motion, and smooth scrolling.",
};

export const viewport: Viewport = {
  themeColor: "#f3efe6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${serif.variable}`}>
      <body>
        <NavigationProvider initial={navigation}>
          <SmoothScroll />
          <Header />
          <main>{children}</main>
          <Footer />
        </NavigationProvider>
      </body>
    </html>
  );
}
