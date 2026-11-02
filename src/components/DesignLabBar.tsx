"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CANDIDATES } from "@/lib/design-lab";

/** Barra de navegación del laboratorio: permite saltar entre candidatos. */
export default function DesignLabBar() {
  const pathname = usePathname();

  return (
    <div className="border-b border-dashed border-amber-400/60 bg-amber-100/70 backdrop-blur-md">
      <div className="max-w-[1280px] mx-auto px-6 py-3 flex flex-wrap items-center gap-x-6 gap-y-3">
        <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-900">
          <span className="material-symbols-outlined text-base">
            design_services
          </span>
          <span>Laboratorio de diseños</span>
        </span>

        <nav className="flex flex-wrap items-center gap-1" aria-label="Candidatos">
          {CANDIDATES.map((candidate) => {
            const href = `/disenos/${candidate.key}`;
            const isActive = pathname === href;
            return (
              <Link
                key={candidate.key}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  isActive
                    ? "bg-amber-900 text-amber-50"
                    : "text-amber-900/80 hover:bg-amber-200/70"
                }`}
              >
                {candidate.title}
                {candidate.line === 2 && (
                  <span className="ml-1 text-[10px] font-normal opacity-70">
                    (= {candidate.title.replace(" 2", "")})
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <Link
            href="/disenos"
            className="text-xs font-bold text-amber-900 hover:underline"
          >
            Ver comparativa
          </Link>
          <Link
            href="/"
            className="text-xs font-bold text-slate-600 hover:text-primary"
          >
            Salir al sitio real
          </Link>
        </div>
      </div>
    </div>
  );
}
