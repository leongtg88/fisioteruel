import type { Metadata } from "next";
import CandidateShell from "@/components/CandidateShell";
import { BOOKABLE_SERVICES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Agendar cita a domicilio",
  description:
    "Reserva tu sesión de fisioterapia, masaje o combo a domicilio en Santo Domingo en 4 pasos: servicio, profesional, fecha y hora, y datos del paciente.",
  alternates: { canonical: "/agendar" },
};

const BOOKABLE_IDS = new Set<string>(BOOKABLE_SERVICES.map((service) => service.id));

/** Descuento del plan en %: se limita a un rango razonable. */
function parseDiscount(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return undefined;
  return Math.min(Math.max(Math.round(parsed), 0), 100);
}

export default async function AgendarPage({
  searchParams,
}: {
  searchParams: Promise<{ servicio?: string; plan?: string }>;
}) {
  const { servicio, plan } = await searchParams;

  return (
    <>
      <h1 className="sr-only">
        Agendar cita de fisioterapia o masaje a domicilio en Santo Domingo
      </h1>
      <CandidateShell
        kind="agendar"
        initialServiceId={
          servicio && BOOKABLE_IDS.has(servicio) ? servicio : undefined
        }
        initialPlanDiscount={parseDiscount(plan)}
      />
    </>
  );
}
