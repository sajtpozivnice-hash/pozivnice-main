import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/siteUrl";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  const paths: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }[] = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/pozivnice", changeFrequency: "weekly", priority: 0.95 },
    {
      path: "/digitalna-pozivnica-za-vencanje",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      path: "/elektronska-pozivnica",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      path: "/pozivnica-za-rodjendan",
      changeFrequency: "monthly",
      priority: 0.85,
    },
    { path: "/kontakt", changeFrequency: "monthly", priority: 0.7 },
    { path: "/demo", changeFrequency: "monthly", priority: 0.65 },
    { path: "/privatnost", changeFrequency: "yearly", priority: 0.3 },
  ];

  return paths.map(({ path, changeFrequency, priority }) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
