import type { Metadata } from "next";
import "./globals.css";
import { playfair, lora } from "../fonts";
import { ToastProvider } from "@/components/Toast/ToastContext";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "eVenčanje",
  description: "Prezentacija paketa i RSVP forma",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      suppressHydrationWarning
      lang="sr"
      className={cn(lora.variable, playfair.variable, "font-sans", geist.variable)}
    >
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
