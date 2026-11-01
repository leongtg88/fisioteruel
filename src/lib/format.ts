import type { Currency } from "@/components/CurrencyProvider";

/**
 * Currency and styling helper functions
 */

const BEAUTIFUL_EUR_PRICES: Record<number, number> = {
  5500: 65, // Evaluación integral
  4000: 45, // Sesión de terapia
  4500: 50, // Descarga completa
  4100: 45, // Relajante
  3800: 40, // Espalda/Piernas
  5000: 55, // Renuévate plus combo
  500: 8, // Extras
};

/**
 * Formats a given price (specified in DOP by default) according to the active currency.
 * Provides clean, local-friendly rounded numbers for a premium presentation.
 */
export function formatPrice(priceDop: number, currency: Currency): string {
  if (currency === "DOP") {
    return new Intl.NumberFormat("es-DO", {
      style: "currency",
      currency: "DOP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(priceDop)
      .replace("DOP$", "DOP$ ");
  } else {
    // Return precise mapped Euro price, or fall back to calculation
    const eurPrice = BEAUTIFUL_EUR_PRICES[priceDop] || Math.round(priceDop * 0.012);
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(eurPrice);
  }
}

export const CURRENCY_CONVERSION_RATE = 0.016; // 1 DOP = approximately 0.016 EUR
