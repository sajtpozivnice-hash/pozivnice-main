const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://www.vasdogadjaj.com";

const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "").replace(/\/$/, "");

/** Subtle credit on live subdomain invitations only — not in the editor. */
export function InvitationBrandCredit() {
  return (
    <footer
      className="relative z-10 flex justify-center px-4 py-6"
      style={{
        background:
          "color-mix(in srgb, var(--color-background, #f5f2ec) 92%, transparent)",
      }}
    >
      <p
        className="text-center text-[11px] leading-relaxed tracking-wide sm:text-xs"
        style={{
          color: "color-mix(in srgb, var(--color-secondary, #444) 55%, transparent)",
          fontFamily: "var(--font-secondary, sans-serif)",
        }}
      >
        Izrađeno na{" "}
        <a
          href={SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-transparent underline-offset-2 transition hover:decoration-current"
          style={{
            color: "color-mix(in srgb, var(--color-secondary, #444) 75%, transparent)",
          }}
        >
          {SITE_HOST}
        </a>
      </p>
    </footer>
  );
}
