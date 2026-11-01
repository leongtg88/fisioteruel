import { ScreenType } from "../types";
import { formatPrice } from "../utils";

interface HomeViewProps {
  setScreen: (screen: ScreenType) => void;
  currency: "EUR" | "DOP";
}

export default function HomeView({ setScreen, currency }: HomeViewProps) {
  return (
    <div className="animate-fade-in relative z-10">
      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:min-h-[720px] flex items-center px-6 py-12 overflow-hidden bg-transparent">
        <div className="absolute inset-0 z-0 select-none">
          <img
            className="w-full h-full object-cover"
            alt="Adult smiling in cozy bright room practicing wellness rehabilitation with deep-teal clad professional therapist"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqlWyiRvgy_X4zSv82QuiI9TtuJfM9TWV0dOO0VJaFfT0Ueul9slMJEYJ9H7ya3PigHP0s_pzHt5CRHeFxiZxja-y7YD9Ip93-qjnrQ-JIQZPNZ0xiMTkFkGaYYVWR5z_8a3SKpYWt-20v8wBJWv1E6ZenCr5nBwHYZDoTF3MgtuhWrVzIBu1xB7loqgnYUi7Aq1wNo_TDWQw8I78-0u0cDVBG_A-m5F1apTLIOhKs4ztkz2Evdbszs-vxJKjDk3hF5vVQUQi8zSQ"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#eef2f6]/98 via-[#eef2f6]/82 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-start gap-6 max-w-lg">
            <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/20">
              Fisioterapia Premium a Domicilio
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight font-serif">
              Recupera tu movimiento, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                sin salir de casa.
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-slate-700 leading-relaxed font-semibold">
              Fisioterapia a domicilio y masajes terapéuticos profesionales en Teruel Capital. Cuidado clínico personalizado en la comodidad de tu hogar.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-2">
              <button
                onClick={() => {
                  setScreen("agendar");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-primary text-white px-8 py-4 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:bg-primary/95 transition-all transform hover:-translate-y-px active:translate-y-0 cursor-pointer"
                id="hero_cta_eval"
              >
                Solicita tu evaluación
              </button>
              <button
                onClick={() => {
                  setScreen("servicios");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-white/45 backdrop-blur-md border border-white/60 text-primary px-8 py-4 rounded-xl text-sm font-bold transition-all transform hover:-translate-y-px active:translate-y-0 cursor-pointer shadow-xs hover:shadow-md hover:bg-white/65"
                id="hero_cta_services"
              >
                Ver Servicios
              </button>
            </div>

            {/* Patients Counter */}
            <div className="flex items-center gap-4 mt-8 py-4 border-t border-slate-300/40 w-full">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-xl">person</span>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-300 overflow-hidden flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary text-xl">face</span>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-400 overflow-hidden flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-xl">diversity_1</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 font-bold">
                <span className="font-extrabold text-primary">+500</span> pacientes recuperados en Teruel capital
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Showcase Section */}
      <section className="py-20 max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 font-bold mb-4">
            Nuestros Servicios Especializados
          </h2>
          <p className="text-base text-slate-700 max-w-2xl mx-auto leading-relaxed font-bold">
            Combinamos técnicas clínicas avanzadas y terapeutas colegiados con la tranquilidad de tu hogar para acelerar y consolidar tu proceso de salud.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Fisioterapia */}
          <div className="group relative overflow-hidden rounded-[2rem] bg-white/40 backdrop-blur-md border border-white/50 p-8 shadow-md flex flex-col justify-between hover:bg-white/55 hover:shadow-lg transition-all duration-300">
            <div>
              <div className="mb-6 text-primary flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>rebase_edit</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">Fisioterapia</h3>
              <p className="text-sm text-slate-700 leading-relaxed mb-6 font-semibold">
                Rehabilitación post-quirúrgica, lesiones deportivas, neurología y manejo del dolor crónico con expertos tutores de alta experiencia.
              </p>
            </div>
            <button
              onClick={() => {
                setScreen("servicios");
                setTimeout(() => {
                  const el = document.getElementById("fisioterapia");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              className="text-primary font-bold text-sm tracking-wide text-left flex items-center gap-2 group-hover:translate-x-1.5 transition-transform cursor-pointer"
              id="showcase_fisioterapia_btn"
            >
              <span>Saber más</span>
              <span className="material-symbols-outlined text-sm font-semibold">arrow_forward</span>
            </button>
          </div>

          {/* Card 2: Masajes */}
          <div className="group relative overflow-hidden rounded-[2rem] bg-white/40 backdrop-blur-md border border-white/50 p-8 shadow-md flex flex-col justify-between hover:bg-white/55 hover:shadow-lg transition-all duration-300">
            <div>
              <div className="mb-6 text-primary flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">Masajes Terapéuticos</h3>
              <p className="text-sm text-slate-700 leading-relaxed mb-6 font-semibold">
                Masajes de tejido profundo (descarga), relajación antiestrés y masajes circulatorios para restaurar el tono muscular óptimo.
              </p>
            </div>
            <button
              onClick={() => {
                setScreen("servicios");
                setTimeout(() => {
                  const el = document.getElementById("masajes");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              className="text-primary font-bold text-sm tracking-wide text-left flex items-center gap-2 group-hover:translate-x-1.5 transition-transform cursor-pointer"
              id="showcase_masajes_btn"
            >
              <span>Saber más</span>
              <span className="material-symbols-outlined text-sm font-semibold">arrow_forward</span>
            </button>
          </div>

          {/* Card 3: Planes */}
          <div className="group relative overflow-hidden rounded-[2rem] bg-white/40 backdrop-blur-md border border-white/50 p-8 shadow-md flex flex-col justify-between hover:bg-white/55 hover:shadow-lg transition-all duration-300">
            <div>
              <div className="mb-6 text-primary flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>loyalty</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">Planes Personalizados</h3>
              <p className="text-sm text-slate-700 leading-relaxed mb-6 font-semibold">
                Membresías preventivas de salud diseñadas para el mantenimiento de deportistas, personas mayores y cuidado familiar continuado.
              </p>
            </div>
            <button
              onClick={() => {
                setScreen("servicios");
                setTimeout(() => {
                  const el = document.getElementById("combos");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              className="text-primary font-bold text-sm tracking-wide text-left flex items-center gap-2 group-hover:translate-x-1.5 transition-transform cursor-pointer"
              id="showcase_combos_btn"
            >
              <span>Saber más</span>
              <span className="material-symbols-outlined text-sm font-semibold">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Primary CTA Separator Stripe - Refined Frosted Overlay Column */}
      <section className="py-8 px-6 relative z-10">
        <div className="max-w-[1280px] mx-auto p-8 sm:p-12 rounded-[2rem] bg-gradient-to-r from-primary to-secondary text-white shadow-xl relative overflow-hidden border border-white/15">
          <div className="absolute inset-0 bg-white/5 opacity-10 pointer-events-none"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="flex-grow max-w-2xl">
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold mb-3">
                Comienza tu camino de recuperación hoy
              </h2>
              <p className="text-base sm:text-lg opacity-90 leading-relaxed font-semibold">
                Primera evaluación física completa a domicilio con diseño de plan correctivo personalizado por solo{" "}
                <span className="font-extrabold text-amber-300 text-xl sm:text-2xl">{formatPrice(5500, currency)}</span>
                {currency === "EUR" ? " (5.500 DOP$)" : " (65 €)"}
              </p>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={() => {
                  setScreen("agendar");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-white text-primary px-8 py-4 rounded-xl text-sm font-bold shadow-lg shadow-black/10 hover:bg-slate-50 hover:scale-105 transition-all active:scale-95 cursor-pointer border border-transparent"
                id="stripe_cta_btn"
              >
                Agendar mi evaluación
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tactile detail section - Blends with custom grey background */}
      <section className="py-20 overflow-hidden bg-transparent">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-16">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            <img
              className="rounded-3xl shadow-xl relative z-10 w-full h-[400px] object-cover select-none hover:shadow-2xl transition-shadow duration-500"
              alt="Close-up detail of therapist hands massage technique on human back skin in warm lit environment"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuATpIHhH64lrPvCE0abaxjLVNGuJ--qxK6LY0T_rCdotCe1_oXZqLquLUXF5kxoW9P6QmOpokM6wuNdL5rzJQOu2ZSawIVJoszB75xxncaE1cOTWTu8LEvwSy_8XCawrFe4xwe87Hq7PafrpqsPMkjgOFUnnsFgnjpPB0D8bRABxybIaqmsBNQKhPFbSo3RfobR3TzW4_NAMbSwPV3z52TCx7FnT22hAwb1FCYf4UQgyR7R-tHhjhVdNN_iRqdo9PJd7Wrw5KXzcy8"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 font-bold mb-8 leading-tight">
              El estándar de cuidado clínico que te mereces
            </h2>

            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-2.5xl mt-1 select-none">check_circle</span>
                <div>
                  <p className="font-bold text-base text-slate-900">Fisioterapeutas Colegiados</p>
                  <p className="text-sm text-slate-700 mt-1 leading-relaxed font-semibold">
                    Todos nuestros terapeutas colaboradores están titulados universitarios y oficialmente colegiados, garantizando máxima seguridad en tu salud.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-2.5xl mt-1 select-none">check_circle</span>
                <div>
                  <p className="font-bold text-base text-slate-900">Equipamiento Portátil Avanzado</p>
                  <p className="text-sm text-slate-700 mt-1 leading-relaxed font-semibold">
                    Llevamos camillas plegables de alto confort clínico, aceites esenciales de grado médico y materiales de soporte directo hasta tu domicilio.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-2.5xl mt-1 select-none">check_circle</span>
                <div>
                  <p className="font-bold text-base text-slate-900">Horarios Flexibles Especiales</p>
                  <p className="text-sm text-slate-700 mt-1 leading-relaxed font-semibold">
                    Atención domiciliaria a tu medida de lunes a sábado de 7:00 AM a 8:00 PM. Nos adaptamos a tus rutinas laborales y familiares.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
