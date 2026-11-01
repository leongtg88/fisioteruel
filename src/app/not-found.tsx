import Link from "next/link";
import { ROUTES } from "@/lib/nav";

export default function NotFound() {
  return (
    <div className="animate-fade-in max-w-[1280px] mx-auto px-6 py-24 text-center flex flex-col items-center gap-6">
      <span className="material-symbols-outlined text-6xl text-primary opacity-40">
        search_off
      </span>
      <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
        Página no encontrada
      </h2>
      <p className="text-sm text-slate-700 font-semibold max-w-md leading-relaxed">
        La sección que buscas no existe en Fisioteruel. Puedes volver al inicio o
        consultar directamente nuestros servicios y tarifas.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href={ROUTES.inicio}
          className="bg-primary text-white px-8 py-3.5 rounded-xl text-sm font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition-all"
        >
          Volver al inicio
        </Link>
        <Link
          href={ROUTES.servicios}
          className="bg-white/45 backdrop-blur-md border border-white/60 text-primary px-8 py-3.5 rounded-xl text-sm font-bold hover:bg-white/65 transition-all shadow-xs"
        >
          Ver Servicios
        </Link>
      </div>
    </div>
  );
}
