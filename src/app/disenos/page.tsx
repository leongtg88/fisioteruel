import Link from "next/link";
import { CANDIDATES, labPath } from "@/lib/design-lab";

export default function DisenosIndexPage() {
  return (
    <div className="animate-fade-in max-w-[1280px] mx-auto px-6 py-12 flex flex-col gap-10">
      <header className="max-w-3xl">
        <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/20">
          Comparativa de candidatos
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-text-dark mt-4 leading-tight">
          Los tres diseños candidatos
        </h1>
        <p className="text-sm sm:text-base text-lead-muted font-semibold leading-relaxed mt-4">
          Estos tres diseños ya están <strong>publicados en el sitio real</strong>{" "}
          (<code className="font-mono text-xs">/servicios</code>,{" "}
          <code className="font-mono text-xs">/planes</code> y{" "}
          <code className="font-mono text-xs">/agendar</code>). Esta zona los
          muestra sueltos, con sus props cableadas a{" "}
          <code className="font-mono text-xs">/disenos/*</code>, para poder
          revisarlos sin la compañía del resto de la página.
        </p>
      </header>

      <section className="bg-primary-soft/70 backdrop-blur-md border border-primary/30 p-6 rounded-2xl">
        <h2 className="font-bold text-primary-deep flex items-center gap-2">
          <span aria-hidden="true" className="material-symbols-outlined text-primary-strong">
            delete_sweep
          </span>
          <span>Réplicas «2» eliminadas</span>
        </h2>
        <p className="text-sm text-primary-deep font-semibold leading-relaxed mt-2">
          <code className="font-mono">Servicios2.tsx</code>,{" "}
          <code className="font-mono">Planes2.tsx</code> y{" "}
          <code className="font-mono">Agendar2.tsx</code> eran idénticos byte a
          byte a su gemelo (mismo tamaño, mismo checksum md5), así que se han
          borrado junto con sus rutas{" "}
          <code className="font-mono">/disenos/*2</code>. Quedan los 3 originales.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {CANDIDATES.map((candidate) => (
          <article
            key={candidate.key}
            className="bg-white/80 backdrop-blur-md border border-border-subtle rounded-[2rem] p-8 shadow-md flex flex-col gap-5"
          >
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-primary-strong">
                {candidate.kind}
              </span>
              <h3 className="font-serif text-2xl font-bold text-text-dark mt-1">
                {candidate.title}
              </h3>
              <code className="text-xs text-lead-muted font-mono break-all">
                {candidate.file}
              </code>
            </div>

            <p className="text-sm text-lead-muted font-semibold leading-relaxed">
              {candidate.summary}
            </p>

            <ul className="text-xs text-lead-muted font-semibold space-y-2 border-t border-border-subtle pt-4">
              {candidate.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden="true" className="material-symbols-outlined text-primary text-base select-none shrink-0">
                    check_circle
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {candidate.clientOnly && (
              <p className="text-xs font-bold text-accent-text bg-accent-soft border border-accent/50 rounded-xl p-3">
                Se monta solo en navegador: genera el calendario con la fecha del
                sistema durante el render.
              </p>
            )}

            <div className="mt-auto flex flex-col gap-2 pt-4">
              <Link
                href={labPath(candidate.kind)}
                className="bg-primary-strong text-white text-center px-6 py-3 rounded-xl text-sm font-bold shadow-md shadow-primary/25 hover:bg-primary-deep transition-colors"
              >
                Ver {candidate.title}
              </Link>
              <Link
                href={candidate.livePath}
                className="text-center text-xs font-bold text-lead-muted hover:text-primary transition-colors"
              >
                Cómo se ve ahora: {candidate.livePath}
              </Link>
            </div>
          </article>
        ))}
      </div>

      <section className="bg-white/80 backdrop-blur-md border border-border-subtle rounded-[2rem] p-8 shadow-md">
        <h2 className="font-serif text-2xl font-bold text-text-dark mb-4">
          Así quedó la adopción
        </h2>
        <ul className="text-sm text-lead-muted font-semibold leading-relaxed space-y-3">
          <li className="flex items-start gap-3">
            <span aria-hidden="true" className="material-symbols-outlined text-primary text-lg shrink-0">
              account_balance_wallet
            </span>
            <span>
              <strong>Moneda única RD$.</strong> Se mantiene el peso dominicano
              como moneda del proyecto. El catálogo completo (servicios, combos,
              extras y planes) vive en{" "}
              <code className="font-mono text-xs">src/lib/data.ts</code>.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span aria-hidden="true" className="material-symbols-outlined text-primary text-lg shrink-0">
              grid_on
            </span>
            <span>
              <strong>Servicios fusionados.</strong>{" "}
              <code className="font-mono text-xs">/servicios</code> arranca con
              evaluación y sesión de fisioterapia y el orientador; debajo conserva
              masajes, combos, extras y horarios de la vista migrada.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span aria-hidden="true" className="material-symbols-outlined text-accent-text text-lg shrink-0">
              inventory_2
            </span>
            <span>
              <strong>Catálogo conectado.</strong> El asistente entiende los 11
              servicios reservables (2 de fisioterapia, 5 masajes y 4 combos) y
              preselecciona el servicio desde los botones de{" "}
              <code className="font-mono text-xs">/servicios</code>.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span aria-hidden="true" className="material-symbols-outlined text-accent-text text-lg shrink-0">
              schedule
            </span>
            <span>
              <strong>Reserva solo de lunes a viernes.</strong> El calendario
              aplica los horarios reales: lun/mié/vie por la noche y mar/jue por la
              tarde. Sábados y domingos se coordinan aparte.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span aria-hidden="true" className="material-symbols-outlined text-accent-text text-lg shrink-0">
              save
            </span>
            <span>
              <strong>El wizard no persiste nada.</strong>{" "}
              <code className="font-mono text-xs">Agendar.tsx</code> simula el envío
              con un <code className="font-mono text-xs">setTimeout</code> de 1,8 s y
              enseña un ID aleatorio. El formulario viejo, que sí guardaba citas en{" "}
              <code className="font-mono text-xs">localStorage</code>, sigue vivo sin
              enlace en <code className="font-mono text-xs">/reservas</code>.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span aria-hidden="true" className="material-symbols-outlined text-accent-text text-lg shrink-0">
              palette
            </span>
            <span>
              <strong>Paleta definitiva.</strong> Azul cian, amarillo, blanco y
              gris plomo. Todos los tokens que usaban los candidatos (incluidos{" "}
              <code className="font-mono text-xs">bg-base</code>,{" "}
              <code className="font-mono text-xs">border-subtle</code> y{" "}
              <code className="font-mono text-xs">soft-shadow</code>) están
              definidos en{" "}
              <code className="font-mono text-xs">src/app/globals.css</code>.
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}
