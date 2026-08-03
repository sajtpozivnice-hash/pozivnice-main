"use client";

import { ConfigProvider } from "./ConfigContext";
import Wedding02 from "./Wedding02";

export default function Home() {
  return (
    <ConfigProvider>
      <Wedding02 />
    </ConfigProvider>
  );
}
