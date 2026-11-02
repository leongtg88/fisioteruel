import { useState, FormEvent } from 'react';
import { Calendar, Check, HelpCircle, Info, Calculator, CreditCard, Landmark, Banknote, ShieldAlert, Sparkles, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Tab } from '../types';
import { formatPrice } from '@/lib/format';
import { THERAPY_PRICE_DOP } from '@/lib/prices';

interface PlanesProps {
  onChangeTab: (tab: Tab) => void;
  onSelectServiceAndPlan?: (serviceId: string, planDiscount: number) => void;
}

export default function Planes({ onChangeTab, onSelectServiceAndPlan }: PlanesProps) {
  // Calculator state
  const [selectedTherapy, setSelectedTherapy] = useState('trauma');
  const [sessionCount, setSessionCount] = useState(4);
  const [selectedPlanTier, setSelectedPlanTier] = useState('quincenal');
  
  // Simulated support expert state
  const [questionText, setQuestionText] = useState('');
  const [showStatus, setShowStatus] = useState(false);

  // Therapy prices
  const therapies = {
    trauma: { name: 'Traumatológica / Lesiones', price: THERAPY_PRICE_DOP.trauma, desc: 'Esguinces, fracturas, dolores musculares y post-operatorios.' },
    deporte: { name: 'Fisioterapia Deportiva', price: THERAPY_PRICE_DOP.deporte, desc: 'Rendimiento, sobrecargas musculares, vendaje funcional.' },
    neuro: { name: 'Neurorehabilitación', price: THERAPY_PRICE_DOP.neuro, desc: 'Ictus, Parkinson, Esclerosis. Ejercicios de control motor.' },
    geriatrica: { name: 'Fisioterapia Geriátrica', price: THERAPY_PRICE_DOP.geriatrica, desc: 'Movilidad en mayores, prevención de caídas y equilibrio.' }
  } as const;

  // Plan discounts
  const planTiers = {
    individual: { name: 'Tarifa Estándar', discount: 0, desc: 'Atención esporádica.' },
    semanal: { name: 'Plan Semanal', discount: 5, desc: '5% de descuento.' },
    quincenal: { name: 'Plan Quincenal', discount: 10, desc: '10% de descuento.' },
    mensual: { name: 'Plan Mensual', discount: 15, desc: '15% de descuento.' }
  } as const;

  // Calculatings
  const baseSessionPrice = therapies[selectedTherapy as keyof typeof therapies].price;
  const rawTotal = baseSessionPrice * sessionCount;
  const discountPct = planTiers[selectedPlanTier as keyof typeof planTiers].discount;
  const discountAmount = rawTotal * (discountPct / 100);
  const finalPrice = rawTotal - discountAmount;

  const handleApplyQuote = () => {
    if (onSelectServiceAndPlan) {
      onSelectServiceAndPlan(selectedTherapy, discountPct);
    }
    onChangeTab('agendar');
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
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="space-y-16"
    >
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden rounded-3xl pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block bg-secondary-container/30 text-primary font-sans text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
              Bienestar y flexibilidad a tu alcance
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-primary tracking-tight leading-tight">
              Paga con flexibilidad y ahorra.
            </h1>
            <p className="font-sans text-base sm:text-lg text-text-muted leading-relaxed max-w-xl">
              En <strong className="text-text-dark font-semibold">Fisioteruel</strong>, entendemos que la constancia es la clave absoluta para una rehabilitación eficaz. Hemos diseñado planes de ahorro acumulativo que reducen el coste por sesión según tus necesidades y tu presupuesto.
            </p>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-square shadow-xl relative border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1519824145371-296894a0daa9?auto=format&fit=crop&w=800&q=80"
                alt="Paciente recibiendo estiramientos terapéuticos a domicilio"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Visual glow element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent-light rounded-full opacity-55 blur-2xl -z-10"></div>
          </div>
        </div>
      </section>

      {/* Plans Columns */}
      <section className="space-y-10">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary">Planes de Fisioterapia</h2>
          <p className="font-sans text-sm sm:text-base text-text-muted">
            Inversión inteligente en tu salud. Sin contratos forzosos: paga lo que usas y obtén un descuento automático.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Plan Semanal */}
          <div className="bg-white p-8 rounded-2xl flex flex-col justify-between soft-shadow border border-border-subtle relative group hover:shadow-xl transition-all duration-300">
            <div>
              <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-6">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-primary mb-1">Semanal</h3>
              <div className="text-accent font-sans font-extrabold text-3xl mb-4">5% DESC.</div>
              <p className="font-sans text-sm text-text-muted mb-6 leading-relaxed">
                Ideal para cuadros de dolor agudo, contracturas fuertes o espasmos que requieren atención consecutiva continuada.
              </p>
              <ul className="space-y-3.5 mb-8 text-xs sm:text-sm text-text-muted">
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-secondary-container/30 text-primary flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>2 - 3 sesiones en la semana</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-secondary-container/30 text-primary flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>Evaluación diagnóstica inicial</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-secondary-container/30 text-primary flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>Seguimiento y apoyo vía WhatsApp</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => {
                setSelectedPlanTier('semanal');
                onChangeTab('agendar');
              }}
              className="w-full py-3 bg-primary border border-transparent text-white font-sans font-bold text-sm rounded-xl hover:bg-primary-container cursor-pointer transition-colors"
            >
              Elegir Plan Semanal
            </button>
          </div>

          {/* Plan Quincenal - DESTACADO */}
          <div className="bg-white p-8 rounded-2xl flex flex-col justify-between shadow-lg hover:shadow-xl border-2 border-primary relative group transition-all duration-300">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent-warm text-text-dark px-4 py-1 rounded-full text-xs font-bold font-sans tracking-wide shadow-sm flex items-center gap-1.5 uppercase">
              <Sparkles className="w-3 h-3 text-text-dark" />
              Más Popular
            </div>
            <div>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-primary mb-1">Quincenal</h3>
              <div className="text-accent font-sans font-extrabold text-3xl mb-4">10% DESC.</div>
              <p className="font-sans text-sm text-text-muted mb-6 leading-relaxed">
                Perfecto para procesos sostenidos de rehabilitación post-fractura, accidentes de tráfico o readaptación articular activa.
              </p>
              <ul className="space-y-3.5 mb-8 text-xs sm:text-sm text-text-muted">
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-accent-light text-accent-warm flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-accent" />
                  </span>
                  <span>4 - 6 sesiones por quincena</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-accent-light text-accent-warm flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-accent" />
                  </span>
                  <span>Pauta personalizada de ejercicios caseros</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-accent-light text-accent-warm flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-accent" />
                  </span>
                  <span>Soporte de consulta prioritario colegiado</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => {
                setSelectedPlanTier('quincenal');
                onChangeTab('agendar');
              }}
              className="w-full py-3 bg-accent-warm text-text-dark font-sans font-bold text-sm rounded-xl hover:bg-accent cursor-pointer shadow-md transition-colors"
            >
              Elegir Plan Quincenal
            </button>
          </div>

          {/* Plan Mensual */}
          <div className="bg-white p-8 rounded-2xl flex flex-col justify-between soft-shadow border border-border-subtle relative group hover:shadow-xl transition-all duration-300">
            <div>
              <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-6">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-primary mb-1">Mensual</h3>
              <div className="text-accent font-sans font-extrabold text-3xl mb-4">15% DESC.</div>
              <p className="font-sans text-sm text-text-muted mb-6 leading-relaxed">
                Máximo ahorro estructurado para patologías crónicas (lumbalgias repetitivas), geriatría preventiva y mantenimiento del bienestar a largo plazo.
              </p>
              <ul className="space-y-3.5 mb-8 text-xs sm:text-sm text-text-muted">
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-secondary-container/30 text-primary flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>8+ sesiones al mes</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-secondary-container/30 text-primary flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>Informe escrito de evolución evolutiva</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-secondary-container/30 text-primary flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>Horarios recurrentes fijos reservados</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => {
                setSelectedPlanTier('mensual');
                onChangeTab('agendar');
              }}
              className="w-full py-3 bg-primary border border-transparent text-white font-sans font-bold text-sm rounded-xl hover:bg-primary-container cursor-pointer transition-colors"
            >
              Elegir Plan Mensual
            </button>
          </div>
        </div>

        {/* Note Box */}
        <div className="p-5 bg-bg-base border-l-4 border-accent-warm rounded-r-xl max-w-3xl mx-auto flex gap-4 items-start border border-border-subtle/50 shadow-sm">
          <Info className="w-5 h-5 text-accent-warm shrink-0 mt-0.5" />
          <p className="font-sans text-xs sm:text-sm text-text-muted italic leading-relaxed">
            <strong className="text-text-dark font-semibold">Nota clínica:</strong> Los descuentos de los bonos/planes se aplican enteramente sobre el precio estándar de la sesión individual del servicio seleccionado. No acumulable a otras promociones simultáneas. Todos los materiales sanitarios están incluidos de serie.
          </p>
        </div>
      </section>

      {/* Interactive Pricing Simulator */}
      <section className="bg-bg-base/70 rounded-3xl p-6 sm:p-10 border border-border-subtle soft-shadow space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-2xl font-bold text-primary">Simulador de Tarifas Interactivo</h3>
            <p className="font-sans text-xs sm:text-sm text-text-muted mt-0.5">Calcula al instante tu presupuesto con el descuento del plan aplicado.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Controls Panel */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Therapy selection */}
            <div className="space-y-2.5">
              <label className="font-sans text-sm font-bold text-text-dark block">
                1. Selecciona la especialidad de fisioterapia:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(therapies).map(([key, item]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedTherapy(key)}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedTherapy === key
                        ? 'border-primary bg-white shadow-md ring-2 ring-primary/10'
                        : 'border-border-subtle bg-white/70 hover:border-primary-container'
                    }`}
                  >
                    <span className="font-sans text-xs font-bold text-primary block">{item.name}</span>
                    <span className="font-serif text-sm font-semibold text-text-dark inline-block mt-1">{formatPrice(item.price)} / sesión</span>
                    <span className="font-sans text-[11px] text-text-muted block mt-1 leading-tight">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Session range */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <label className="font-sans text-sm font-bold text-text-dark block">
                  2. Número de sesiones sugeridas o requeridas:
                </label>
                <span className="bg-primary/10 text-primary font-sans font-extrabold px-3 py-1 rounded-lg text-sm">
                  {sessionCount} {sessionCount === 1 ? 'Sesión' : 'Sesiones'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                value={sessionCount}
                onChange={(e) => setSessionCount(parseInt(e.target.value))}
                className="w-full h-2 bg-border-subtle rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
              />
              <div className="flex justify-between text-[11px] text-text-muted font-sans font-medium px-1">
                <span>1 Sesión (Consulta única)</span>
                <span>5 Sesiones</span>
                <span>10 Sesiones</span>
                <span>15 Sesiones (Mantenimiento)</span>
              </div>
            </div>

            {/* Step 3: Bundle tier selection */}
            <div className="space-y-2.5">
              <label className="font-sans text-sm font-bold text-text-dark block">
                3. Elige tu modalidad de ahorro:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.entries(planTiers).map(([key, tier]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedPlanTier(key)}
                    className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                      selectedPlanTier === key
                        ? 'border-primary bg-primary text-white shadow'
                        : 'border-border-subtle bg-white hover:bg-bg-base text-text-muted'
                    }`}
                  >
                    <span className="font-sans text-xs font-bold block">{tier.name}</span>
                    <span className={`${selectedPlanTier === key ? 'text-accent-warm' : 'text-primary'} font-serif text-sm font-bold block mt-1`}>
                      {tier.discount === 0 ? 'Sin desc.' : `-${tier.discount}%`}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing Result Card */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-border-subtle shadow-md space-y-6 relative flex flex-col justify-between h-full">
              {discountPct > 0 && (
                <div className="absolute top-4 right-4 bg-accent-light text-accent font-sans text-[11px] font-bold px-2.5 py-1 rounded-md animate-bounce">
                  ¡Ahorras {discountPct}%!
                </div>
              )}
              
              <div className="space-y-4">
                <span className="font-sans text-xs font-bold tracking-wider text-text-muted uppercase block">
                  Resumen de tu Estimación
                </span>
                
                <div className="border-b border-border-subtle pb-4 space-y-2">
                  <div className="flex justify-between font-sans text-sm text-text-muted">
                    <span>Especialidad escogida:</span>
                    <span className="font-semibold text-text-dark text-right">
                      {therapies[selectedTherapy as keyof typeof therapies].name}
                    </span>
                  </div>
                  <div className="flex justify-between font-sans text-sm text-text-muted">
                    <span>Sesiones:</span>
                    <span className="font-semibold text-text-dark">{sessionCount}</span>
                  </div>
                  <div className="flex justify-between font-sans text-sm text-text-muted">
                    <span>Precio por sesión base:</span>
                    <span className="font-semibold text-text-dark">{formatPrice(baseSessionPrice)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between font-sans text-sm text-text-muted">
                    <span>Total sin descuento:</span>
                    <span className="line-through text-text-muted">{formatPrice(rawTotal)}</span>
                  </div>
                  
                  {discountPct > 0 && (
                    <div className="flex justify-between font-sans text-sm text-accent">
                      <span>Descuento ({discountPct}%):</span>
                      <span className="font-bold">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-baseline pt-2">
                    <span className="font-sans text-base font-bold text-text-dark">Total aproximado:</span>
                    <span className="font-serif text-3xl sm:text-4xl font-extrabold text-primary">
                      {formatPrice(finalPrice)}
                    </span>
                  </div>
                  <p className="font-sans text-[11px] text-text-muted text-right italic">
                    ~ {formatPrice(finalPrice / sessionCount)} la sesión en tu domicilio
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleApplyQuote}
                  className="w-full py-4 bg-primary hover:bg-primary-container text-white font-sans font-bold text-sm sm:text-base rounded-xl cursor-pointer transition-colors shadow-md flex items-center justify-center gap-2 border border-transparent"
                >
                  <Calculator className="w-4 h-4 text-accent-warm" />
                  Reservar con esta Tarifa Estimada
                </button>
                <span className="font-sans text-[10px] text-text-muted text-center block mt-2">
                  *Nuestros fisios confirmarán la prescripción en la sesión de valoración.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment methods list */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-primary mb-4">
            Múltiples formas de pago para tu máxima comodidad.
          </h3>
          <p className="font-sans text-sm sm:text-base text-text-muted leading-relaxed mb-6">
            Facilitamos tu proceso administrativo para que enfoques tu energía enteramente en la rehabilitación física. Emitimos factura médica para tu reembolso si cuentas con un seguro de salud con cobertura de libre elección.
          </p>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 bg-white border border-border-subtle rounded-xl flex flex-col items-center gap-2 text-center soft-shadow">
              <Banknote className="w-6 h-6 text-primary" />
              <span className="font-sans text-xs font-semibold text-text-dark">Efectivo</span>
            </div>
            <div className="p-4 bg-white border border-border-subtle rounded-xl flex flex-col items-center gap-2 text-center soft-shadow">
              <Landmark className="w-6 h-6 text-primary" />
              <span className="font-sans text-xs font-semibold text-text-dark">Transferencia</span>
            </div>
            <div className="p-4 bg-white border border-border-subtle rounded-xl flex flex-col items-center gap-2 text-center soft-shadow">
              <CreditCard className="w-6 h-6 text-primary" />
              <span className="font-sans text-xs font-semibold text-text-dark">Datáfono / Tarjeta</span>
            </div>
          </div>
        </div>

        {/* Live Support Box */}
        <div className="bg-primary p-8 sm:p-10 rounded-2xl text-white soft-shadow space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
          
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white font-sans text-[11px] font-bold uppercase tracking-wider">
              En Teruel Capital
            </div>
            <h4 className="font-serif text-2xl font-bold tracking-tight">¿Tienes dudas sobre los bonos?</h4>
            <p className="font-sans text-sm text-white/85 leading-relaxed">
              Consulta directamente a nuestro equipo médico. Te asesoraremos sin compromiso sobre qué terapia y cuántas sesiones son recomendables para tu lesión.
            </p>
            
            <form onSubmit={handleSendQuestion} className="space-y-3 pt-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="Escribe tu número de teléfono..."
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40"
                />
                <button
                  type="submit"
                  className="bg-white text-primary hover:bg-bg-base text-sm font-sans font-bold px-4 py-2 rounded-lg cursor-pointer transition-colors flex items-center gap-1 shrink-0"
                >
                  <Send className="w-4 h-4" />
                  Llamadme
                </button>
              </div>
              <AnimatePresence>
                {showStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3 bg-accent-light/10 text-accent-light border border-white/10 rounded-lg text-xs leading-relaxed"
                  >
                    🚀 ¡Solicitud enviada! Un fisioterapeuta colegiado te contactará en un plazo máximo de 30 minutos.
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
