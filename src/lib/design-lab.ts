/**
 * Registro de los diseños candidatos que se comparan en /disenos.
 * Sin JSX: lo consumen tanto las páginas de servidor (validación de ruta y
 * metadatos) como el shell de cliente y el desplegable del header.
 */

export type CandidateKind = "servicios" | "planes" | "agendar";

export interface CandidateMeta {
  /** slug en /disenos/<key> */
  key: CandidateKind;
  title: string;
  /** fichero real en src/components */
  file: string;
  kind: CandidateKind;
  /** ruta donde este diseño está publicado ya en el sitio real */
  livePath: string;
  summary: string;
  highlights: string[];
  /** usa `new Date()` en el render: no es seguro renderizarlo en el servidor */
  clientOnly?: boolean;
}

export const CANDIDATES: CandidateMeta[] = [
  {
    key: "servicios",
    title: "Servicios",
    file: "src/components/Servicios.tsx",
    kind: "servicios",
    livePath: "/servicios",
    summary:
      "Catálogo de fisioterapia a domicilio (evaluación y sesión) con un orientador que recomienda el servicio según la molestia.",
    highlights: [
      "Evaluación RD$ 5,500 y sesión RD$ 4,000",
      "Orientador: necesidad + tiempo de evolución → servicio recomendado",
      "El resultado enlaza a Agendar llevando el servicio elegido",
      "Masajes, combos, extras y horarios se muestran en ServicesView",
      "Animaciones de entrada con motion (AnimatePresence)",
    ],
  },
  {
    key: "planes",
    title: "Planes",
    file: "src/components/Planes.tsx",
    kind: "planes",
    livePath: "/planes",
    summary:
      "Página comercial de planes de fisioterapia: tres modalidades, simulador de precio en vivo, métodos de pago y buzón de consultas.",
    highlights: [
      "Planes semanal 5 %, quincenal 10 % (destacado) y mensual 15 %",
      "Los descuentos aplican solo a fisioterapia (evaluación y sesiones)",
      "Simulador: servicio × nº sesiones × plan → total, ahorro y precio/sesión",
      "Listado de métodos de pago (efectivo, transferencia, tarjeta)",
      "'Live support': formulario de pregunta con estado de envío simulado",
      "1 foto remota de images.unsplash.com",
    ],
  },
  {
    key: "agendar",
    title: "Agendar",
    file: "src/components/Agendar.tsx",
    kind: "agendar",
    livePath: "/agendar",
    summary:
      "Asistente de reserva en 4 pasos con resumen lateral fijo, calendario de lunes a viernes y asignación de profesional.",
    highlights: [
      "Paso 1: 11 servicios reservables (fisioterapia, masajes y combos)",
      "Paso 2: asignación automática, fisioterapeuta o terapeuta de masaje",
      "Calendario generado con new Date() (solo lun–vie) → solo cliente",
      "Horarios por día: lun/mié/vie noche; mar/jue tarde",
      "Resumen sticky con desglose: base − descuento del plan = total",
      "Envío simulado (1,8 s) + overlay de éxito con ID FT-xxxxxx",
    ],
    clientOnly: true,
  },
];

export function findCandidate(key: string | undefined): CandidateMeta | undefined {
  return CANDIDATES.find((candidate) => candidate.key === key);
}

/** Ruta del laboratorio para una pantalla. */
export function labPath(kind: CandidateKind): string {
  return `/disenos/${kind}`;
}
