import type { Metadata } from "next";
import "./globals.css";
import { playfair, lora } from "../fonts";
import { ToastProvider } from "@/components/Toast/ToastContext";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "eVenčanje — digitalne pozivnice i organizacija događaja",
    template: "%s | eVenčanje",
  },
  description:
    "Digitalna pozivnica i privatni nalog: menjate tekstove i slike, pratite ko dolazi, pravite raspored sedenja, vodite budžet i primáte fotografije od gostiju. Kontaktirajte nas za izradu.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      suppressHydrationWarning
      lang="sr"
      className={cn(
        lora.variable,
        playfair.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
