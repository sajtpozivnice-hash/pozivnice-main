import type { Metadata } from "next";
import { DemoApp } from "@/components/demo/DemoApp";

export const metadata: Metadata = {
  title: "Demo backoffice",
  description:
    "Isprobajte kompletan backoffice sa demo podacima. Izmene se ne čuvaju i ne diraju produkcionu bazu.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DemoPage() {
  return <DemoApp />;
}
