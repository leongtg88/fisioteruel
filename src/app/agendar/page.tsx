import type { Metadata } from "next";
import BookingView from "@/components/BookingView";
import { COMBOS_DATA, SERVICES_DATA } from "@/lib/data";

export const metadata: Metadata = {
  title: "Agenda tu sesión a domicilio",
  description:
    "Reserva tu cita de fisioterapia o masaje a domicilio en Teruel: elige tratamiento, fecha y franja horaria.",
  alternates: { canonical: "/agendar" },
  robots: { index: false },
};

const KNOWN_SERVICE_IDS = new Set([
  ...SERVICES_DATA.map((s) => s.id),
  ...COMBOS_DATA.map((c) => c.id),
]);

export default async function AgendarPage({
  searchParams,
}: {
  /** Next 15+: searchParams es async */
  searchParams: Promise<{ servicio?: string }>;
}) {
  const { servicio } = await searchParams;

  return (
    <BookingView
      initialServiceId={
        servicio && KNOWN_SERVICE_IDS.has(servicio) ? servicio : undefined
      }
    />
  );
}
