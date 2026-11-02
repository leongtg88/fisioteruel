"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CANDIDATES, labPath } from "@/lib/design-lab";

interface DesignsDropdownProps {
  /** desktop: botón + panel · drawer: bloque de filas para el menú móvil */
  variant: "desktop" | "drawer";
}

/**
 * Acceso rápido a los diseños candidatos que se comparan en /disenos.
 * La lista sale de `CANDIDATES`, así que si se va un candidato el menú se
 * actualiza solo.
 */
export default function DesignsDropdown({ variant }: DesignsDropdownProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isActive = pathname?.startsWith("/disenos");

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (variant === "drawer") {
    return (
      <div className="pt-4 mt-2 border-t border-gray-100">
        <span className="block text-[10px] font-black uppercase tracking-widest text-amber-700 px-4 pb-2">
          Diseños en comparación
        </span>
        <div className="flex flex-col gap-2">
          {CANDIDATES.map((candidate) => {
            const href = labPath(candidate.kind);
            const active = pathname === href;
            return (
              <Link
                key={candidate.key}
                href={href}
                className={`w-full py-3 px-4 rounded-xl flex items-center gap-4 text-sm font-semibold transition-colors text-left ${
                  active
                    ? "bg-amber-50 text-amber-900 border border-amber-200/50"
                    : "text-amber-800 hover:bg-slate-50"
                }`}
                id={`drawer_nav_diseno_${candidate.key}`}
              >
                <span className="material-symbols-outlined">
                  {candidate.icon}
                </span>
                <span>{candidate.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="designs_menu"
        className={`font-semibold text-sm tracking-wide transition-all py-1.5 border-b-2 flex items-center gap-1 cursor-pointer ${
          isActive
            ? "text-amber-800 border-amber-600 font-bold"
            : "text-slate-600 border-transparent hover:text-amber-800 hover:border-amber-600/40"
        }`}
        id="nav_designs_btn"
      >
        <span className="material-symbols-outlined text-base">
          grid_view
        </span>
        <span>Diseños</span>
        <span
          className={`material-symbols-outlined text-xs transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          expand_more
        </span>
      </button>

      {open && (
        <div
          id="designs_menu"
          className="absolute right-0 top-full mt-3 w-80 bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl shadow-xl p-2 z-[80]"
        >
          <p className="text-[10px] font-black uppercase tracking-widest text-amber-700 px-3 py-2">
            Comparativa de candidatos
          </p>

          <div className="flex flex-col gap-1">
            {CANDIDATES.map((candidate) => {
              const href = labPath(candidate.kind);
              const active = pathname === href;

              return (
                <Link
                  key={candidate.key}
                  href={href}
                  className={`flex items-start gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                    active
                      ? "bg-amber-50 border border-amber-200/60"
                      : "hover:bg-white/80 border border-transparent"
                  }`}
                  id={`designs_menu_${candidate.key}`}
                >
                  <span className="material-symbols-outlined text-primary text-xl mt-0.5">
                    {candidate.icon}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900">
                      {candidate.title}
                    </span>
                    <span className="text-[11px] text-slate-600 font-semibold leading-snug">
                      {candidate.summary}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>

          <Link
            href="/disenos"
            className="mt-1 flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-white/80 transition-colors border-t border-white/50"
            id="designs_menu_index"
          >
            <span className="material-symbols-outlined text-base">
              compare
            </span>
            <span>Ver la comparativa completa</span>
          </Link>
        </div>
      )}
    </div>
  );
}
