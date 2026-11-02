import type { Metadata } from "next";
import CandidateShell from "@/components/CandidateShell";

export const metadata: Metadata = {
  title: "Planes y bonos de sesiones",
  description:
    "Planes semanal, quincenal y mensual con hasta un 15 % de descuento, simulador de precio y formas de pago para la fisioterapia a domicilio en Santo Domingo.",
  alternates: { canonical: "/planes" },
};

export default function PlanesPage() {
  return <CandidateShell kind="planes" />;
}
