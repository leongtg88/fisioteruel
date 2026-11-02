import type { Metadata } from "next";
import BookingView from "@/components/BookingView";

export const metadata: Metadata = {
  title: "Solicitudes guardadas",
  description:
    "Formulario de reserva clásico y listado de citas guardadas en este navegador.",
  alternates: { canonical: "/reservas" },
  robots: { index: false },
};

/**
 * Antigua pestaña "Agenda Online". Sigue viva en esta URL porque guarda las
 * citas en localStorage, pero ya no se enlaza desde el menú: la reserva del
 * sitio es ahora el asistente de /agendar.
 */
export default function ReservasPage() {
  return <BookingView />;
}
