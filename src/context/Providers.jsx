"use client";
import { CurrencyProvider } from "./CurrencyProvider";

export default function Providers({ children }) {
  return (
    <CurrencyProvider>
      {children}
    </CurrencyProvider>
  );
}
