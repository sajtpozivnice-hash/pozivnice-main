"use client";

import { fonts } from "@/fontsForInvites";
import { useInviteConfig } from "./InviteConfigContext";

export default function InviteFontWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { config } = useInviteConfig();

  const selectedFont = fonts[config.main.font] ?? fonts.notoSans;

  return (
    <div
      className={selectedFont.className}
      style={{
        ["--font-invite-classic" as any]: selectedFont.style.fontFamily,
      }}
    >
      {children}
    </div>
  );
}
