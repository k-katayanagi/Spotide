import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./Providers";
import ResponsiveHeader from "@/components/responsive/header/ResponsiveHeader";
import ResponsiveFooter from "@/components/responsive/footer/ResponsiveFooter";
import { ListProvider } from "@/contexts/ListContext";
import { ListItemProvider } from "@/contexts/ListItemContext";
import { SearchSpotProvider } from "@/contexts/SearchSpotContext";
import { AuthProvider } from "@/contexts/AuthContext";
import AuthGuard from "@/components/auth/AuthGuard";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ListProvider>
          <ListItemProvider>
            <SearchSpotProvider>
              <Providers>
                <AuthProvider>
                  <ResponsiveHeader />
                  <AuthGuard>
                    <main>{children}</main>
                  </AuthGuard>
                  <ResponsiveFooter />
                </AuthProvider>
              </Providers>
            </SearchSpotProvider>
          </ListItemProvider>
        </ListProvider>
      </body>
    </html>
  );
}
