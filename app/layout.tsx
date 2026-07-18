import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "@/styles/globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import RevealManager from "@/components/ui/RevealManager";

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "929 Specialty Coffee",
    template: "%s — 929 Specialty Coffee",
  },
  description:
    "The digital flagship of 929 Specialty Coffee. Craftsmanship, calmness, precision — coffee as quiet luxury.",
  openGraph: {
    title: "929 Specialty Coffee",
    description:
      "Craftsmanship, calmness, precision — coffee as quiet luxury.",
    type: "website",
    siteName: "929 Specialty Coffee",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={instrument.variable}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <RevealManager />
        </SmoothScroll>
      </body>
    </html>
  );
}
