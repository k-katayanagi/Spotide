import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ResponsiveHeader from "@/components/responsive/header/ResponsiveHeader";
import "@/app/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ResponsiveHeader />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
