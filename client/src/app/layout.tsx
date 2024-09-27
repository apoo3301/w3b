"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "~/components/ui/sonner";
import { usePathname } from "next/navigation";
import { Footer } from "~/components/footer";
import { Inter } from "next/font/google";
import { auth } from "~/auth";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isAuthRoute = pathname.startsWith("/auth");

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Toaster />
          {children}
          {!isAuthRoute && <Footer />}
        </SessionProvider>
      </body>
    </html>
  );
}
