"use client";

import axios from "axios";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

const CurrencyContext = createContext({
  currency: {
    id: "1",
    code: "USD",
    prefix: "$",
    suffix: " USD",
    format: "1",
    rate: "1.00000",
  },
  setCurrency: (currency) => {},
  setDefaultCurrency: () => {},
});

export function CurrencyProvider({ children }) {
  const fallbackCurrency = {
    id: "1",
    code: "USD",
    prefix: "$",
    suffix: " USD",
    format: "1",
    rate: "1.00000",
  };

  const [currency, setCurrency] = useState(fallbackCurrency);
  let isExistCurrency;

  useEffect(() => {
    const fetchCurrencyFromIP = async () => {
      try {
        // Replace with your API key from ipdata.co or another service
        const response = await fetch(
          `https://api.ipdata.co?api-key=${process.env.NEXT_PUBLIC_IP_DATA_TOKEN}&fields=currency`
        );
        const data = await response.json();
        const currencyCode = data.currency.code;

        const WHMCS_Currencies = await axios.post(
          "https://manage.digirdp.com/includes/api.php",
          new URLSearchParams({
            action: "GetCurrencies",
            identifier: process.env.NEXT_PUBLIC_WHMCS_API_IDENTIFIER,
            secret: process.env.NEXT_PUBLIC_WHMCS_API_SECRET,
            accesskey: process.env.NEXT_PUBLIC_WHMCS_API_ACCESS_KEY,
            responsetype: "json",
          })
        );

        if (WHMCS_Currencies.data.result === "success") {
          const whmcs_currencies = WHMCS_Currencies.data.currencies.currency;
          isExistCurrency = whmcs_currencies.find((ele) => {
            return ele.code.includes(currencyCode);
          });
        } else {
          console.error("WHMCS API Error:", response.data.message);
        }

        const newCurrency = {
          id: isExistCurrency?.id || "1", // Use WHMCS data if available
          code: isExistCurrency?.code || data.currency.code || "USD",
          prefix: isExistCurrency?.prefix || data.currency.symbol || "$", // Ensure ₹ is used
          suffix: ` ${isExistCurrency?.code || data.currency.code || "USD"}`,
          format: "1", // You might adjust this based on locale conventions
          rate: "1.00000", // Default rate; you could fetch real exchange rates
        };
        console.log({ isExistCurrency });
        setCurrency(isExistCurrency ? newCurrency : fallbackCurrency);
      } catch (error) {
        console.error(
          "Failed to fetch currency from IP, using fallback:",
          error
        );
        setCurrency(fallbackCurrency); // Fallback to USD if API fails
      }
    };

    fetchCurrencyFromIP();
  }, []); // Empty dependency array to run once on mount

  const setAnotherCurrency = (currency) => {
    console.log(currency);
    setCurrency(currency);
  };

  const setDefaultCurrency = () => {
    setCurrency(fallbackCurrency); // Reset to USD or fetch again if desired
  };

  return (
    <CurrencyContext.Provider
      value={{ currency, setAnotherCurrency, setDefaultCurrency }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
