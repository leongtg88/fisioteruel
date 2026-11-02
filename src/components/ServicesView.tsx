"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  COMBOS_DATA,
  EXTRAS_DATA,
  SCHEDULE_DATA,
  SERVICES_DATA,
} from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { ROUTES } from "@/lib/nav";

const CATALOG_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCrDeUO6cmTShp1YjLFYTrY50ZIekyNZ2V-x-sEo1jZCHGCX7ZgXgpS8tvA6Stmi3N6M62rFvHjrmnD_imFvZr4vu9TaCLdznC-vjhuSHtf3FJSKNqSTVCYvkFEfkpudRjzmeJa1lHbfTPaSgAtL9XoeMPEhSkxKskwwki_rgDNUZhUFFUttfM5TLOeZwqStqVwxIlCU8PD5XbRJhBY0W9PLrc-Q93yJ_cFsAdlIJwR9GzV4c0UieE39h8Oczw-wXqBjBmOu0Rcf6w";

const SPA_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCpjZ4Ye79SK-Y76cv0EiUrTCy7lR6PHqPFbwjOOcpNRCe6cqXVxCE7XAaCB4glgCQIEXqc2XkRKmWyDxGvsPx5SZRsN_2MdKZecPAHmIGluP2fi6qgCPSvmpetXMjKSYL_83oxlnS1l83KMM4MXKgiHET4j4P8YNNaA9V3QZ4L72l0a9mcIW9IDo7axThB-fKjJoBWIj5iyOStz5QMM_jT_v4Ve0V0qfLEbGAwbsYt2Z198ACkTVD_Tre8irxO7OmJFtXW8NfxXic";

/** Iconos Material Symbols por servicio. */
const SERVICE_ICONS: Record<string, string> = {
  "eval-fisio": "clinical_notes",
  "sesion-fisio": "exercise",
  "masaje-cuerpo-completo": "fitness_center",
  "masaje-relajante": "self_improvement",
  "descarga-espalda": "man",
  "descarga-piernas": "directions_walk",
  "liberacion-cuello": "accessibility",
};

interface ServicesViewProps {
  /**
   * /servicios ya arranca con el hero de fisioterapia, así que aquí se omite
   * el propio para no apilar dos cabeceras.
   */
  ocultarHero?: boolean;
}

export default function ServicesView({ ocultarHero = false }: ServicesViewProps) {
  const router = useRouter();

  const MASSAGE_SERVICES = SERVICES_DATA.filter((s) => s.category === "masajes");

  const goToBooking = (serviceId: string) => {
    router.push(
      `${ROUTES.agendar}?servicio=${encodeURIComponent(serviceId)}&plan=0`
    );
  };

  return (
    <div className="animate-fade-in max-w-[1280px] mx-auto px-6 pt-16 pb-20 flex flex-col gap-20 relative z-10">
      {/* Services Hero Section. Se oculta cuando esta vista se incrusta bajo
          el catálogo nuevo de /servicios. */}
      {!ocultarHero && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <span className="bg-primary-soft text-primary-deep px-4 py-1.5 rounded-full w-fit text-xs font-bold tracking-wide border border-primary/20">
              Bienestar a tu puerta
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-5xl text-text-dark font-bold leading-tight">
              Servicios de salud con{" "}
              <span className="text-primary italic font-serif">
                calidez clínica
              </span>
            </h2>
            <p className="text-base sm:text-lg text-lead-muted leading-relaxed font-semibold">
              Ofrecemos fisioterapia y masajes terapéuticos a domicilio en Santo
              Domingo. Recupérate con profesionales de la salud sin tener que
              salir de casa o hacer filas de espera.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#massage-catalog"
                className="bg-primary-strong text-white px-8 py-3.5 rounded-xl text-sm font-bold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/35 hover:bg-primary-deep transition-[color,background-color,border-color,box-shadow,transform] text-center"
              >
                Ver masajes
              </a>
              <a
                href="#combos"
                className="bg-white/80 backdrop-blur-md border border-border-subtle text-primary-deep px-8 py-3.5 rounded-xl text-sm font-bold hover:bg-white hover:border-primary/40 transition-[color,background-color,border-color,box-shadow,transform] text-center shadow-xs"
              >
                Ver combos
              </a>
            </div>
          </div>

          {/* Hero image with a clean glass-card detail tag */}
          <div className="relative h-[340px] sm:h-[450px] rounded-[2rem] overflow-hidden shadow-xl border border-border-subtle group">
            <Image
              alt="Terapia manual y fisioterapia en salón residencial acogedor"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              src={CATALOG_IMAGE}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              unoptimized
            />
            <div className="absolute bottom-6 left-6 bg-white backdrop-blur-md p-4 rounded-2xl flex items-center gap-4 border border-border-subtle shadow-md shadow-slate-900/5">
              <div className="bg-primary/10 p-2.5 rounded-full text-primary flex items-center justify-center">
                <span aria-hidden="true" className="material-symbols-outlined text-2xl">house</span>
              </div>
              <div>
                <p className="font-bold text-sm text-text-dark">
                  Servicio en Santo Domingo
                </p>
                <p className="text-xs text-lead-muted font-semibold">
                  Atención domiciliaria con cita previa
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Massage Catalog Section (List style with ambient decoration image) */}
      <section
        className="flex flex-col gap-16 glass-card p-6 sm:p-10 scroll-mt-24"
        id="massage-catalog"
      >
        <div
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4"
          id="masajes"
        >
          <div>
            <span className="bg-primary-soft text-primary-deep px-3 py-1 text-xs font-bold rounded-full border border-primary/20 uppercase tracking-wider">
              Masoterapia terapéutica
            </span>
            <h2 className="font-serif text-3xl font-bold text-text-dark mt-2">
              Masajes terapéuticos
            </h2>
            <p className="text-sm sm:text-base text-lead-muted mt-2 font-semibold">
              Despierta tus sentidos y libera las tensiones acumuladas con masajes
              diseñados para cuidar cuerpo y mente.
            </p>
          </div>
          <div className="hidden md:block">
            <span aria-hidden="true"
              className="material-symbols-outlined text-6xl text-primary opacity-10"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              spa
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Massage Catalog List */}
          <div className="flex flex-col gap-4">
            {MASSAGE_SERVICES.map((m) => (
              <button
                key={m.id}
                onClick={() => goToBooking(m.id)}
                className="bg-white p-5 rounded-2xl flex items-center justify-between hover:bg-bg-base hover:shadow-md transition-[background-color,color,box-shadow] duration-300 border border-border-subtle cursor-pointer group text-left w-full"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-soft rounded-xl flex items-center justify-center text-primary-strong group-hover:bg-primary-strong group-hover:text-white transition-colors duration-300">
                    <span aria-hidden="true" className="material-symbols-outlined text-[1.75rem]">
                      {SERVICE_ICONS[m.id] ?? m.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-text-dark group-hover:text-primary-deep transition-colors">
                      {m.name}
                    </h3>
                    <p className="text-xs text-lead-muted mt-0.5 font-semibold">
                      {m.description}
                    </p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0 ml-4">
                  <span className="font-serif text-lg sm:text-xl font-bold text-primary-strong block">
                    {formatPrice(m.price)}
                  </span>
                  <span className="text-xs text-lead-muted font-extrabold block">
                    {m.duration} min
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Luxury spa environment picture box */}
          <div className="rounded-[2rem] overflow-hidden h-full min-h-[300px] relative group shadow-sm border border-border-subtle">
            <Image
              alt="Ambiente aromático de calma con piedras de masaje y camilla de terapia en casa"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              src={SPA_IMAGE}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/85 via-primary-deep/45 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 z-10">
              <p className="font-serif text-[1.75rem] font-bold text-white leading-tight">
                Renueva tu energía sin salir de tu hogar
              </p>
              <p className="text-sm text-primary-soft mt-2 font-semibold">
                Coordinamos contigo todos los detalles. El terapeuta lleva el
                material necesario para que solo tengas que relajarte.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Combos & Extras */}
      <section className="flex flex-col gap-12 scroll-mt-24" id="combos">
        <div className="text-center">
          <span className="bg-primary-soft text-primary-deep px-3 py-1 text-xs font-bold border border-primary/20 rounded-full uppercase tracking-wider">
            Combinaciones especiales
          </span>
          <h2 className="font-serif text-3xl font-bold text-text-dark mt-2">
            Combos &amp; extras
          </h2>
          <p className="text-sm sm:text-base text-lead-muted mt-2 font-semibold">
            Potencia tu tratamiento combinando técnicas y añadiendo extras a tu
            sesión.
          </p>
        </div>

        {/* Combos grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {COMBOS_DATA.map((combo) => (
            <div
              key={combo.id}
              className="glass-card p-8 flex flex-col justify-between hover:bg-white hover:shadow-lg transition-[background-color,box-shadow] duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="w-12 h-12 bg-primary-soft rounded-xl flex items-center justify-center text-primary-strong">
                    <span
                      aria-hidden="true"
                      className="material-symbols-outlined text-2xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {combo.icon}
                    </span>
                  </span>
                  <span className="bg-accent-soft text-accent-text border border-accent/50 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {combo.tag}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-text-dark">
                  {combo.name}
                </h3>
                <p className="text-sm text-lead-muted leading-relaxed font-semibold">
                  {combo.description}
                </p>
                <ul className="space-y-2 pt-2 border-t border-border-subtle">
                  {combo.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-xs text-lead-muted font-semibold"
                    >
                      <span
                        aria-hidden="true"
                        className="material-symbols-outlined text-primary-strong text-base select-none"
                      >
                        check_circle
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-border-subtle flex items-end justify-between gap-4">
                <span className="font-serif text-2xl font-bold text-primary-strong">
                  {formatPrice(combo.price)}
                </span>
                <button
                  onClick={() => goToBooking(combo.id)}
                  className="bg-primary-strong text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-primary/25 cursor-pointer hover:bg-primary-deep transition-[color,background-color,box-shadow]"
                >
                  Reservar combo
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Extras + plans */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass-card p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-text-dark">
                  Servicios extra
                </h3>
                <p className="text-sm text-lead-muted font-semibold mt-1">
                  Si ya tomas un servicio, cada extra tiene un costo especial de{" "}
                  <strong className="text-primary-strong">{formatPrice(500)}</strong>.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-border-subtle">
                    <th className="py-2 pr-3 text-xs font-black uppercase tracking-wider text-lead-muted">
                      Extra
                    </th>
                    <th className="py-2 px-3 text-xs font-black uppercase tracking-wider text-lead-muted text-right">
                      Individual
                    </th>
                    <th className="py-2 pl-3 text-xs font-black uppercase tracking-wider text-lead-muted text-right">
                      Con servicio
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {EXTRAS_DATA.map((extra) => (
                    <tr
                      key={extra.id}
                      className="border-b border-border-subtle/60 last:border-0"
                    >
                      <td className="py-3 pr-3">
                        <div className="flex items-center gap-2">
                          <span
                            aria-hidden="true"
                            className="material-symbols-outlined text-primary-strong text-lg"
                          >
                            {extra.icon}
                          </span>
                          <div>
                            <p className="text-sm font-bold text-text-dark">
                              {extra.name}
                            </p>
                            <p className="text-xs text-lead-muted font-semibold">
                              {extra.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right text-sm font-bold text-primary-strong tabular">
                        {formatPrice(extra.individualPrice)}
                      </td>
                      <td className="py-3 pl-3 text-right text-sm font-bold text-primary-strong tabular">
                        +{formatPrice(extra.addOnPrice)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-lead-muted leading-relaxed mt-4 font-semibold">
              *Los extras se solicitan al terapeuta y se aplican según criterio
              clínico. El recargo con servicio se suma a la tarifa de la sesión.
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary-deep via-primary-strong to-primary-deep text-white p-8 rounded-[2rem] flex flex-col justify-between border border-primary/30 shadow-lg">
            <div className="space-y-3">
              <span className="bg-white/15 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider w-fit">
                Ahorro
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">
                Planes de fisioterapia
              </h3>
              <p className="text-sm text-primary-soft leading-relaxed font-semibold">
                Elige la modalidad que mejor se adapte a tu tratamiento y paga
                menos por sesión.
              </p>
              <ul className="space-y-2 text-sm font-semibold text-white">
                <li className="flex items-center justify-between gap-3 border-b border-white/15 pb-2">
                  <span>Plan semanal</span>
                  <strong className="text-accent">5 %</strong>
                </li>
                <li className="flex items-center justify-between gap-3 border-b border-white/15 pb-2">
                  <span>Plan quincenal</span>
                  <strong className="text-accent">10 %</strong>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <span>Plan mensual</span>
                  <strong className="text-accent">15 %</strong>
                </li>
              </ul>
            </div>
            <Link
              href={ROUTES.planes}
              className="mt-6 w-full bg-white text-primary-deep text-center text-sm font-bold py-3 rounded-xl hover:bg-primary-soft transition-colors shadow-md"
            >
              Ver planes y simulador
            </Link>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="flex flex-col gap-8 scroll-mt-24" id="horarios">
        <div className="text-center">
          <span className="bg-primary-soft text-primary-deep px-3 py-1 text-xs font-bold border border-primary/20 rounded-full uppercase tracking-wider">
            Horarios de atención
          </span>
          <h2 className="font-serif text-3xl font-bold text-text-dark mt-2">
            Reserva con cita previa
          </h2>
          <p className="text-sm sm:text-base text-lead-muted mt-2 font-semibold max-w-2xl mx-auto">
            Los horarios pueden variar según la demanda y la disponibilidad del
            fisioterapeuta. Te recomendamos agendar con anticipación.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SCHEDULE_DATA.map((block) => (
            <div
              key={block.days}
              className="glass-card p-6 flex flex-col gap-3 hover:bg-white hover:shadow-lg transition-[background-color,box-shadow] duration-300"
            >
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 bg-primary-soft rounded-xl flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-primary-strong text-xl"
                    aria-hidden="true"
                  >
                    schedule
                  </span>
                </span>
                <p className="font-sans text-xs font-black uppercase tracking-wider text-primary-deep">
                  {block.daysShort}
                </p>
              </div>
              <p className="font-serif text-lg font-bold text-text-dark">
                {block.hours}
              </p>
              <p className="text-sm text-lead-muted font-semibold">
                {block.note ?? block.days}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
