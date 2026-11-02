/**
 * Precios del sitio: moneda única, pesos dominicanos (RD$).
 *
 * El conmutador EUR/DOP y su provider se quitaron a petición del cliente. El
 * tipo de cambio usado para traducir los euros de los diseños candidatos fue el
 * de referencia del proyecto, 1 DOP ≈ 0,016 € (o sea 1 € ≈ 62,5 RD$); las
 * tarifas resultantes están en `src/lib/prices.ts`.
 */

const numberFormatter = new Intl.NumberFormat("es-DO", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/** Formatea una cantidad expresada en RD$: `RD$ 3,750`. */
export function formatPrice(priceDop: number): string {
  return `RD$ ${numberFormatter.format(Math.round(priceDop))}`;
}
