import type { Metadata } from "next";
import { Outfit, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ 
  subsets: ["latin"], 
  weight: ["300", "500", "700"],
  variable: "--font-heading" 
});

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-body"
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono"
});

export const metadata: Metadata = {
  title: "Sholays Place Brand | The Masterpiece of Packaging",
  description: "Shomolu's premier industrial printing house, where sophisticated design meets precision manufacturing at scale.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${inter.variable} ${jetbrains.variable} font-body bg-steel-blue text-morning-cream`}>
        {children}
      </body>
    </html>
  );
}