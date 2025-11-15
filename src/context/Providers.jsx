"use client";
import { CurrencyProvider } from "./CurrencyProvider";
import { ConfigProvider } from "@/context/ConfigProvider";

export default function Providers({ children }) {
  return (
      <ConfigProvider>
        <CurrencyProvider>
          {children}
        </CurrencyProvider>
      </ConfigProvider>
  );
}
