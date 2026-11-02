import Link from "next/link";
import { ROUTES } from "@/lib/nav";

export default function NotFound() {
  return (
    <div className="animate-fade-in max-w-[1280px] mx-auto px-6 py-24 text-center flex flex-col items-center gap-6">
      <span
        className="material-symbols-outlined text-6xl text-primary-strong opacity-40"
        aria-hidden="true"
      >
        search_off
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-text-dark">
        Página no encontrada
      </h1>
      <p className="text-sm text-lead-muted font-semibold max-w-md leading-relaxed">
        La sección que buscas no existe en Fisioteruel. Puedes volver al inicio o
        consultar directamente nuestros servicios y tarifas.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href={ROUTES.inicio}
          className="bg-primary-strong text-white px-8 py-3.5 rounded-xl text-sm font-bold shadow-md shadow-primary/20 hover:bg-primary-deep transition-colors"
        >
          Volver al inicio
        </Link>
        <Link
          href={ROUTES.servicios}
          className="bg-white/80 backdrop-blur-md border border-border-subtle text-primary-deep px-8 py-3.5 rounded-xl text-sm font-bold hover:bg-white transition-colors"
        >
          Ver Servicios
        </Link>
      </div>
    </div>
  );
}
