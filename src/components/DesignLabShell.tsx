"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type JSX } from "react";
import Agendar from "@/components/Agendar";
import Agendar2 from "@/components/Agendar2";
import Planes from "@/components/Planes";
import Planes2 from "@/components/Planes2";
import Servicios from "@/components/Servicios";
import Servicios2 from "@/components/Servicios2";
import type { Tab } from "@/types";
import { labPath, type CandidateMeta } from "@/lib/design-lab";

/**
 * Registro en el cliente. Estos 6 ficheros NO llevan "use client": al
 * importarlos desde aquí entran en el grafo de cliente y pueden usar sus hooks
 * sin que hayamos tenido que editarlos.
 */
const REGISTRY: Record<string, JSX.ElementType> = {
  servicios: Servicios,
  servicios2: Servicios2,
  planes: Planes,
  planes2: Planes2,
  agendar: Agendar,
  agendar2: Agendar2,
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
  const { line } = candidate;

  // Agendar construye el calendario con new Date() durante el render: si se
  // renderiza en el servidor, el HTML ya no coincide con el del cliente.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const onChangeTab = (tab: Tab) => {
    if (tab === "inicio") {
      router.push("/disenos");
      return;
    }
    if (tab === "descargar") {
      router.push("/");
      return;
    }
    router.push(labPath(tab, line));
  };

  const onSelectServiceAndPlan = (serviceId: string, planDiscount: number) => {
    router.push(
      `${labPath("agendar", line)}?servicio=${encodeURIComponent(serviceId)}&plan=${planDiscount}`
    );
  };

  const onResetSelection = () => {
    router.push(labPath(candidate.kind, line));
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
