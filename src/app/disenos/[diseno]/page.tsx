import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CandidateShell from "@/components/CandidateShell";
import { findCandidate } from "@/lib/design-lab";

interface DisenoPageProps {
  params: Promise<{ diseno: string }>;
  // Se consultan en cada petición: la ruta es dinámica y no necesita
  // generateStaticParams.
  searchParams: Promise<{ servicio?: string; plan?: string }>;
}

export async function generateMetadata({
  params,
}: DisenoPageProps): Promise<Metadata> {
  const { diseno } = await params;
  return {
    title: `Prototipo: ${diseno}`,
    robots: { index: false, follow: false },
  };
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
      <div className="bg-amber-50/70 backdrop-blur-md border-b border-amber-200">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl font-bold text-slate-900">
              {candidate.title}
              <span className="ml-2 text-[11px] font-sans font-black uppercase tracking-widest text-amber-800 align-middle">
                prototipo
              </span>
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
              title="Versión publicada en el sitio"
            >
              Ver la versión publicada →
            </Link>
          </div>
        </div>
      </div>

      <CandidateShell
        kind={candidate.kind}
        mode="lab"
        initialServiceId={servicio}
        initialPlanDiscount={Number.isFinite(planNumber) ? planNumber : undefined}
      />
    </div>
  );
}
