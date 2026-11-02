"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type JSX } from "react";
import Agendar from "@/components/Agendar";
import Planes from "@/components/Planes";
import Servicios from "@/components/Servicios";
import type { Tab } from "@/types";
import { labPath, type CandidateMeta } from "@/lib/design-lab";

/**
 * Registro en el cliente. Estos 3 ficheros NO llevan "use client": al
 * importarlos desde aquí entran en el grafo de cliente y pueden usar sus hooks
 * sin que hayamos tenido que editarlos.
 */
const REGISTRY: Record<string, JSX.ElementType> = {
  servicios: Servicios,
  planes: Planes,
  agendar: Agendar,
};

interface DesignLabShellProps {
  candidate: CandidateMeta;
  initialServiceId?: string;
  initialPlanDiscount?: number;
}

export default function DesignLabShell({
  candidate,
  initialServiceId,
  initialPlanDiscount,
}: DesignLabShellProps) {
  const router = useRouter();

  // Agendar construye el calendario con new Date() durante el render: si se
  // renderiza en el servidor, el HTML ya no coincide con el del cliente.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const onChangeTab = (tab: Tab) => {
    if (tab === "inicio" || tab === "descargar") {
      router.push(tab === "inicio" ? "/disenos" : "/");
      return;
    }
    router.push(labPath(tab));
  };

  const onSelectServiceAndPlan = (serviceId: string, planDiscount: number) => {
    router.push(
      `${labPath("agendar")}?servicio=${encodeURIComponent(serviceId)}&plan=${planDiscount}`
    );
  };

  const onResetSelection = () => {
    router.push(labPath(candidate.kind));
  };

  if (candidate.clientOnly && !mounted) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <p className="text-sm font-bold text-slate-500">
          Cargando el asistente de reserva en el navegador…
        </p>
        <p className="text-xs text-slate-400 mt-2">
          Este diseño genera el calendario con la fecha actual en el render, así
          que el laboratorio lo monta solo en cliente para evitar un desajuste de
          hidratación.
        </p>
      </div>
    );
  }

  const Component = REGISTRY[candidate.key];

  if (candidate.kind === "agendar") {
    return (
      <Component
        selectedServiceId={initialServiceId ?? "trauma"}
        selectedPlanDiscount={initialPlanDiscount ?? 0}
        onChangeTab={onChangeTab}
        onResetSelection={onResetSelection}
      />
    );
  }

  return (
    <Component
      onChangeTab={onChangeTab}
      onSelectServiceAndPlan={onSelectServiceAndPlan}
    />
  );
}
