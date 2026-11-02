"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type JSX } from "react";
import Agendar from "@/components/Agendar";
import Planes from "@/components/Planes";
import Servicios from "@/components/Servicios";
import type { Tab } from "@/types";
import { labPath, type CandidateKind } from "@/lib/design-lab";
import { ROUTES } from "@/lib/nav";

/**
 * Los 3 ficheros candidatos no llevan "use client": al importarles desde aquí
 * entran en el grafo de cliente y pueden usar `useState` y `motion` sin haber
 * sido editados para Next.
 */
const REGISTRY: Record<CandidateKind, JSX.ElementType> = {
  servicios: Servicios,
  planes: Planes,
  agendar: Agendar,
};

/**
 * "site" = el diseño ya adoptado, navega por las rutas reales del sitio.
 * "lab"  = vista de comparación, navega por /disenos/*.
 */
export type ShellMode = "site" | "lab";

const TAB_ROUTE: Record<"site" | "lab", Record<Tab, string>> = {
  site: {
    inicio: ROUTES.inicio,
    servicios: ROUTES.servicios,
    planes: ROUTES.planes,
    agendar: ROUTES.agendar,
    reservas: ROUTES.reservas,
  },
  lab: {
    inicio: "/disenos",
    servicios: labPath("servicios"),
    planes: labPath("planes"),
    agendar: labPath("agendar"),
    reservas: "/disenos",
  },
};

/**
 * Agendar construye el calendario con `new Date()` durante el render: si se
 * renderiza en el servidor, el HTML no coincide con el del cliente.
 */
const CLIENT_ONLY: CandidateKind[] = ["agendar"];

interface CandidateShellProps {
  kind: CandidateKind;
  mode?: ShellMode;
  initialServiceId?: string;
  initialPlanDiscount?: number;
}

export default function CandidateShell({
  kind,
  mode = "site",
  initialServiceId,
  initialPlanDiscount,
}: CandidateShellProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const routes = TAB_ROUTE[mode];

  const onChangeTab = (tab: Tab) => {
    router.push(routes[tab] ?? ROUTES.inicio);
  };

  const onSelectServiceAndPlan = (serviceId: string, planDiscount: number) => {
    const base = routes.agendar;
    router.push(
      `${base}?servicio=${encodeURIComponent(serviceId)}&plan=${planDiscount}`
    );
  };

  const onResetSelection = () => {
    router.push(mode === "site" ? ROUTES.inicio : "/disenos");
  };

  if (CLIENT_ONLY.includes(kind) && !mounted) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <p className="text-sm font-bold text-slate-500">
          Cargando el asistente de reserva en el navegador…
        </p>
        <p className="text-xs text-slate-400 mt-2">
          Este diseño genera el calendario con la fecha actual en el render, así
          que se monta solo en cliente para evitar un desajuste de hidratación.
        </p>
      </div>
    );
  }

  const Component = REGISTRY[kind];

  if (kind === "agendar") {
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
