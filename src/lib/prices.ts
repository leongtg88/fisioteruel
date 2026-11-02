/**
 * Precio por sesión de cada especialidad, en pesos dominicanos.
 *
 * Los diseños candidatos traían estos importes en euros (60 / 65 / 55 / 70 €) y
 * repetidos en tres ficheros. Se pasan a RD$ con el tipo de cambio de
 * referencia del proyecto (1 € ≈ 62,5 RD$) y quedan aquí como única fuente de
 * verdad: `Servicios.tsx`, `Planes.tsx` y `Agendar.tsx` leen de este mapa.
 *
 * Los importes son un cálculo a partir de los euros del diseño, no una tarifa
 * confirmada por el cliente. Si cambian, se tocan aquí y en nada más.
 */
export const THERAPY_PRICE_DOP = {
  trauma: 3750, // 60 €
  deporte: 4050, // 65 €
  geriatrica: 3450, // 55 €
  neuro: 4400, // 70 €
} as const;

export type TherapyId = keyof typeof THERAPY_PRICE_DOP;
