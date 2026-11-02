import {
  BookableService,
  ComboItem,
  ExtraItem,
  ScheduleBlock,
  ServiceItem,
} from "@/lib/types";

/**
 * Catálogo real de Fisioteruel (Santo Domingo, RD).
 *
 * Este fichero es la única fuente de verdad de servicios, combos, extras y
 * horarios. Las páginas y el asistente de reserva leen de aquí.
 */

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "eval-fisio",
    name: "Evaluación de fisioterapia",
    description:
      "Primera consulta donde analizamos tu caso, valoramos tu movilidad y creamos tu plan de tratamiento ideal.",
    price: 5500,
    category: "fisioterapia",
    duration: 60,
    icon: "clinical_notes",
    badge: "Primera consulta",
    details: [
      "Entrevista y valoración inicial",
      "Análisis de movilidad y dolor",
      "Plan de tratamiento personalizado",
    ],
  },
  {
    id: "sesion-fisio",
    name: "Sesión de fisioterapia",
    description:
      "Terapias adaptadas a tus necesidades: rehabilitación, fortalecimiento y alivio del dolor muscular o articular.",
    price: 4000,
    category: "fisioterapia",
    duration: 60,
    icon: "exercise",
    badge: "Tratamiento",
    details: [
      "Rehabilitación y fortalecimiento",
      "Alivio del dolor muscular o articular",
      "Seguimiento según tu progreso",
    ],
  },
  {
    id: "masaje-cuerpo-completo",
    name: "Descarga de cuerpo completo",
    description:
      "Renueva tu energía y libera cada músculo con un masaje profundo de pies a cabeza.",
    price: 4500,
    category: "masajes",
    duration: 60,
    icon: "fitness_center",
    badge: "Recomendado",
    details: [
      "Masaje profundo de pies a cabeza",
      "Liberación de tensiones acumuladas",
      "Sensación de ligereza y renovación",
    ],
  },
  {
    id: "masaje-relajante",
    name: "Masaje relajante",
    description:
      "Ideal para desconectar del estrés y encontrar serenidad.",
    price: 4100,
    category: "masajes",
    duration: 60,
    icon: "self_improvement",
    details: [
      "Ambiente de calma y desconexión",
      "Técnicas suaves y envolventes",
      "Bienestar físico y mental",
    ],
  },
  {
    id: "descarga-espalda",
    name: "Descarga de espalda",
    description:
      "Enfocado en aliviar la tensión cervical y lumbar, perfecta para quienes pasan mucho tiempo sentadas o frente al computador.",
    price: 3800,
    category: "masajes",
    duration: 45,
    icon: "man",
    details: [
      "Alivio de tensión cervical y lumbar",
      "Ideal para trabajo de oficina",
      "Técnica manual localizada",
    ],
  },
  {
    id: "descarga-piernas",
    name: "Descarga de piernas",
    description:
      "Estimula la circulación y aligera la sensación de pesadez.",
    price: 3800,
    category: "masajes",
    duration: 45,
    icon: "directions_walk",
    details: [
      "Mejora de la circulación",
      "Alivio de piernas cansadas",
      "Sensación de ligereza",
    ],
  },
  {
    id: "liberacion-cuello",
    name: "Liberación de cuello",
    description:
      "Reduce la rigidez cervical y mejora tu movilidad con una técnica precisa y efectiva.",
    price: 4000,
    category: "masajes",
    duration: 50,
    icon: "accessibility",
    details: [
      "Reducción de rigidez cervical",
      "Mejora de la movilidad del cuello",
      "Alivio de cefaleas tensionales",
    ],
  },
];

export const COMBOS_DATA: ComboItem[] = [
  {
    id: "combo-renuevate",
    name: "Renuévate Plus",
    tag: "Combo estelar",
    description:
      "Enfoque integral para aliviar tensiones que incluye descarga de espalda + extra.",
    price: 5000,
    icon: "bolt",
    includes: ["Descarga de espalda", "Extra a elección"],
  },
  {
    id: "combo-energia",
    name: "Energía Total",
    tag: "Revitalizante",
    description:
      "Revitaliza tus piernas y mejora la circulación; incluye descarga de piernas + extra.",
    price: 4500,
    icon: "auto_awesome",
    includes: ["Descarga de piernas", "Extra a elección"],
  },
  {
    id: "combo-bienestar",
    name: "Bienestar Completo",
    tag: "Equilibrio",
    description:
      "Para un equilibrio físico y mental; incluye masaje relajante + extra.",
    price: 5000,
    icon: "spa",
    includes: ["Masaje relajante", "Extra a elección"],
  },
  {
    id: "combo-desconectate",
    name: "Desconéctate Deluxe",
    tag: "Premium",
    description:
      "Sesión premium para una relajación profunda; incluye descarga de cuerpo completo + cupping + estiramiento.",
    price: 6300,
    icon: "diamond",
    includes: [
      "Descarga de cuerpo completo",
      "Cupping",
      "Estiramiento",
    ],
  },
];

export const EXTRAS_DATA: ExtraItem[] = [
  {
    id: "extra-cupping",
    name: "Cupping",
    description: "Ventosas para aumentar el flujo sanguíneo y relajar la fascia.",
    individualPrice: 2000,
    addOnPrice: 500,
    icon: "circles",
  },
  {
    id: "extra-estiramiento",
    name: "Estiramiento",
    description: "Estiramientos asistidos para recuperar amplitud de movimiento.",
    individualPrice: 2000,
    addOnPrice: 500,
    icon: "accessibility_new",
  },
  {
    id: "extra-electroterapia",
    name: "Electroterapia",
    description: "Corrientes terapéuticas para aliviar el dolor y estimular el músculo.",
    individualPrice: 2600,
    addOnPrice: 500,
    icon: "electric_bolt",
  },
  {
    id: "extra-ultrasonido",
    name: "Ultrasonido o láser",
    description: "Agentes físicos para favorecer la recuperación de tejidos.",
    individualPrice: 3500,
    addOnPrice: 500,
    icon: "graphic_eq",
  },
  {
    id: "extra-kinesiotape",
    name: "Kinesiotape o vendaje funcional",
    description: "Soporte neuromuscular para acompañar la recuperación.",
    individualPrice: 3000,
    addOnPrice: 500,
    icon: "healing",
  },
  {
    id: "extra-puncion-seca",
    name: "Punción seca",
    description: "Tratamiento de puntos gatillo miofasciales con agujas estériles.",
    individualPrice: 4000,
    addOnPrice: 500,
    icon: "medical_services",
  },
  {
    id: "extra-tiempo",
    name: "Tiempo extra (30 min)",
    description: "Amplía tu sesión media hora más.",
    individualPrice: 500,
    addOnPrice: 500,
    icon: "schedule",
  },
];

/**
 * Horarios de atención. `onlineDays` y `slots` son los que usa el asistente:
 * los fines de semana quedan fuera de la reserva online y se coordinan aparte.
 */
export const SCHEDULE_DATA: ScheduleBlock[] = [
  {
    days: "Lunes, miércoles y viernes",
    daysShort: "Lun · Mié · Vie",
    hours: "7:30 p. m. – 10:00 p. m.",
    onlineDays: [1, 3, 5],
    slots: ["19:30", "20:00", "20:30", "21:00"],
  },
  {
    days: "Martes y jueves",
    daysShort: "Mar · Jue",
    hours: "3:00 p. m. – 7:00 p. m.",
    onlineDays: [2, 4],
    slots: ["15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"],
  },
  {
    days: "Sábados y domingos",
    daysShort: "Sáb · Dom",
    hours: "Horario variable",
    note: "Previa coordinación",
    onlineDays: [],
    slots: [],
  },
];

export const PLAN_TIERS = {
  individual: {
    name: "Tarifa estándar",
    discount: 0,
    description: "Atención esporádica, sin compromiso.",
  },
  semanal: {
    name: "Plan semanal",
    discount: 5,
    description: "Pagos frecuentes y seguimiento constante.",
  },
  quincenal: {
    name: "Plan quincenal",
    discount: 10,
    description: "Equilibrio entre comodidad y ahorro.",
  },
  mensual: {
    name: "Plan mensual",
    discount: 15,
    description: "La opción más conveniente para tratamientos largos.",
  },
} as const;

/** Todo lo que se puede reservar en el asistente: fisioterapia, masajes y combos. */
export const BOOKABLE_SERVICES: BookableService[] = [
  ...SERVICES_DATA.map((service) => ({
    id: service.id,
    name: service.name,
    price: service.price,
    category: service.category,
    duration: service.duration,
    icon: service.icon,
  })),
  ...COMBOS_DATA.map((combo) => ({
    id: combo.id,
    name: combo.name,
    price: combo.price,
    category: "combos" as const,
    duration: 90,
    icon: combo.icon,
  })),
];

/**
 * Datos de contacto provisionales. Sustituir por los reales antes de publicar:
 * teléfono/WhatsApp, correo y dirección exacta.
 */
export const CONTACT_DATA = {
  phone: "+1 (809) 000-0000",
  phoneHref: "tel:+18090000000",
  whatsapp: "+1 (809) 000-0000",
  email: "contacto@fisioteruel.com",
  address: "Santo Domingo, República Dominicana",
  city: "Santo Domingo",
  country: "República Dominicana",
} as const;
