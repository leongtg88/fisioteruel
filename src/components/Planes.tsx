import { useState, FormEvent } from 'react';
import Image from 'next/image';
import { Calendar, Check, Info, Calculator, CreditCard, Landmark, Banknote, Sparkles, Send } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Tab } from '../types';
import { formatPrice } from '@/lib/format';
import { PLAN_TIERS, SERVICES_DATA } from '@/lib/data';

interface PlanesProps {
  onChangeTab: (tab: Tab) => void;
  onSelectServiceAndPlan?: (serviceId: string, planDiscount: number) => void;
}

type PlanTierKey = keyof typeof PLAN_TIERS;

const FISIO_SERVICES = SERVICES_DATA.filter(
  (service) => service.category === 'fisioterapia'
);

const THERAPIES: Record<string, { name: string; price: number; desc: string }> =
  Object.fromEntries(
    FISIO_SERVICES.map((service) => [
      service.id,
      {
        name: service.name,
        price: service.price,
        desc: service.description,
      },
    ])
  );

export default function Planes({ onChangeTab, onSelectServiceAndPlan }: PlanesProps) {
  const shouldReduceMotion = useReducedMotion();
  // Calculator state
  const [selectedTherapy, setSelectedTherapy] = useState('sesion-fisio');
  const [sessionCount, setSessionCount] = useState(4);
  const [selectedPlanTier, setSelectedPlanTier] = useState<PlanTierKey>('quincenal');

  // Simulated support expert state
  const [questionText, setQuestionText] = useState('');
  const [showStatus, setShowStatus] = useState(false);

  // Plan discounts
  const planTiers = PLAN_TIERS;

  // Calculatings
  const currentTherapy = THERAPIES[selectedTherapy] ?? THERAPIES['sesion-fisio'];
  const baseSessionPrice = currentTherapy.price;
  const rawTotal = baseSessionPrice * sessionCount;
  const discountPct = planTiers[selectedPlanTier].discount;
  const discountAmount = rawTotal * (discountPct / 100);
  const finalPrice = rawTotal - discountAmount;

  const handleApplyQuote = () => {
    if (onSelectServiceAndPlan) {
      onSelectServiceAndPlan(selectedTherapy, discountPct);
    } else {
      onChangeTab('agendar');
    }
  };

  const choosePlan = (tier: PlanTierKey) => {
    setSelectedPlanTier(tier);
    if (onSelectServiceAndPlan) {
      onSelectServiceAndPlan('sesion-fisio', planTiers[tier].discount);
    } else {
      onChangeTab('agendar');
    }
  };

  const handleSendQuestion = (e: FormEvent) => {
    e.preventDefault();
    if (questionText.trim()) {
      setShowStatus(true);
      setTimeout(() => {
        setShowStatus(false);
        setQuestionText('');
      }, 4000);
    }
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
      className="max-w-[1280px] mx-auto px-6 pt-10 pb-20 space-y-20"
    >
      {/* Hero Section */}
      <section className="relative w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block bg-primary-soft text-primary-deep font-sans text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider border border-primary/20">
              Bienestar y flexibilidad a tu alcance
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-text-dark tracking-tight leading-tight">
              Paga con flexibilidad y ahorra.
            </h1>
            <p className="font-sans text-base sm:text-lg text-lead-muted leading-relaxed max-w-xl font-semibold">
              En <strong className="text-text-dark font-bold">Fisioteruel</strong>,
              entendemos que la constancia es clave para una rehabilitación eficaz.
              Hemos diseñado planes de ahorro para que continúes tu proceso sin
              interrupciones, con la comodidad de tu hogar en Santo Domingo.
            </p>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="rounded-[2rem] overflow-hidden aspect-[4/3] sm:aspect-square shadow-xl relative border border-border-subtle">
              <Image
                src="https://images.unsplash.com/photo-1519824145371-296894a0daa9?auto=format&fit=crop&w=800&q=80"
                alt="Paciente recibiendo estiramientos terapéuticos a domicilio"
                width={800}
                height={800}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Visual glow element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent-light rounded-full opacity-60 blur-2xl -z-10" aria-hidden="true"></div>
          </div>
        </div>
      </section>

      {/* Plans Columns */}
      <section className="space-y-16">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-dark">Planes de fisioterapia</h2>
          <p className="font-sans text-sm sm:text-base text-lead-muted font-semibold">
            Cada tratamiento inicia con una primera sesión de evaluación. Después,
            el fisioterapeuta define la duración y frecuencia según tu progreso.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Plan Semanal */}
          <div className="glass-card p-8 flex flex-col justify-between relative group hover:bg-white hover:shadow-lg transition-[background-color,box-shadow] duration-300">
            <div>
              <div className="w-14 h-14 bg-primary-soft rounded-2xl flex items-center justify-center mb-6">
                <Calendar className="w-7 h-7 text-primary-strong" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-text-dark mb-1">Semanal</h3>
              <div className="text-accent-text font-sans font-extrabold text-3xl mb-4 tabular">5% desc.</div>
              <p className="font-sans text-sm text-lead-muted mb-6 leading-relaxed font-semibold">
                Ideal para quienes prefieren pagos más frecuentes y un seguimiento
                constante durante la semana.
              </p>
              <ul className="space-y-3.5 mb-8 text-xs sm:text-sm text-lead-muted">
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-primary-soft text-primary-strong flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                  <span>Sesiones dentro de la misma semana</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-primary-soft text-primary-strong flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                  <span>Evaluación inicial</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-primary-soft text-primary-strong flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                  <span>Seguimiento y apoyo vía WhatsApp</span>
                </li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => choosePlan('semanal')}
              className="w-full py-3 bg-primary-strong border border-transparent text-white font-sans font-bold text-sm rounded-xl hover:bg-primary-deep cursor-pointer transition-colors shadow-md shadow-primary/20"
            >
              Elegir plan semanal
            </button>
          </div>

          {/* Plan Quincenal - DESTACADO */}
          <div className="glass-card p-8 flex flex-col justify-between border-2 border-primary shadow-lg hover:bg-white hover:shadow-xl relative group transition-[background-color,box-shadow] duration-300">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-lead px-4 py-1 rounded-full text-xs font-bold font-sans tracking-wide shadow-sm flex items-center gap-1.5 uppercase">
              <Sparkles className="w-3 h-3 text-lead" aria-hidden="true" />
              Más popular
            </div>
            <div>
              <div className="w-14 h-14 bg-primary-soft rounded-2xl flex items-center justify-center mb-6">
                <Calendar className="w-7 h-7 text-primary-strong" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-text-dark mb-1">Quincenal</h3>
              <div className="text-accent-text font-sans font-extrabold text-3xl mb-4 tabular">10% desc.</div>
              <p className="font-sans text-sm text-lead-muted mb-6 leading-relaxed font-semibold">
                Una opción equilibrada que combina comodidad y ahorro para
                tratamientos sostenidos.
              </p>
              <ul className="space-y-3.5 mb-8 text-xs sm:text-sm text-lead-muted">
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-accent-soft text-accent-text flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                  <span>Sesiones durante la quincena</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-accent-soft text-accent-text flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                  <span>Pauta personalizada de ejercicios caseros</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-accent-soft text-accent-text flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                  <span>Soporte de consulta prioritario</span>
                </li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => choosePlan('quincenal')}
              className="w-full py-3 bg-accent-strong text-lead font-sans font-bold text-sm rounded-xl hover:bg-accent cursor-pointer shadow-md transition-colors"
            >
              Elegir plan quincenal
            </button>
          </div>

          {/* Plan Mensual */}
          <div className="glass-card p-8 flex flex-col justify-between relative group hover:bg-white hover:shadow-lg transition-[background-color,box-shadow] duration-300">
            <div>
              <div className="w-14 h-14 bg-primary-soft rounded-2xl flex items-center justify-center mb-6">
                <Calendar className="w-7 h-7 text-primary-strong" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-text-dark mb-1">Mensual</h3>
              <div className="text-accent-text font-sans font-extrabold text-3xl mb-4 tabular">15% desc.</div>
              <p className="font-sans text-sm text-lead-muted mb-6 leading-relaxed font-semibold">
                La alternativa más conveniente para tratamientos de mayor duración
                y mantenimiento del bienestar.
              </p>
              <ul className="space-y-3.5 mb-8 text-xs sm:text-sm text-lead-muted">
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-primary-soft text-primary-strong flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                  <span>Sesiones durante el mes</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-primary-soft text-primary-strong flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                  <span>Informe escrito de evolución</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-primary-soft text-primary-strong flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                  <span>Horarios recurrentes fijos reservados</span>
                </li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => choosePlan('mensual')}
              className="w-full py-3 bg-primary-strong border border-transparent text-white font-sans font-bold text-sm rounded-xl hover:bg-primary-deep cursor-pointer transition-colors shadow-md shadow-primary/20"
            >
              Elegir plan mensual
            </button>
          </div>
        </div>

        {/* Note Box */}
        <div className="p-5 bg-accent-soft/70 border border-accent/50 rounded-2xl max-w-3xl mx-auto flex gap-4 items-start shadow-sm">
          <Info className="w-5 h-5 text-accent-text shrink-0 mt-0.5" aria-hidden="true" />
          <p className="font-sans text-xs sm:text-sm text-lead-muted italic leading-relaxed">
            <strong className="text-text-dark font-bold">Nota:</strong> los
            descuentos aplican únicamente a servicios de fisioterapia (evaluación
            y sesiones). La evaluación inicial se abona una sola vez y el
            fisioterapeuta definirá la duración y frecuencia del tratamiento. No
            acumulable a otras promociones simultáneas.
          </p>
        </div>
      </section>

      {/* Interactive Pricing Simulator */}
      <section className="glass-card p-6 sm:p-10 space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-strong text-white rounded-lg flex items-center justify-center">
            <Calculator className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-text-dark">Simulador de tarifas interactivo</h2>
            <p className="font-sans text-xs sm:text-sm text-lead-muted mt-0.5">Calcula al instante tu presupuesto con el descuento del plan aplicado.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Controls Panel */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Therapy selection */}
            <fieldset className="space-y-2.5">
              <legend className="font-sans text-sm font-bold text-text-dark block mb-2.5">
                1. Selecciona el servicio de fisioterapia:
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(THERAPIES).map(([key, item]) => (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={selectedTherapy === key}
                    onClick={() => setSelectedTherapy(key)}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-colors ${
                      selectedTherapy === key
                        ? 'border-primary-strong bg-white shadow-md ring-2 ring-primary/10'
                        : 'border-border-subtle bg-white/70 hover:border-primary/50'
                    }`}
                  >
                    <span className="font-sans text-xs font-bold text-primary-strong block">{item.name}</span>
                    <span className="font-serif text-sm font-semibold text-text-dark inline-block mt-1 tabular">{formatPrice(item.price)} / sesión</span>
                    <span className="font-sans text-xs text-lead-muted block mt-1 leading-tight">{item.desc}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Step 2: Session range */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <label htmlFor="session_count" className="font-sans text-sm font-bold text-text-dark block">
                  2. Número de sesiones sugeridas o requeridas:
                </label>
                <span className="bg-primary-soft text-primary-deep font-sans font-extrabold px-3 py-1 rounded-lg text-sm tabular">
                  {sessionCount} {sessionCount === 1 ? 'sesión' : 'sesiones'}
                </span>
              </div>
              <input
                id="session_count"
                name="sesiones"
                type="range"
                min="1"
                max="15"
                value={sessionCount}
                onChange={(e) => setSessionCount(parseInt(e.target.value))}
                className="w-full h-2 bg-border-subtle rounded-lg appearance-none cursor-pointer accent-primary-strong"
                aria-valuetext={`${sessionCount} sesiones`}
              />
              <div className="flex justify-between text-xs text-lead-muted font-sans font-medium px-1">
                <span>1 sesión</span>
                <span>5 sesiones</span>
                <span>10 sesiones</span>
                <span>15 sesiones</span>
              </div>
            </div>

            {/* Step 3: Bundle tier selection */}
            <fieldset className="space-y-2.5">
              <legend className="font-sans text-sm font-bold text-text-dark block mb-2.5">
                3. Elige tu modalidad de ahorro:
              </legend>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(Object.entries(planTiers) as [PlanTierKey, (typeof PLAN_TIERS)[PlanTierKey]][]).map(([key, tier]) => (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={selectedPlanTier === key}
                    onClick={() => setSelectedPlanTier(key)}
                    className={`p-3 rounded-lg border text-center transition-colors cursor-pointer ${
                      selectedPlanTier === key
                        ? 'border-primary-strong bg-primary-strong text-white shadow'
                        : 'border-border-subtle bg-white hover:bg-bg-base text-lead-muted'
                    }`}
                  >
                    <span className="font-sans text-xs font-bold block">{tier.name}</span>
                    <span className={`${selectedPlanTier === key ? 'text-accent-soft' : 'text-primary-strong'} font-serif text-sm font-bold block mt-1 tabular`}>
                      {tier.discount === 0 ? 'Sin desc.' : `-${tier.discount}%`}
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          {/* Pricing Result Card */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-border-subtle shadow-sm space-y-6 relative flex flex-col justify-between h-full">
              {discountPct > 0 && (
                <div className="absolute top-4 right-4 bg-accent-soft text-accent-text font-sans text-xs font-bold px-2.5 py-1 rounded-md">
                  ¡Ahorras {discountPct}%!
                </div>
              )}

              <div className="space-y-4">
                <span className="font-sans text-xs font-bold tracking-wider text-lead-muted uppercase block">
                  Resumen de tu estimación
                </span>

                <div className="border-b border-border-subtle pb-4 space-y-2">
                  <div className="flex justify-between font-sans text-sm text-lead-muted">
                    <span>Servicio escogido:</span>
                    <span className="font-semibold text-text-dark text-right">
                      {currentTherapy.name}
                    </span>
                  </div>
                  <div className="flex justify-between font-sans text-sm text-lead-muted">
                    <span>Sesiones:</span>
                    <span className="font-semibold text-text-dark tabular">{sessionCount}</span>
                  </div>
                  <div className="flex justify-between font-sans text-sm text-lead-muted">
                    <span>Precio por sesión base:</span>
                    <span className="font-semibold text-text-dark tabular">{formatPrice(baseSessionPrice)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between font-sans text-sm text-lead-muted">
                    <span>Total sin descuento:</span>
                    <span className="line-through text-lead-muted tabular">{formatPrice(rawTotal)}</span>
                  </div>

                  {discountPct > 0 && (
                    <div className="flex justify-between font-sans text-sm text-accent-text">
                      <span>Descuento ({discountPct}%):</span>
                      <span className="font-bold tabular">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-baseline pt-2">
                    <span className="font-sans text-base font-bold text-text-dark">Total aproximado:</span>
                    <span className="font-serif text-3xl sm:text-4xl font-extrabold text-primary-deep tabular">
                      {formatPrice(finalPrice)}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-lead-muted text-right italic tabular">
                    ~ {formatPrice(finalPrice / sessionCount)} la sesión en tu domicilio
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleApplyQuote}
                  className="w-full py-4 bg-primary-strong hover:bg-primary-deep text-white font-sans font-bold text-sm sm:text-base rounded-xl cursor-pointer transition-colors shadow-md flex items-center justify-center gap-2 border border-transparent"
                >
                  <Calculator className="w-4 h-4 text-accent-soft" aria-hidden="true" />
                  Reservar con esta tarifa estimada
                </button>
                <span className="font-sans text-xs text-lead-muted text-center block mt-2">
                  *El fisioterapeuta confirmará la prescripción en la sesión de valoración.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment methods list */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-dark mb-4">
            Múltiples formas de pago para tu máxima comodidad.
          </h2>
          <p className="font-sans text-sm sm:text-base text-lead-muted leading-relaxed mb-6">
            Facilitamos tu proceso administrativo para que enfoques tu energía
            enteramente en la rehabilitación física. Consulta por factura médica
            si necesitas presentarla a tu seguro de salud.
          </p>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 bg-white border border-border-subtle rounded-2xl flex flex-col items-center gap-2 text-center shadow-sm">
              <Banknote className="w-6 h-6 text-primary-strong" aria-hidden="true" />
              <span className="font-sans text-xs font-semibold text-text-dark">Efectivo</span>
            </div>
            <div className="p-4 bg-white border border-border-subtle rounded-2xl flex flex-col items-center gap-2 text-center shadow-sm">
              <Landmark className="w-6 h-6 text-primary-strong" aria-hidden="true" />
              <span className="font-sans text-xs font-semibold text-text-dark">Transferencia</span>
            </div>
            <div className="p-4 bg-white border border-border-subtle rounded-2xl flex flex-col items-center gap-2 text-center shadow-sm">
              <CreditCard className="w-6 h-6 text-primary-strong" aria-hidden="true" />
              <span className="font-sans text-xs font-semibold text-text-dark">Tarjeta</span>
            </div>
          </div>
        </div>

        {/* Live Support Box */}
        <div className="bg-primary-deep p-8 sm:p-10 rounded-[2rem] text-white shadow-lg space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-accent/20 rounded-full blur-3xl -mr-16 -mt-16" aria-hidden="true"></div>

          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white font-sans text-xs font-bold uppercase tracking-wider">
              En Santo Domingo
            </div>
            <h2 className="font-serif text-2xl font-bold tracking-tight">¿Tienes dudas sobre los planes?</h2>
            <p className="font-sans text-sm text-white/90 leading-relaxed">
              Consulta directamente con nuestro equipo. Te asesoraremos sin
              compromiso sobre qué servicio y cuántas sesiones son recomendables
              para tu caso.
            </p>

            <form onSubmit={handleSendQuestion} className="space-y-3 pt-2">
              <div className="flex gap-2">
                <label htmlFor="plan_phone" className="sr-only">
                  Teléfono de contacto
                </label>
                <input
                  id="plan_phone"
                  name="telefono"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  spellCheck={false}
                  required
                  placeholder="Ej. +1 809 000 0000…"
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  className="flex-1 bg-white/15 border border-white/25 rounded-lg px-4 py-2 text-sm text-white placeholder-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                />
                <button
                  type="submit"
                  className="bg-accent text-lead hover:bg-accent-strong text-sm font-sans font-bold px-4 py-2 rounded-lg cursor-pointer transition-colors flex items-center gap-1 shrink-0"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  Llamadme
                </button>
              </div>
              <AnimatePresence>
                {showStatus && (
                  <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="status"
                    aria-live="polite"
                    className="p-3 bg-accent-soft text-accent-text border border-accent/40 rounded-lg text-xs leading-relaxed"
                  >
                    ¡Solicitud enviada! Te contactaremos en un plazo máximo de 30 minutos.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
