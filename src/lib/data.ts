import { ServiceItem } from "@/lib/types";

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "eval-integral",
    name: "Evaluación Integral",
    description: "Diagnóstico detallado y diseño de plan de tratamiento personalizado por fisioterapeutas colegiados.",
    price: 5500, // in DOP
    category: "fisioterapia",
    duration: 60,
    icon: "clinical_notes",
    badge: "Mandatorio",
    details: ["Examen físico completo", "Historial clínico detallado", "Análisis de movilidad postural"]
  },
  {
    id: "sesion-terapia",
    name: "Sesión de Terapia",
    description: "Tratamiento activo incluyendo ejercicios terapéuticos, terapia manual y técnicas de rehabilitación.",
    price: 4000,
    category: "fisioterapia",
    duration: 60,
    icon: "exercise",
    badge: "Recurrente",
    details: ["60 minutos de sesión", "Equipamiento profesional portátil", "Seguimiento evolutivo diario"]
  },
  {
    id: "descarga-completa",
    name: "Masaje de Descarga Completa",
    description: "Ideal para atletas, deportistas y personas con alta sobrecarga de tensión acumulada.",
    price: 4500,
    category: "masajes",
    duration: 60,
    icon: "fitness_center",
    badge: "Recomendado",
    details: ["Tejido profundo e instrumental", "Recuperación de fatiga muscular", "Prevención de lesiones deportivas"]
  },
  {
    id: "masaje-relajante",
    name: "Masaje Relajante",
    description: "Sesión enfocada en la eliminación completa del estrés diario y el bienestar físico-mental.",
    price: 4100,
    category: "masajes",
    duration: 60,
    icon: "self_improvement",
    details: ["Aceites esenciales bio-aromáticos", "Ambiente de spa clínico", "Tranquilidad y equilibrio"]
  },
  {
    id: "espalda-piernas",
    name: "Masaje de Espalda/Piernas",
    description: "Tratamiento específico enfocado en las principales zonas de carga corporal.",
    price: 3800,
    category: "masajes",
    duration: 45,
    icon: "man",
    details: ["Descontracturante localizado", "Alivio de tensiones lumbares/cervicales", "Mejora de la circulación de retorno"]
  },
  {
    id: "masaje-cuello",
    name: "Masaje de Cuello",
    description: "Alivio cervical, craneal y control del dolor de cabeza originado por tensión tensional.",
    price: 4000,
    category: "masajes",
    duration: 50,
    icon: "accessibility",
    details: ["Terapia manual suboccipital", "Estiramientos de la fascia cervical", "Liberación del trapecio superior"]
  }
];

export const COMBOS_DATA = [
  {
    id: "combo-renuevate",
    name: "Renuévate Plus",
    tag: "Combo Estelar",
    description: "Combinación de Terapia Manual + Masaje de Descarga profunda para una recuperación total y revitalización muscular.",
    price: 5000,
    icon: "bolt"
  },
  {
    id: "combo-energia",
    name: "Energía Total",
    tag: "Bienestar Exprés",
    description: "Sesión focalizada de alivio rápido del dolor corporal acompañada de estiramientos pasivos asistidos.",
    price: 4500,
    icon: "auto_awesome"
  }
];

export const EXTRAS_DATA = [
  {
    id: "extra-cupping",
    name: "Cupping (Ventosas)",
    description: "Ventosas dinámicas para aumentar el flujo sanguíneo y relajar la fascia.",
    price: 500,
    icon: "circles"
  },
  {
    id: "extra-punción",
    name: "Punción Seca",
    description: "Eliminación directa de puntos gatillo miofasciales con agujas estériles.",
    price: 500,
    icon: "medical_services"
  },
  {
    id: "extra-taping",
    name: "Taping Kinesiológico",
    description: "Vendaje neuromuscular terapéutico de soporte muscular prolongado.",
    price: 500,
    icon: "fluid_med"
  }
];
