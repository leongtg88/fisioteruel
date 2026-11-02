import type { Metadata } from "next";
import DesignLabBar from "@/components/DesignLabBar";

export const metadata: Metadata = {
  title: "Laboratorio de diseños",
  description:
    "Comparativa de los diseños candidatos para Servicios, Planes y Agendar.",
  robots: { index: false, follow: false },
};

export default function DisenosLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative z-10">
      <DesignLabBar />
      {children}
    </div>
  );
}
