"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Currency = "EUR" | "DOP";

const STORAGE_KEY = "fisioteruel_currency";

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

/**
 * La moneda era un `useState` en App.tsx. Al partir la app en rutas de Next.js
 * necesita sobrevivir a la navegación, así que vive en un provider del layout
 * raíz y se persiste en localStorage (sin tocar el valor durante el render
 * para evitar errores de hidratación).
 */
export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("EUR");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "EUR" || saved === "DOP") {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = useCallback((next: Currency) => {
    setCurrencyState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo(
    () => ({ currency, setCurrency }),
    [currency, setCurrency]
  );

  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency debe usarse dentro de <CurrencyProvider>");
  }
  return context;
}
