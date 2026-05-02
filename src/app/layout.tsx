import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import Starfield from "@/components/Starfield";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-subheading",
});

export const metadata: Metadata = {
	title: "Galacti",
	description: "Open infrastructure. Open experimentation. For everyone.",
  alternates: {
    canonical: "https://galacti.org",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${ibmPlexMono.variable} ${inter.className} scroll-smooth`}
    >
      <body className="flex flex-col bg-black text-white">
        <Starfield />

        {/* Navbar */}
        <Navbar />

        {/* Page content */}
        <main className="flex-1 relative">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}