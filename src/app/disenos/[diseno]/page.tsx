import Link from "next/link";
import { notFound } from "next/navigation";
import DesignLabShell from "@/components/DesignLabShell";
import { findCandidate } from "@/lib/design-lab";

interface DisenoPageProps {
  params: Promise<{ diseno: string }>;
  searchParams: Promise<{ servicio?: string; plan?: string }>;
}

export default async function DisenoPage({
  params,
  searchParams,
}: DisenoPageProps) {
  const [{ diseno }, { servicio, plan }] = await Promise.all([
    params,
    searchParams,
  ]);

  const candidate = findCandidate(diseno);
  if (!candidate) notFound();

  const planNumber = plan ? Number(plan) : undefined;

  return (
    <div className="animate-fade-in pb-16">
      <div className="bg-white/45 backdrop-blur-md border-b border-white/40">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl font-bold text-slate-900">
              {candidate.title}
            </h1>
            <code className="text-[11px] text-slate-500 font-mono">
              {candidate.file}
            </code>
          </div>

          <div className="flex items-center gap-3 text-xs font-bold">
            {servicio && (
              <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-lg">
                servicio: {servicio}
                {planNumber !== undefined && planNumber > 0 && (
                  <span className="ml-1 opacity-80">· plan −{planNumber} %</span>
                )}
              </span>
            )}
            <Link
              href={candidate.livePath}
              className="text-primary hover:underline"
              title="Versión actual en producción"
            >
              Comparar con la actual →
            </Link>
          </div>
        </div>
      </div>

      <DesignLabShell
        candidate={candidate}
        initialServiceId={servicio}
        initialPlanDiscount={Number.isFinite(planNumber) ? planNumber : undefined}
      />
    </div>
  );
}
