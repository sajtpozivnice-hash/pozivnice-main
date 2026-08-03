"use client";

import Birthday01 from "./Birthday01";
import { ConfigProvider } from "./ConfigContext";

export default function Home() {
  return (
    <ConfigProvider>
      <Birthday01 />
    </ConfigProvider>
  );
}
