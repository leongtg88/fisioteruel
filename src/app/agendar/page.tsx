import type { Metadata } from "next";
import CandidateShell from "@/components/CandidateShell";
import { THERAPY_PRICE_DOP } from "@/lib/prices";

export const metadata: Metadata = {
  title: "Agendar cita a domicilio",
  description:
    "Reserva tu sesión de fisioterapia a domicilio en Teruel en 4 pasos: especialidad, fisioterapeuta, fecha y hora, y datos del paciente.",
  alternates: { canonical: "/agendar" },
};

const THERAPY_IDS = new Set<string>(Object.keys(THERAPY_PRICE_DOP));

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
    <CandidateShell
      kind="agendar"
      initialServiceId={
        servicio && THERAPY_IDS.has(servicio) ? servicio : undefined
      }
      initialPlanDiscount={parseDiscount(plan)}
    />
  );
}
