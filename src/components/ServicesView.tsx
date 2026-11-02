"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { COMBOS_DATA, EXTRAS_DATA, SERVICES_DATA } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { ROUTES } from "@/lib/nav";

const CATALOG_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCrDeUO6cmTShp1YjLFYTrY50ZIekyNZ2V-x-sEo1jZCHGCX7ZgXgpS8tvA6Stmi3N6M62rFvHjrmnD_imFvZr4vu9TaCLdznC-vjhuSHtf3FJSKNqSTVCYvkFEfkpudRjzmeJa1lHbfTPaSgAtL9XoeMPEhSkxKskwwki_rgDNUZhUFFUttfM5TLOeZwqStqVwxIlCU8PD5XbRJhBY0W9PLrc-Q93yJ_cFsAdlIJwR9GzV4c0UieE39h8Oczw-wXqBjBmOu0Rcf6w";

const SPA_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCpjZ4Ye79SK-Y76cv0EiUrTCy7lR6PHqPFbwjOOcpNRCe6cqXVxCE7XAaCB4glgCQIEXqc2XkRKmWyDxGvsPx5SZRsN_2MdKZecPAHmIGluP2fi6qgCPSvmpetXMjKSYL_83oxlnS1l83KMM4MXKgiHET4j4P8YNNaA9V3QZ4L72l0a9mcIW9IDo7axThB-fKjJoBWIj5iyOStz5QMM_jT_v4Ve0V0qfLEbGAwbsYt2Z198ACkTVD_Tre8irxO7OmJFtXW8NfxXic";

/** Iconos por servicio (era un ternario inline en el original). */
const SERVICE_ICONS: Record<string, string> = {
  "eval-integral": "clinical_notes",
  "sesion-terapia": "exercise",
  "descarga-completa": "fitness_center",
  "masaje-relajante": "self_improvement",
  "espalda-piernas": "man",
  "masaje-cuello": "accessibility",
};

interface ServicesViewProps {
  /**
   * /servicios ya arranca con el hero del diseño de especialidades, así que
   * aquí se omite el propio para no apilar dos cabeceras.
   */
  ocultarHero?: boolean;
}

export default function ServicesView({ ocultarHero = false }: ServicesViewProps) {
  const router = useRouter();

  // Splitting data categories for clean presentation
  const PT_SERVICES = SERVICES_DATA.filter((s) => s.category === "fisioterapia");
  const MASSAGE_SERVICES = SERVICES_DATA.filter((s) => s.category === "masajes");

  const goToBooking = () => {
    // Los ids del catálogo antiguo (eval-integral, descarga-completa…) no
    // existen en el asistente nuevo, que trabaja con trauma/deporte/
    // geriatrica/neuro: se abre la reserva sin preselección.
    router.push(ROUTES.agendar);
  };

  return (
    <div className="animate-fade-in max-w-[1280px] mx-auto px-6 py-12 flex flex-col gap-16 relative z-10">
      {/* Services Hero Section. Se oculta cuando esta vista se incrusta bajo
          el catálogo nuevo de /servicios. */}
      {!ocultarHero && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full w-fit text-xs font-bold tracking-wide border border-primary/20">
              Bienestar a tu puerta
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-5xl text-slate-900 font-bold leading-tight">
              Servicios de Salud con{" "}
              <span className="text-primary italic font-serif">
                Calidez Clínica
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-semibold">
              Ofrecemos fisioterapia y masajes terapéuticos de alta gama en la
              comodidad de tu hogar en Teruel Capital. Recupérate con expertos de
              la salud colegiados sin tener que salir de casa o hacer filas de
              espera.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#pt-catalog"
                className="bg-primary text-white px-8 py-3.5 rounded-xl text-sm font-bold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/35 hover:bg-primary/90 transition-all text-center"
              >
                Fisioterapia Domicilio
              </a>
              <a
                href="#massage-catalog"
                className="bg-white/45 backdrop-blur-md border border-white/60 text-primary px-8 py-3.5 rounded-xl text-sm font-bold hover:bg-white/65 hover:border-primary/20 transition-all text-center shadow-xs"
              >
                Masajes de Descarga
              </a>
            </div>
          </div>

          {/* Hero image with a clean glass-card detail tag */}
          <div className="relative h-[340px] sm:h-[450px] rounded-[2rem] overflow-hidden shadow-xl border border-white/30 group">
            <Image
              alt="Terapia manual y fisioterapia en salón residencial acogedor"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              src={CATALOG_IMAGE}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              unoptimized
            />
            <div className="absolute bottom-6 left-6 bg-white/60 backdrop-blur-md p-4 rounded-2xl flex items-center gap-4 border border-white/60 shadow-md shadow-slate-900/5">
              <div className="bg-primary/10 p-2.5 rounded-full text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">house</span>
              </div>
              <div>
                <p className="font-bold text-sm text-slate-900">
                  Servicio en Teruel capital
                </p>
                <p className="text-xs text-slate-700 font-semibold">
                  Atención domiciliaria 100% segura
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PT Catalog Section */}
      <section className="flex flex-col gap-8 scroll-mt-24" id="pt-catalog">
        <div className="text-center">
          <span className="bg-white/45 backdrop-blur-xs text-xs font-bold px-3 py-1 border border-white/60 text-primary rounded-full uppercase tracking-wider">
            Planificación Profesional
          </span>
          <h3
            className="font-serif text-3xl font-bold text-slate-900 mt-2"
            id="fisioterapia"
          >
            Fisioterapia a Domicilio
          </h3>
          <p className="text-sm text-slate-700 mt-2 font-bold">
            Tratamientos especializados dirigidos por profesionales de la salud
            colegiados
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PT_SERVICES.map((serv) => (
            <div
              key={serv.id}
              className="bg-white/45 backdrop-blur-md p-8 rounded-[2rem] shadow-md border border-white/55 flex flex-col justify-between hover:bg-white/50 hover:shadow-lg transition-all duration-[350ms] hover:-translate-y-0.5"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span
                    className="material-symbols-outlined text-primary text-4xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {SERVICE_ICONS[serv.id] ?? serv.icon}
                  </span>
                  {serv.badge && (
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20">
                      {serv.badge}
                    </span>
                  )}
                </div>

                <h4 className="font-serif text-2xl font-bold text-slate-900">
                  {serv.name}
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed font-semibold">
                  {serv.description}
                </p>

                <ul className="space-y-2 py-2 border-t border-white/30">
                  {serv.details?.map((det) => (
                    <li
                      key={det}
                      className="flex items-center gap-2 text-slate-700 text-xs font-semibold"
                    >
                      <span className="material-symbols-outlined text-primary text-base select-none">
                        check_circle
                      </span>
                      <span>{det}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-white/30 flex items-end justify-between">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 font-bold">
                    {serv.id === "eval-integral"
                      ? "Pago Único Inicial"
                      : "Precio por sesión"}
                  </span>
                  <span className="font-serif text-2xl font-bold text-primary">
                    {formatPrice(serv.price)}
                  </span>
                </div>
                <button
                  onClick={() => goToBooking()}
                  className="bg-primary text-white px-7 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-primary/25 cursor-pointer hover:bg-primary/95 hover:shadow-lg transition-all"
                >
                  Reservar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Massage Catalog Section (List style with ambient decoration image) */}
      <section
        className="flex flex-col gap-8 bg-white/35 backdrop-blur-xl rounded-[2.5rem] border border-white/50 p-6 sm:p-10 shadow-lg scroll-mt-24"
        id="massage-catalog"
      >
        <div
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4"
          id="masajes"
        >
          <div>
            <span className="bg-primary/10 text-primary px-3 py-1 text-xs font-bold rounded-full border border-primary/20 uppercase tracking-wider">
              Masoterapia Estética y Salud
            </span>
            <h3 className="font-serif text-3xl font-bold text-slate-900 mt-2">
              Masajes Terapéuticos
            </h3>
            <p className="text-sm text-slate-700 mt-2 font-bold">
              Libera tensiones profundas y restaura el balance muscular perfecto
            </p>
          </div>
          <div className="hidden md:block">
            <span
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
                onClick={() => goToBooking()}
                className="bg-white/45 backdrop-blur-sm p-5 rounded-2xl flex items-center justify-between hover:bg-white/60 hover:shadow-md transition-all duration-300 border border-white/40 cursor-pointer group text-left w-full"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <span className="material-symbols-outlined text-[1.75rem]">
                      {SERVICE_ICONS[m.id] ?? m.icon}
                    </span>
                  </div>
                  <div>
                    <h5 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-primary transition-colors">
                      {m.name}
                    </h5>
                    <p className="text-xs text-slate-600 mt-0.5 font-semibold">
                      {m.description}
                    </p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0 ml-4">
                  <span className="font-serif text-lg sm:text-xl font-bold text-primary block">
                    {formatPrice(m.price)}
                  </span>
                  {m.badge ? (
                    <span className="text-[10px] text-primary font-bold uppercase tracking-widest mt-0.5 block group-hover:text-secondary">
                      {m.badge}
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500 font-extrabold block">
                      {m.duration} min
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Luxury spa environment picture box */}
          <div className="rounded-[2rem] overflow-hidden h-full min-h-[300px] relative group shadow-sm border border-white/50">
            <Image
              alt="Ambiente aromático de calma con piedras de masaje y camilla de terapia en casa"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              src={SPA_IMAGE}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/30 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 z-10">
              <p className="font-serif text-[1.75rem] font-bold text-white leading-tight">
                Renueva tu energía sin salir de tu hogar
              </p>
              <p className="text-sm text-gray-200 mt-2 font-semibold">
                Pactamos de antemano todos los detalles. El terapeuta trae música
                zen, toallas mullidas aromatizadas y aceites antialérgicos para
                tu plena relajación.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Combos & Extras Bento Grid Catalog */}
      <section className="flex flex-col gap-8 scroll-mt-24" id="combos">
        <div className="text-center">
          <span className="bg-white/45 backdrop-blur-xs text-xs font-bold px-3 py-1 border border-white/60 text-primary rounded-full uppercase tracking-wider">
            Combinaciones Especiales y Tratamiento Avanzado
          </span>
          <h4 className="font-serif text-3xl font-bold text-slate-900 mt-2">
            Combos &amp; Extras de Alta Gama
          </h4>
          <p className="text-sm text-slate-700 mt-2 font-bold">
            Maximiza tu bienestar corporal combinando tecnología y masoterapia
            avanzada
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Bento Card 1: Combo Renuévate Plus (Big Card with gradient) */}
          <div className="md:col-span-2 bg-gradient-to-br from-primary to-secondary text-white p-8 rounded-[2rem] flex flex-col justify-between relative overflow-hidden group border border-white/10 shadow-lg min-h-[350px]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-105 transition-transform duration-500"></div>

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2 text-amber-300">
                <span className="material-symbols-outlined text-xl">
                  {COMBOS_DATA[0].icon}
                </span>
                <span className="text-xs uppercase tracking-wider font-bold">
                  {COMBOS_DATA[0].tag}
                </span>
              </div>
              <h4 className="font-serif text-3xl font-bold text-white">
                {COMBOS_DATA[0].name}
              </h4>
              <p className="text-sm opacity-90 max-w-md leading-relaxed font-semibold">
                La experiencia de descanso y salud definitiva. Combinación única
                en la misma sesión de Terapia Manual Clínica + Masaje de Descarga
                Profunda para una recuperación muscular completa. ¡Recomendada
                por atletas!
              </p>
            </div>

            <div className="relative z-10 mt-8 flex items-end justify-between">
              <div className="flex flex-col">
                <span className="text-xs opacity-80 font-bold">
                  Sesión Combinada Especial de 90 min
                </span>
                <span className="font-serif text-4xl font-bold">
                  {formatPrice(COMBOS_DATA[0].price)}
                </span>
              </div>
              <button
                onClick={() => goToBooking()}
                className="bg-white text-primary font-bold text-sm px-8 py-3 rounded-xl hover:shadow-xl hover:bg-slate-50 transition-all cursor-pointer transform hover:-translate-y-px active:translate-y-0"
              >
                Lo quiero
              </button>
            </div>
          </div>

          {/* Bento Card 2: Technical Extras Card */}
          <div className="bg-white/45 backdrop-blur-md p-8 rounded-[2rem] flex flex-col justify-between border border-white/50 shadow-md">
            <div className="space-y-4">
              <h4 className="font-serif text-xl font-bold text-slate-900">
                Extras Premium
              </h4>
              <p className="text-xs text-slate-600 font-bold leading-relaxed">
                Suma un beneficio tecnológico a cualquier sesión básica:
              </p>

              <div className="space-y-3 pt-2">
                {EXTRAS_DATA.map((extra) => (
                  <div
                    key={extra.id}
                    className="flex justify-between items-center py-2 border-b border-slate-300/20"
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-xl">
                        {extra.icon}
                      </span>
                      <span className="text-sm text-slate-900 font-bold">
                        {extra.name}
                      </span>
                    </div>
                    <span className="text-secondary font-bold text-sm">
                      +{formatPrice(extra.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[10px] text-slate-500 leading-relaxed mt-4 font-bold">
              *Los extras se solicitan al terapeuta el día de la sesión y se
              aplican según criterio clínico.
            </p>
          </div>

          {/* Bento Card 3: Combo Energía Total with gradient */}
          <div className="bg-gradient-to-br from-secondary to-[#1d4ed8] text-white p-8 rounded-[2rem] flex flex-col justify-between min-h-[300px] border border-white/10 shadow-lg">
            <div className="space-y-4">
              <div className="bg-white/10 w-fit p-2 rounded-lg text-white">
                <span className="material-symbols-outlined text-white">
                  {COMBOS_DATA[1].icon}
                </span>
              </div>
              <h4 className="font-serif text-2xl font-bold text-white">
                {COMBOS_DATA[1].name}
              </h4>
              <p className="text-sm opacity-85 leading-relaxed font-semibold">
                Tratamiento exprés de 50 minutos que fusiona masaje terapéutico
                localizado para aflojar contracturas musculares críticas con
                estiramientos guiados asistidos.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <span className="font-serif text-3xl font-bold">
                {formatPrice(COMBOS_DATA[1].price)}
              </span>
              <button
                onClick={() => goToBooking()}
                className="w-full bg-white text-secondary text-center text-sm font-bold py-3 rounded-xl hover:bg-slate-50 transition-all cursor-pointer shadow-md"
              >
                Agendar Sesión
              </button>
            </div>
          </div>

          {/* Bento Card 4: Membership & Frequent Clients Card */}
          <div className="md:col-span-2 bg-slate-900/85 backdrop-blur-lg text-white p-8 rounded-[2rem] flex flex-col md:flex-row items-center gap-8 border border-slate-800/80 shadow-xl">
            <div className="flex-1 space-y-4 text-left">
              <h4 className="font-serif text-2xl font-bold text-white">
                ¿Eres cliente frecuente?
              </h4>
              <p className="text-sm opacity-95 leading-relaxed font-semibold">
                Pregunta por nuestras membresías mensuales preventivas y bonos de
                4 y 8 sesiones para ti o tu familia. Obtén hasta un{" "}
                <span className="bg-primary/25 border border-primary/45 text-white px-2.5 py-0.5 rounded font-extrabold">
                  20% de descuento directo
                </span>{" "}
                en tu presupuesto anual.
              </p>
              <a
                href="mailto:info@fisioteruel.com?subject=Consulta de abonos y membresías mensuales Fisioteruel"
                className="inline-block bg-primary text-white text-xs font-bold px-6 py-3 rounded-xl mt-2 tracking-wide shadow-md shadow-primary/25 hover:bg-primary/90 transition-shadow"
              >
                Solicitar información de Bonos
              </a>
            </div>
            <div className="w-full md:w-1/3 flex justify-center text-white">
              <span className="material-symbols-outlined text-8xl opacity-20 select-none">
                card_membership
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
