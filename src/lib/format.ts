/**
 * Precios del sitio: moneda única, pesos dominicanos (RD$).
 *
 * El catálogo y las tarifas viven en `src/lib/data.ts`. El conmutador EUR/DOP
 * y su provider se quitaron a petición del cliente.
 */

const numberFormatter = new Intl.NumberFormat("es-DO", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/** Formatea una cantidad expresada en RD$: `RD$ 5,500`. */
export function formatPrice(priceDop: number): string {
  return `RD$ ${numberFormatter.format(Math.round(priceDop))}`;
}
