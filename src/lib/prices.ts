/**
 * Tarifas base de fisioterapia, en pesos dominicanos (RD$).
 *
 * El catálogo completo vive en `src/lib/data.ts`. Este mapa se conserva para
 * los componentes que solo necesitan las dos tarifas de fisioterapia.
 */
export const THERAPY_PRICE_DOP = {
  "eval-fisio": 5500,
  "sesion-fisio": 4000,
} as const;

export type TherapyId = keyof typeof THERAPY_PRICE_DOP;

/** Los planes de descuento aplican únicamente a servicios de fisioterapia. */
export const PLAN_DISCOUNT_SERVICE_IDS = new Set<string>(
  Object.keys(THERAPY_PRICE_DOP)
);
