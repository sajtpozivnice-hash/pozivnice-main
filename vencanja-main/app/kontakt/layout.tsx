import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktirajte nas zbog postojećeg dizajna ili potpuno prilagođene digitalne pozivnice. Odgovaramo lično i dogovorimo izradu.",
};

export default function KontaktLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
