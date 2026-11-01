import type { Metadata } from "next";
import ServicesView from "@/components/ServicesView";

export const metadata: Metadata = {
  title: "Servicios y Tarifas",
  description:
    "Tarifas de fisioterapia a domicilio, masajes terapéuticos, combos y extras premium en Teruel Capital.",
  alternates: { canonical: "/servicios" },
};

export default function ServiciosPage() {
  return <ServicesView />;
}
