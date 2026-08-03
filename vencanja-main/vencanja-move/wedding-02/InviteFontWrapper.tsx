"use client";

import { fonts } from "@/fontsForInvites";
import { useConfig } from "./ConfigContext";

export default function InviteFontWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { config } = useConfig();

  const selectedFont = fonts[config.main.primaryFont] ?? fonts.notoSans;

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
