/**
 * Registro de los diseños candidatos que se están comparando en /disenos.
 * Sin JSX: lo consumen tanto las páginas de servidor (validación de rutas y
 * metadatos) como el shell de cliente.
 */

export type CandidateKind = "servicios" | "planes" | "agendar";

export interface CandidateMeta {
  /** slug en /disenos/<key> */
  key: string;
  title: string;
  /** fichero real en src/components */
  file: string;
  kind: CandidateKind;
  /** 1 = Servicios/Planes/Agendar, 2 = su copia con sufijo "2" */
  line: 1 | 2;
  /** ruta de la versión actual en producción, para comparar */
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
    line: 1,
    livePath: "/servicios",
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
    key: "servicios2",
    title: "Servicios 2",
    file: "src/components/Servicios2.tsx",
    kind: "servicios",
    line: 2,
    livePath: "/servicios",
    summary:
      "Copia idéntica de Servicios.tsx (checksum md5 coincide: 5ea4161a…). Nada que elegir entre ambas.",
    highlights: [
      "17 649 bytes, igual que Servicios.tsx",
      "diff -q: ficheros idénticos byte a byte",
    ],
  },
  {
    key: "planes",
    title: "Planes",
    file: "src/components/Planes.tsx",
    kind: "planes",
    line: 1,
    livePath: "/servicios",
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
    key: "planes2",
    title: "Planes 2",
    file: "src/components/Planes2.tsx",
    kind: "planes",
    line: 2,
    livePath: "/servicios",
    summary:
      "Copia idéntica de Planes.tsx (checksum md5 coincide: 22be40ab…).",
    highlights: [
      "26 752 bytes, igual que Planes.tsx",
      "diff -q: ficheros idénticos byte a byte",
    ],
  },
  {
    key: "agendar",
    title: "Agendar",
    file: "src/components/Agendar.tsx",
    kind: "agendar",
    line: 1,
    livePath: "/agendar",
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
  {
    key: "agendar2",
    title: "Agendar 2",
    file: "src/components/Agendar2.tsx",
    kind: "agendar",
    line: 2,
    livePath: "/agendar",
    summary: "Copia idéntica de Agendar.tsx (checksum md5 coincide: 98b7a4ff…).",
    highlights: [
      "34 126 bytes, igual que Agendar.tsx",
      "diff -q: ficheros idénticos byte a byte",
    ],
    clientOnly: true,
  },
];

export function findCandidate(key: string | undefined): CandidateMeta | undefined {
  return CANDIDATES.find((candidate) => candidate.key === key);
}

/** Ruta del laboratorio para una especie de pantalla, dentro de la misma línea (1 o 2). */
export function labPath(kind: CandidateKind, line: 1 | 2): string {
  if (kind === "servicios") return line === 2 ? "/disenos/servicios2" : "/disenos/servicios";
  if (kind === "planes") return line === 2 ? "/disenos/planes2" : "/disenos/planes";
  return line === 2 ? "/disenos/agendar2" : "/disenos/agendar";
}
