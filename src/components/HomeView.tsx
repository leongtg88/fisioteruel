"use client";

import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/nav";
import { formatPrice } from "@/lib/format";
import { SCHEDULE_DATA } from "@/lib/data";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBqlWyiRvgy_X4zSv82QuiI9TtuJfM9TWV0dOO0VJaFfT0Ueul9slMJEYJ9H7ya3PigHP0s_pzHt5CRHeFxiZxja-y7YD9Ip93-qjnrQ-JIQZPNZ0xiMTkFkGaYYVWR5z_8a3SKpYWt-20v8wBJWv1E6ZenCr5nBwHYZDoTF3MgtuhWrVzIBu1xB7loqgnYUi7Aq1wNo_TDWQw8I78-0u0cDVBG_A-m5F1apTLIOhKs4ztkz2Evdbszs-vxJKjDk3hF5vVQUQi8zSQ";

const DETAIL_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuATpIHhH64lrPvCE0abaxjLVNGuJ--qxK6LY0T_rCdotCe1_oXZqLquLUXF5kxoW9P6QmOpokM6wuNdL5rzJQOu2ZSawIVJoszB75xxncaE1cOTWTu8LEvwSy_8XCawrFe4xwe87Hq7PafrpqsPMkjgOFUnnsFgnjpPB0D8bRABxybIaqmsBNQKhPFbSo3RfobR3TzW4_NAMbSwPV3z52TCx7FnT22hAwb1FCYf4UQgyR7R-tHhjhVdNN_iRqdo9PJd7Wrw5KXzcy8";

const SHOWCASE_CARDS = [
  {
    anchor: "fisioterapia",
    icon: "clinical_notes",
    title: "Fisioterapia a domicilio",
    text: "Evaluación inicial y sesiones personalizadas para recuperar movilidad, aliviar el dolor y mejorar tu calidad de vida.",
    id: "showcase_fisioterapia_btn",
  },
  {
    anchor: "masajes",
    icon: "spa",
    title: "Masajes terapéuticos",
    text: "Descarga de cuerpo completo, masaje relajante, espalda, piernas y liberación de cuello para soltar tensiones.",
    id: "showcase_masajes_btn",
  },
  {
    anchor: "combos",
    icon: "loyalty",
    title: "Combos y planes",
    text: "Combos con extras incluidos y planes semanales, quincenales y mensuales con descuentos pensados para ti.",
    id: "showcase_combos_btn",
  },
];

const QUALITY_LIST = [
  {
    title: "Atención personalizada",
    text: "Cada sesión se adapta a tu condición, tus objetivos y tu ritmo de recuperación. Empezamos siempre con una valoración.",
  },
  {
    title: "Servicio a domicilio",
    text: "Llevamos el tratamiento a tu hogar en Santo Domingo con material profesional y protocolos de higiene.",
  },
  {
    title: "Horarios flexibles",
    text: "Lunes, miércoles y viernes por la noche; martes y jueves por la tarde. Sábados y domingos, previa coordinación.",
  },
];

export default function HomeView() {
  return (
    <div className="animate-fade-in relative z-10">
      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:min-h-[720px] flex items-center px-6 py-12 overflow-hidden bg-transparent">
        <div className="absolute inset-0 z-0 select-none">
          <Image
            className="object-cover"
            alt="Fisioterapeuta atendiendo a un paciente en un salón luminoso de su domicilio"
            src={HERO_IMAGE}
            fill
            sizes="100vw"
            preload
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cream-bg via-cream-bg/85 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-start gap-6 max-w-lg">
            <span className="bg-primary-soft text-primary-deep px-4 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/20">
              Fisioterapia y bienestar a domicilio
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-dark leading-[1.1] tracking-tight font-serif">
              Recupera tu movimiento, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-strong to-secondary">
                sin salir de casa.
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-lead-muted leading-relaxed font-semibold">
              Lleva el equilibrio, la salud y la relajación directamente a tu
              hogar. Cada sesión está pensada para aliviar dolores, mejorar tu
              bienestar físico y ayudarte a reconectar contigo mismo.
            </p>

            <div className="flex flex-wrap gap-4 mt-2">
              <Link
                href={`${ROUTES.agendar}?servicio=eval-fisio&plan=0`}
                className="bg-primary-strong text-white px-8 py-4 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:bg-primary-deep transition-[background-color,box-shadow,transform] hover:-translate-y-px active:translate-y-0"
                id="hero_cta_eval"
              >
                Solicita tu evaluación
              </Link>
              <Link
                href={ROUTES.servicios}
                className="bg-white/80 backdrop-blur-md border border-border-subtle text-primary-deep px-8 py-4 rounded-xl text-sm font-bold transition-[background-color,box-shadow,transform] hover:-translate-y-px hover:bg-white hover:shadow-md"
                id="hero_cta_services"
              >
                Ver servicios
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-8 py-4 border-t border-border-subtle w-full text-xs sm:text-sm text-lead-muted font-bold">
              <span className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-lg text-primary-strong"
                  aria-hidden="true"
                >
                  home_health
                </span>
                A domicilio en Santo Domingo
              </span>
              <span className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-lg text-primary-strong"
                  aria-hidden="true"
                >
                  event_available
                </span>
                Con cita previa
              </span>
              <span className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-lg text-primary-strong"
                  aria-hidden="true"
                >
                  payments
                </span>
                Evaluación {formatPrice(5500)}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Showcase Section */}
      <section className="py-20 max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl text-text-dark font-bold mb-4">
            Nuestros servicios
          </h2>
          <p className="text-base text-lead-muted max-w-2xl mx-auto leading-relaxed font-semibold">
            Fisioterapia, masajes terapéuticos y combos para cuidar tu cuerpo
            desde la comodidad de tu hogar en Santo Domingo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SHOWCASE_CARDS.map((card) => (
            <div
              key={card.anchor}
              className="group relative overflow-hidden glass-card p-8 flex flex-col justify-between hover:bg-white hover:shadow-lg transition-[background-color,box-shadow] duration-300"
            >
              <div>
                <div className="mb-6 text-primary-strong flex items-center justify-center w-14 h-14 bg-primary-soft rounded-2xl group-hover:bg-primary-strong group-hover:text-white transition-colors duration-300">
                  <span
                    className="material-symbols-outlined text-3xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                    aria-hidden="true"
                  >
                    {card.icon}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-text-dark mb-3">
                  {card.title}
                </h3>
                <p className="text-sm text-lead-muted leading-relaxed mb-6 font-semibold">
                  {card.text}
                </p>
              </div>
              <Link
                href={`${ROUTES.servicios}#${card.anchor}`}
                className="text-primary-strong font-bold text-sm tracking-wide text-left flex items-center gap-2 group-hover:translate-x-1.5 transition-transform"
                id={card.id}
              >
                <span>Saber más</span>
                <span
                  className="material-symbols-outlined text-sm"
                  aria-hidden="true"
                >
                  arrow_forward
                </span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Primary CTA Separator Stripe */}
      <section className="py-8 px-6 relative z-10">
        <div className="max-w-[1280px] mx-auto p-8 sm:p-12 rounded-[2rem] bg-gradient-to-br from-primary-strong via-primary to-secondary text-white shadow-xl relative overflow-hidden border border-white/15">
          <div
            className="absolute -top-16 -right-10 w-64 h-64 rounded-full bg-white/15 blur-2xl pointer-events-none"
            aria-hidden="true"
          ></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="flex-grow max-w-2xl">
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold mb-3">
                Comienza tu camino de recuperación hoy
              </h2>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed font-semibold">
                Evaluación inicial a domicilio con diseño de plan de tratamiento
                personalizado por{" "}
                <span className="font-extrabold text-accent text-xl sm:text-2xl tabular">
                  {formatPrice(5500)}
                </span>
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                href={`${ROUTES.agendar}?servicio=eval-fisio&plan=0`}
                className="bg-white text-primary-deep px-8 py-4 rounded-xl text-sm font-bold shadow-lg shadow-black/10 hover:bg-accent hover:text-lead transition-[background-color,color,transform] active:scale-95 inline-block"
                id="stripe_cta_btn"
              >
                Agendar mi evaluación
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-20 max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-12">
          <span className="bg-primary-soft text-primary-deep px-3 py-1 text-xs font-bold border border-primary/20 rounded-full uppercase tracking-wider">
            Horarios de atención
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-text-dark font-bold mt-3">
            Nos adaptamos a tu rutina
          </h2>
          <p className="text-sm sm:text-base text-lead-muted max-w-2xl mx-auto leading-relaxed font-semibold mt-3">
            Las sesiones se realizan con cita previa. Te recomendamos agendar con
            anticipación para asegurar el horario que mejor se ajuste a ti.
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

      {/* Tactile detail section */}
      <section className="py-20 overflow-hidden bg-transparent">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-16">
          <div className="relative">
            <div
              className="absolute -top-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
              aria-hidden="true"
            ></div>
            <div className="relative z-10 h-[400px] w-full rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500">
              <Image
                className="object-cover select-none"
                alt="Detalle de las manos de la fisioterapeuta aplicando una técnica de masaje en la espalda"
                src={DETAIL_IMAGE}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                unoptimized
              />
            </div>
          </div>
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl text-text-dark font-bold mb-8 leading-tight">
              El estándar de cuidado que te mereces
            </h2>

            <ul className="space-y-6">
              {QUALITY_LIST.map((item) => (
                <li key={item.title} className="flex items-start gap-4">
                  <span
                    className="material-symbols-outlined text-primary-strong text-[1.75rem] mt-1 select-none"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                    aria-hidden="true"
                  >
                    check_circle
                  </span>
                  <div>
                    <p className="font-bold text-base text-text-dark">
                      {item.title}
                    </p>
                    <p className="text-sm text-lead-muted mt-1 leading-relaxed font-semibold">
                      {item.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
