import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politika privatnosti",
  description:
    "Kako Vaš događaj prikuplja i koristi podatke: kontakt forme, Google Analytics, Google Ads i kolačići.",
};

export default function PrivatnostLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
