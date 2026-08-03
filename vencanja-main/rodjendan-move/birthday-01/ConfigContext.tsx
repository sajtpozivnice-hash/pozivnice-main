"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { defaultConfig, DefaultConfig } from "./jsonConfig";

interface ConfigContextType {
  config: DefaultConfig;
  setConfig: React.Dispatch<React.SetStateAction<DefaultConfig>>;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<DefaultConfig>(defaultConfig);

  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = (): ConfigContextType => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be used inside ConfigProvider");
  }
  return context;
};
