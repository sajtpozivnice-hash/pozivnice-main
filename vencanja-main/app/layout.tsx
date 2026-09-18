import type { Metadata } from "next";
import "./globals.css";
import { playfair, lora } from "../fonts";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { ToastProvider } from "@/components/Toast/ToastContext";
import { WhatsAppFloat } from "@/components/WhatsAppFloat/WhatsAppFloat";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSiteUrl } from "@/lib/siteUrl";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

/** JPG via Cloudinary transform — WhatsApp/FB/Telegram often ignore AVIF for link previews. */
const OG_IMAGE =
  "https://res.cloudinary.com/dqqnpfbyf/image/upload/f_jpg,q_auto,w_1200/v1787146655/photo-1510076857177-7470076d4098_srlt0i.avif";

const googleVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Vaš događaj — pozivnica + organizacija · 3.999 RSD",
    template: "%s | Vaš događaj",
  },
  description:
    "Digitalna pozivnica i privatni nalog za goste, RSVP, stolove, budžet i planer. 3.999 RSD jednokratno — sve uključeno.",
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.ico", sizes: "48x48" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "sr_RS",
    url: "/",
    siteName: "Vaš događaj",
    title: "Vaš događaj — pozivnica + organizacija · 3.999 RSD",
    description:
      "Pozivnica za goste. Organizacija za vas. Jednokratno 3.999 RSD — sve uključeno.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Vaš događaj — digitalne pozivnice",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaš događaj — pozivnica + organizacija · 3.999 RSD",
    description:
      "Pozivnica + nalog za organizaciju. 3.999 RSD jednokratno, sve uključeno.",
    images: [OG_IMAGE],
  },
  ...(googleVerification
    ? { verification: { google: googleVerification } }
    : {}),
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
        <JsonLd />
        <GoogleAnalytics />
        <ToastProvider>
          {children}
          <WhatsAppFloat />
        </ToastProvider>
      </body>
    </html>
  );
}
