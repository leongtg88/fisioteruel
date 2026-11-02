import Link from "next/link";
import { CANDIDATES, labPath } from "@/lib/design-lab";

export default function DisenosIndexPage() {
  return (
    <div className="animate-fade-in max-w-[1280px] mx-auto px-6 py-12 flex flex-col gap-10">
      <header className="max-w-3xl">
        <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/20">
          Comparativa de candidatos
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 mt-4 leading-tight">
          Los tres diseños candidatos
        </h1>
        <p className="text-sm sm:text-base text-slate-700 font-semibold leading-relaxed mt-4">
          Cada tarjeta enlaza a una ruta real donde el componente se ejecuta con
          sus props cableadas a la navegación, así que puedes usar el wizard tal
          como está pensado. También están disponibles desde el desplegable{" "}
          <strong>Diseños</strong> del header. La versión actual del sitio sigue
          intacta en{" "}
          <Link href="/servicios" className="text-primary font-bold hover:underline">
            /servicios
          </Link>{" "}
          y{" "}
          <Link href="/agendar" className="text-primary font-bold hover:underline">
            /agendar
          </Link>
          .
        </p>
      </header>

      <section className="bg-emerald-50/70 backdrop-blur-md border border-emerald-300 p-6 rounded-2xl">
        <h2 className="font-bold text-emerald-900 flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-700">
            delete_sweep
          </span>
          <span>Réplicas «2» eliminadas</span>
        </h2>
        <p className="text-sm text-emerald-950 font-semibold leading-relaxed mt-2">
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
            className="bg-white/45 backdrop-blur-md border border-white/55 rounded-[2rem] p-8 shadow-md flex flex-col gap-5"
          >
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-secondary">
                {candidate.kind}
              </span>
              <h3 className="font-serif text-2xl font-bold text-slate-900 mt-1">
                {candidate.title}
              </h3>
              <code className="text-[11px] text-slate-500 font-mono break-all">
                {candidate.file}
              </code>
            </div>

            <p className="text-sm text-slate-700 font-semibold leading-relaxed">
              {candidate.summary}
            </p>

            <ul className="text-xs text-slate-700 font-semibold space-y-2 border-t border-white/40 pt-4">
              {candidate.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-base select-none shrink-0">
                    check_circle
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {candidate.clientOnly && (
              <p className="text-[11px] font-bold text-amber-900 bg-amber-50 border border-amber-200 rounded-xl p-3">
                Se monta solo en navegador: genera el calendario con la fecha del
                sistema durante el render.
              </p>
            )}

            <div className="mt-auto flex flex-col gap-2 pt-4">
              <Link
                href={labPath(candidate.kind)}
                className="bg-primary text-white text-center px-6 py-3 rounded-xl text-sm font-bold shadow-md shadow-primary/25 hover:bg-primary/90 transition-colors"
              >
                Ver {candidate.title}
              </Link>
              <Link
                href={candidate.livePath}
                className="text-center text-xs font-bold text-slate-600 hover:text-primary transition-colors"
              >
                Cómo se ve ahora: {candidate.livePath}
              </Link>
            </div>
          </article>
        ))}
      </div>

      <section className="bg-white/45 backdrop-blur-md border border-white/55 rounded-[2rem] p-8 shadow-md">
        <h2 className="font-serif text-2xl font-bold text-slate-900 mb-4">
          Cosas que habrá que resolver al adoptar cualquiera
        </h2>
        <ul className="text-sm text-slate-700 font-semibold leading-relaxed space-y-3">
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined text-accent-warm text-lg shrink-0">
              account_balance_wallet
            </span>
            <span>
              <strong>Precios incompatibles.</strong> Los candidatos trabajan en
              euros directos (60 / 65 / 55 / 70 € por terapia) mientras que el
              sitio actual guarda el precio en DOP y lo traduce con un mapa
              (<code className="font-mono text-xs">src/lib/format.ts</code>).
              Habría que elegir un modelo y migrar <code className="font-mono text-xs">src/lib/data.ts</code>.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined text-accent-warm text-lg shrink-0">
              inventory_2
            </span>
            <span>
              <strong>Catálogos distintos.</strong> Los candidatos tienen 4
              especialidades (trauma, deporte, geriátrica, neuro); el sitio
              actual tiene 6 servicios + 2 combos + 3 extras. No son los mismos
              ids, así que la reserva deep-link (<code className="font-mono text-xs">?servicio=</code>)
              habría que rehacerla.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined text-accent-warm text-lg shrink-0">
              link
            </span>
            <span>
              <strong>props de SPA.</strong> Los tres componentes se comunican
              con <code className="font-mono text-xs">onChangeTab</code> y{" "}
              <code className="font-mono text-xs">onSelectServiceAndPlan</code>{" "}
              (el patrón antiguo). Al adoptarlos de verdad hay que traducirlos a
              rutas de Next, como ya hicimos con las vistas actuales.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined text-accent-warm text-lg shrink-0">
              palette
            </span>
            <span>
              <strong>5 tokens de color que no existían:</strong>{" "}
              <code className="font-mono text-xs">accent</code>,{" "}
              <code className="font-mono text-xs">accent-warm</code>,{" "}
              <code className="font-mono text-xs">accent-light</code>,{" "}
              <code className="font-mono text-xs">primary-container</code>,{" "}
              <code className="font-mono text-xs">secondary-container</code>.
              Los he añadido a <code className="font-mono text-xs">globals.css</code> con
              valores provisionales: si conservas el tema original de donde
              salieron estos ficheros, pásamelo y lo sustituyo.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined text-accent-warm text-lg shrink-0">
              save
            </span>
            <span>
              <strong>El wizard no persiste nada.</strong>{" "}
              <code className="font-mono text-xs">Agendar.tsx</code> simula el
              envío con un <code className="font-mono text-xs">setTimeout</code> de
              1,8 s y genera un ID aleatorio; la vista actual sí guarda las citas
              en <code className="font-mono text-xs">localStorage</code>.
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}
