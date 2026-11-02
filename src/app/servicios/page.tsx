import type { Metadata } from "next";
import CandidateShell from "@/components/CandidateShell";
import ServicesView from "@/components/ServicesView";

export const metadata: Metadata = {
  title: "Servicios y Tarifas",
  description:
    "Evaluación y sesiones de fisioterapia a domicilio, masajes terapéuticos, combos y extras en Santo Domingo. Consulta tarifas y horarios.",
  alternates: { canonical: "/servicios" },
};

export default function ServiciosPage() {
  return (
    <>
      {/* Bloque 1: fisioterapia a domicilio + orientador de servicio */}
      <CandidateShell kind="servicios" />

      {/* Bloque 2: masajes, combos, extras y horarios. Se omite su hero para
          no apilar dos cabeceras en la misma página. */}
      <div className="border-t border-border-subtle mt-4">
        <ServicesView ocultarHero />
      </div>
    </>
  );
}
