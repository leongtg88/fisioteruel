import type { Metadata } from "next";
import CandidateShell from "@/components/CandidateShell";
import ServicesView from "@/components/ServicesView";

export const metadata: Metadata = {
  title: "Servicios y Tarifas",
  description:
    "Fisioterapia traumatológica, deportiva, geriátrica y neurológica a domicilio en Teruel, con checkers de síntomas, masajes, combos y extras.",
  alternates: { canonical: "/servicios" },
};

export default function ServiciosPage() {
  return (
    <>
      {/* Bloque 1: catálogo de especialidades adoptado del diseño candidato */}
      <CandidateShell kind="servicios" />

      {/* Bloque 2: tarifas de siempre (masajes, combos y extras). Se omite su
          hero para no apilar dos cabeceras en la misma página. */}
      <div className="border-t border-white/40 mt-4">
        <ServicesView ocultarHero />
      </div>
    </>
  );
}
