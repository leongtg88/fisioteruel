import type { Metadata } from "next";
import HomeView from "@/components/HomeView";

export const metadata: Metadata = {
  title: "Fisioteruel - Fisioterapia y Masajes a Domicilio",
  description:
    "Fisioterapia a domicilio, masajes terapéuticos y combos de bienestar en Santo Domingo. Cuidado personalizado en la comodidad de tu hogar.",
  alternates: { canonical: "/" },
};

export default function InicioPage() {
  return <HomeView />;
}
