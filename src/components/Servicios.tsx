import { useState, FormEvent } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, User, Check, Flame, Accessibility, Dumbbell, ShieldAlert, Sparkle, CircleCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Tab } from '../types';

interface ServiciosProps {
  onChangeTab: (tab: Tab) => void;
  onSelectServiceAndPlan?: (serviceId: string, planDiscount: number) => void;
}

export default function Servicios({ onChangeTab, onSelectServiceAndPlan }: ServiciosProps) {
  // Symptom checker state
  const [painArea, setPainArea] = useState('');
  const [duration, setDuration] = useState('');
  const [result, setResult] = useState<null | {
    therapyName: string;
    description: string;
    frequency: string;
    serviceId: string;
    advice: string;
  }>(null);

  const services = [
    {
      id: 'trauma',
      title: 'Fisioterapia Traumatológica & Ortopédica',
      price: 60,
      duration: '55 mins',
      desc: 'Rehabilitación y alivio eficaz para patologías del aparato locomotor, dolores de columna y articulaciones.',
      features: ['Esguinces, tendinitis y luxaciones', 'Dolor de espalda crónico (Lumbago, ciática)', 'Fisioterapia y masajes post-fracturas', 'Tratamiento post-operatorio inmediato'],
      target: 'Pacientes de cualquier edad con dolores musculares, articulares o recuperaciones post-quirúrgicas.',
      bgGradient: 'from-blue-500/10 to-blue-600/5',
      accentColor: 'text-primary'
    },
    {
      id: 'deporte',
      title: 'Fisioterapia Deportiva',
      price: 65,
      duration: '50 mins',
      desc: 'Prevención de lesiones y readaptación física avanzada para atletas amateurs, profesionales y corredores de montaña.',
      features: ['Roturas de fibras y distensiones', 'Descarga muscular post-entrenamiento', 'Kinesiotaping y vendajes funcionales', 'Optimización del gesto técnico deportivo'],
      target: 'Deportistas que buscan acortar plazos de recuperación y prevenir recaídas de forma segura.',
      bgGradient: 'from-emerald-500/10 to-emerald-600/5',
      accentColor: 'text-emerald-700'
    },
    {
      id: 'geriatrica',
      title: 'Fisioterapia Geriátrica & Tercera Edad',
      price: 55,
      duration: '60 mins',
      desc: 'Mantenimiento preventivo, potenciación muscular cuidadosa y mejora de la marcha para mayores de 65 años.',
      features: ['Re-entrenamiento del equilibrio y balance', 'Prevención activa de caídas domésticas', 'Alivio del dolor por artrosis o artritis', 'Preservación de la movilidad autónoma'],
      target: 'Personas mayores que deseen conservar su independencia motora e higiene de columna sin salir de su casa.',
      bgGradient: 'from-amber-500/10 to-amber-600/5',
      accentColor: 'text-amber-700'
    },
    {
      id: 'neuro',
      title: 'Fisioterapia Neurológica especializada',
      price: 70,
      duration: '60 mins',
      desc: 'Estimulación neuromuscular especializada para pacientes con afecciones del sistema nervioso central o periférico.',
      features: ['Secuelas de Ictus (Accidente Cerebrovascular)', 'Esclerosis Múltiple y ELA', 'Facilitación neuromuscular propioceptiva', 'Ejercicios de coordinación motora fina'],
      target: 'Personas en fase de rehabilitación neurológica que precisan sesiones adaptadas de alta paciencia y rigor técnico.',
      bgGradient: 'from-purple-500/10 to-purple-600/5',
      accentColor: 'text-purple-700'
    }
  ];

  const handleBookService = (serviceId: string) => {
    if (onSelectServiceAndPlan) {
      onSelectServiceAndPlan(serviceId, 0); // standard price setup
    }
    onChangeTab('agendar');
  };

  const calculateRecommendation = (e: FormEvent) => {
    e.preventDefault();
    if (!painArea || !duration) return;

    let therapyName = '';
    let description = '';
    let frequency = '';
    let serviceId = '';
    let advice = '';

    if (painArea === 'deporte') {
      therapyName = 'Fisioterapia Deportiva';
      serviceId = 'deporte';
      description = 'Tu perfil encaja en la readaptación para deportistas. El objetivo es tratar la inflamación y equilibrar cargas musculares.';
      frequency = '1-2 sesiones semanales por un periodo corto de descarga.';
      advice = 'Aplica hielo localizado durante 15 minutos tras entrenamientos suaves y descansa la articulación hasta la visita.';
    } else if (painArea === 'mayor') {
      therapyName = 'Fisioterapia Geriátrica';
      serviceId = 'geriatrica';
      description = 'Recomendamos un plan de movilizaciones suaves y fortalecemiento de extremidades inferiores para recuperar la solidez de paso.';
      frequency = '2 sesiones cortas de 60 minutos por semana para mejores resultados.';
      advice = 'Mantén pasillos libres de alfombras sueltas y camina apoyadamente siempre que sea posible.';
    } else if (painArea === 'neuro') {
      therapyName = 'Neurorehabilitación';
      serviceId = 'neuro';
      description = 'Se necesita un abordaje neurológico específico para potenciar la plasticidad cerebral y el rango de movimiento articular.';
      frequency = '2 a 3 sesiones semanales en fases agudas sub-agudas.';
      advice = 'Realiza ejercicios pasivos sugeridos por el especialista y mantén un registro de picos de rigidez muscular.';
    } else {
      therapyName = 'Fisioterapia Traumatológica';
      serviceId = 'trauma';
      description = 'Ideal para dolores de espalda comunes, contracturas musculares por teletrabajo o recuperaciones post-fracturas.';
      frequency = '1 sesión semanal en las primeras 2 semanas para valoración y descarga de zona.';
      advice = 'Evita el reposo absoluto en cama. Camina tramos cortos y aplica calor local seco de 15 a 20 minutos.';
    }

    setResult({
      therapyName,
      description,
      frequency,
      serviceId,
      advice
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="space-y-16"
    >
      {/* Intro Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="bg-primary/5 text-primary border border-primary/15 font-sans text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
          Fisioterapia de precisión en tu hogar
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
          Especialidades Clínicas Domiciliarias
        </h2>
        <p className="font-sans text-sm sm:text-base text-text-muted leading-relaxed">
          Evita desplazamientos incómodos con dolores agudos. Llevamos camilla profesional hidráulica y todo el equipamiento higienizado a tu domicilio en Teruel para realizar un tratamiento premium idéntico al de una consulta fija.
        </p>
      </section>

      {/* Services Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((svc) => (
          <div
            key={svc.id}
            className={`bg-white p-6 sm:p-8 rounded-2xl border border-border-subtle hover:border-primary/30 transition-all flex flex-col justify-between hover:shadow-lg relative overflow-hidden group`}
          >
            {/* Subtle background card tint */}
            <div className={`absolute inset-0 bg-gradient-to-br ${svc.bgGradient} opacity-30 -z-10`} />

            <div className="space-y-6">
              <div className="flex justify-between items-start gap-4">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-text-dark group-hover:text-primary transition-colors leading-tight">
                  {svc.title}
                </h3>
                <div className="text-right shrink-0">
                  <span className="font-serif text-2xl font-extrabold text-primary block leading-none">
                    {svc.price}€
                  </span>
                  <span className="font-sans text-[11px] text-text-muted mt-1 inline-block">
                    {svc.duration} / sesión
                  </span>
                </div>
              </div>

              <p className="font-sans text-sm text-text-muted leading-relaxed">
                {svc.desc}
              </p>

              <div className="space-y-2.5">
                <p className="font-sans text-xs font-bold text-text-dark">¿Qué incluye el tratamiento clínico?</p>
                <ul className="space-y-2">
                  {svc.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-xs sm:text-sm text-text-muted leading-relaxed">
                      <span className={`w-4 h-4 rounded-full bg-white flex items-center justify-center border border-border-subtle shrink-0 mt-0.5`}>
                        <Check className="w-3 h-3 text-primary" />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <div className="p-3 bg-white/70 border border-border-subtle/40 rounded-xl flex items-center gap-2">
                  <User className="w-4 h-4 text-text-muted" />
                  <span className="font-sans text-[11px] sm:text-xs text-text-muted italic">
                    <strong className="text-text-dark font-semibold">Perfil diana:</strong> {svc.target}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border-subtle/50 mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleBookService(svc.id)}
                className="flex-1 bg-primary text-white hover:bg-primary-container font-sans font-bold text-xs sm:text-sm py-3 rounded-lg text-center cursor-pointer transition-colors"
              >
                Agendar este Servicio
              </button>
              <button
                onClick={() => handleBookService(svc.id)}
                className="border border-border-subtle hover:bg-bg-base font-sans font-semibold text-xs text-text-dark py-3 px-4 rounded-lg transition-colors cursor-pointer"
              >
                Consultar tarifas bonificadas
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Symptom Checker System */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-border-subtle soft-shadow grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-1 bg-accent-light text-accent rounded-lg px-2.5 py-1 text-xs font-bold">
            <Sparkle className="w-3 h-3 text-accent-warm" />
            <span>Asistente de Prescripción</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-primary leading-tight">
            ¿No sabes qué especialidad necesitas?
          </h3>
          <p className="font-sans text-xs sm:text-sm text-text-muted leading-relaxed">
            Completa nuestro checklist simplificado diseñado por médicos para recibir una recomendación de terapia domiciliaria ajustada a tus síntomas específicos y pautas preventivas inmediatas.
          </p>
          <div className="p-4 bg-bg-base rounded-xl border border-border-subtle/50 text-[10px] sm:text-xs text-text-muted flex gap-2">
            <ShieldAlert className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>Este cuestionario es meramente orientativo. Nuestros fisioterapeutas colegiados realizarán un examen clínico completo presencial al inicio de la primera sesión.</span>
          </div>
        </div>

        <div className="lg:col-span-7">
          <form onSubmit={calculateRecommendation} className="bg-bg-base/50 p-6 rounded-2xl border border-border-subtle space-y-5">
            {/* Input Pain Area */}
            <div className="space-y-2">
              <label className="font-sans text-xs sm:text-sm font-bold text-text-dark block">
                1. ¿Cuál es el principal síntoma o molestia física?
              </label>
              <select
                required
                value={painArea}
                onChange={(e) => setPainArea(e.target.value)}
                className="w-full bg-white border border-border-subtle rounded-xl px-4 py-3 text-xs sm:text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="">-- Elige una opción --</option>
                <option value="trauma">Dolor constante de espalda (lumbago, ciática o cuello rígido)</option>
                <option value="articular">Articulaciones inflamadas, esguince o rehabilitación de cirugía</option>
                <option value="deporte">Sobrecarga por ejercicio, calambres o rotura muscular</option>
                <option value="mayor">Pérdida de equilibrio, rigidez o debilidad muscular en persona mayor</option>
                <option value="neuro">Rehabilitación neurológica post-ictus, Parkinson o lesión motora</option>
              </select>
            </div>

            {/* Input Duration */}
            <div className="space-y-2">
              <label className="font-sans text-xs sm:text-sm font-bold text-text-dark block">
                2. ¿Cuánto tiempo llevas experimentando el dolor?
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'agudo', valLabel: 'Menos de 1 semana' },
                  { value: 'subagudo', valLabel: 'En torno a 2-4 semanas' },
                  { value: 'cronico', valLabel: 'Más de un mes (Dolor recurrente)' }
                ].map((dur) => (
                  <button
                    key={dur.value}
                    type="button"
                    onClick={() => setDuration(dur.value)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer font-sans text-[11px] font-semibold flex items-center justify-center leading-tight ${
                      duration === dur.value
                        ? 'border-primary bg-primary text-white shadow-md'
                        : 'border-border-subtle bg-white hover:bg-border-subtle/20 text-text-muted'
                    }`}
                  >
                    {dur.valLabel}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={!painArea || !duration}
              className={`w-full py-3 rounded-xl font-sans font-bold text-sm text-center shadow-md transition-all cursor-pointer ${
                painArea && duration
                  ? 'bg-primary text-white hover:bg-primary-container'
                  : 'bg-border-subtle text-text-muted cursor-not-allowed opacity-50'
              }`}
            >
              Consultar Recomendación Clínica Domiciliaria
            </button>
          </form>

          {/* Suggested Result Block */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-6 bg-accent-light/40 border border-accent/25 rounded-2xl space-y-4 shadow-sm"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <span className="font-sans text-[10px] font-bold text-accent uppercase tracking-wider block">
                      Resultado Recomendado:
                    </span>
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-primary flex items-center gap-1.5 leading-none">
                      <CircleCheck className="w-5 h-5 text-accent-warm" />
                      {result.therapyName}
                    </h4>
                  </div>
                  <button
                    onClick={() => handleBookService(result.serviceId)}
                    className="bg-primary hover:bg-primary-container text-white font-sans font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1 transition-all"
                  >
                    Reservar esto
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                
                <div className="space-y-2 font-sans text-xs sm:text-sm text-text-muted leading-relaxed">
                  <p>{result.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="bg-white p-3 rounded-xl border border-border-subtle/50">
                      <p className="font-semibold text-text-dark">Frecuencia estimada:</p>
                      <p className="text-xs text-text-muted mt-0.5">{result.frequency}</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-border-subtle/50">
                      <p className="font-semibold text-text-dark">Consejo preventivo inmediato:</p>
                      <p className="text-xs text-text-muted mt-0.5 leading-normal">{result.advice}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </motion.div>
  );
}
