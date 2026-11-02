"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CANDIDATES } from "@/lib/design-lab";

/** Barra de navegación del laboratorio: permite saltar entre candidatos. */
export default function DesignLabBar() {
  const pathname = usePathname();

  return (
    <div className="border-b border-dashed border-accent/60 bg-accent-soft/80 backdrop-blur-md">
      <div className="max-w-[1280px] mx-auto px-6 py-3 flex flex-wrap items-center gap-x-6 gap-y-3">
        <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent-text">
          <span
            className="material-symbols-outlined text-base"
            aria-hidden="true"
          >
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
                    ? "bg-lead text-accent-soft"
                    : "text-accent-text hover:bg-accent/40"
                }`}
              >
                {candidate.title}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <Link
            href="/disenos"
            className="text-xs font-bold text-accent-text hover:underline"
          >
            Ver comparativa
          </Link>
          <Link
            href="/"
            className="text-xs font-bold text-lead-muted hover:text-primary-deep"
          >
            Salir al sitio real
          </Link>
        </div>
      </div>
    </div>
  );
}
