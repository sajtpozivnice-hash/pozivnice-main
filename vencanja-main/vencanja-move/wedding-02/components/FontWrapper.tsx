"use client";

import { useConfig } from "../ConfigContext";
import { fonts } from "../fonts";

const FontWrapper = ({ children }: { children: React.ReactNode }) => {
  const { config } = useConfig();

  const fontPrimary = fonts[config.main.primaryFont] ?? fonts.notoSans;
  const fontSecondary = fonts[config.main.secondaryFont] ?? fonts.notoSans;

  return (
    <div
      style={{
        ["--font-primary" as any]: fontPrimary.style.fontFamily,
        ["--font-secondary" as any]: fontSecondary.style.fontFamily,
      }}
    >
      {children}
    </div>
  );
};

export default FontWrapper;
