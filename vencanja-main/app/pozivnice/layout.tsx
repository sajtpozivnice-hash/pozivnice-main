import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pozivnice",
  description:
    "Pregledajte primere digitalnih pozivnica. Otvorite dizajn koji vam se dopada ili nam opišite želje za potpuno prilagođenu pozivnicu.",
};

export default function PozivniceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
