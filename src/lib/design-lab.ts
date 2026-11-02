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
  /** ruta de la versión actual en producción, para comparar */
  livePath: string;
  summary: string;
  highlights: string[];
  /** Icono Material Symbols para el desplegable del header */
  icon: string;
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
    icon: "rebase_edit",
    summary:
      "Catálogo de 4 especialidades (traumatológica, deportiva, geriátrica y neurológica) con checkers de síntomas interactivos.",
    highlights: [
      "343 líneas · 4 servicios con precio base en € (60 / 65 / 55 / 70)",
      "Bloque 'Symptom checker': zona de dolor + duración → sugiere una terapia",
      "El resultado enlaza a Agendar llevando servicio y descuento",
      "Animaciones de entrada con motion (AnimatePresence)",
      "Sin imágenes remotas: todo gradientes e iconos de lucide-react",
    ],
  },
  {
    key: "planes",
    title: "Planes",
    file: "src/components/Planes.tsx",
    kind: "planes",
    livePath: "/servicios",
    icon: "card_membership",
    summary:
      "Página comercial de bonos: tres planes por volumen, simulador de precio en vivo, métodos de pago y buzón de consultas.",
    highlights: [
      "494 líneas · no existe equivalente en la app actual",
      "3 columnas: Semanal 5 %, Quincenal 10 % (destacado) y Mensual 15 %",
      "Simulador: terapia × nº sesiones × plan → total, ahorro y precio/sesión",
      "Listado de métodos de pago (efectivo, Bizum, tarjeta)",
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
    icon: "calendar_month",
    summary:
      "Asistente de reserva en 4 pasos con resumen lateral fijo, calendario de 7 días, especialistas y modal de confirmación.",
    highlights: [
      "664 líneas · el más completo de los tres",
      "Wizard: servicio → especialista → fecha/hora → datos del paciente",
      "Calendario generado con new Date() (evita domingos) → solo cliente",
      "3 especialistas con foto Unsplash, rating y nº de colegiado",
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
