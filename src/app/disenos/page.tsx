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
          Estos tres diseños ya están <strong>publicados en el sitio real</strong>{" "}
          (<code className="font-mono text-xs">/servicios</code>,{" "}
          <code className="font-mono text-xs">/planes</code> y{" "}
          <code className="font-mono text-xs">/agendar</code>). Esta zona los
          muestra sueltos, con sus props cableadas a{" "}
          <code className="font-mono text-xs">/disenos/*</code>, para poder
          revisarlos sin la compañía del resto de la página.
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
          Así quedó la adopción
        </h2>
        <ul className="text-sm text-slate-700 font-semibold leading-relaxed space-y-3">
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-lg shrink-0">
              account_balance_wallet
            </span>
            <span>
              <strong>Moneda única RD$.</strong> Se quitó el conmutador € / $ y
              los precios en euros del candidato se tradujeron al tipo de
              referencia del proyecto (1 € ≈ 62,5 RD$): RD$ 3,750 / 4,050 /
              3,450 / 4,400. Todos viven en{" "}
              <code className="font-mono text-xs">src/lib/prices.ts</code>.{" "}
              <em>Esas cuatro cifras son mi cálculo: confírmalas.</em>
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-lg shrink-0">
              grid_on
            </span>
            <span>
              <strong>Servicios fusionados.</strong> <code className="font-mono text-xs">/servicios</code>{" "}
              arranca con las 4 especialidades del candidato y debajo conserva
              masajes, combos y extras de la vista migrada (sin su hero, para no
              apilar dos cabeceras).
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined text-accent-warm text-lg shrink-0">
              inventory_2
            </span>
            <span>
              <strong>Los catálogos siguen siendo distintos.</strong> El asistente
              solo entiende <code className="font-mono text-xs">trauma</code>,{" "}
              <code className="font-mono text-xs">deporte</code>,{" "}
              <code className="font-mono text-xs">geriatrica</code> y{" "}
              <code className="font-mono text-xs">neuro</code>. Los 6 servicios +
              2 combos antiguos no tienen equivalente, así que sus botones
              «Reservar» abren <code className="font-mono text-xs">/agendar</code> sin
              preseleccionar. Si quieres que preseleccionen, hace falta decir a qué
              especialidad equivale cada uno.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined text-accent-warm text-lg shrink-0">
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
            <span className="material-symbols-outlined text-accent-warm text-lg shrink-0">
              palette
            </span>
            <span>
              <strong>Siete tokens de color provisionales.</strong>{" "}
              <code className="font-mono text-xs">accent</code>,{" "}
              <code className="font-mono text-xs">accent-warm</code>,{" "}
              <code className="font-mono text-xs">accent-light</code>,{" "}
              <code className="font-mono text-xs">primary-container</code>,{" "}
              <code className="font-mono text-xs">secondary-container</code>,{" "}
              <code className="font-mono text-xs">text-dark</code> y{" "}
              <code className="font-mono text-xs">text-muted</code> no estaban
              definidos (los candidatos los usaban 183 veces). Inventé valores
              coherentes con la marca; si conservas el tema original, pásamelo y
              los sustituyo.
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}
