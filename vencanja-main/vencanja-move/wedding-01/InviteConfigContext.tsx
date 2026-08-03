"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { defaultConfig, DefaultConfig } from "./jsonConfig";

interface InviteConfigContextType {
  config: DefaultConfig;
  setConfig: React.Dispatch<React.SetStateAction<DefaultConfig>>;
}

const InviteConfigContext = createContext<InviteConfigContextType | undefined>(
  undefined,
);

export const InviteConfigProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<DefaultConfig>(defaultConfig);

  return (
    <InviteConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </InviteConfigContext.Provider>
  );
};

export const useInviteConfig = (): InviteConfigContextType => {
  const context = useContext(InviteConfigContext);
  if (!context) {
    throw new Error("useInviteConfig must be used inside InviteConfigProvider");
  }
  return context;
};
