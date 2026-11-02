import { useState, FormEvent } from 'react';
import { ArrowRight, Check, ShieldAlert, Sparkle, CircleCheck } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Tab } from '../types';
import { formatPrice } from '@/lib/format';
import { SERVICES_DATA } from '@/lib/data';

interface ServiciosProps {
  onChangeTab: (tab: Tab) => void;
  onSelectServiceAndPlan?: (serviceId: string, planDiscount: number) => void;
}

const FISIO_SERVICES = SERVICES_DATA.filter(
  (service) => service.category === 'fisioterapia'
);

export default function Servicios({ onChangeTab, onSelectServiceAndPlan }: ServiciosProps) {
  const shouldReduceMotion = useReducedMotion();
  // Symptom checker state
  const [need, setNeed] = useState('');
  const [duration, setDuration] = useState('');
  const [formError, setFormError] = useState('');
  const [result, setResult] = useState<null | {
    therapyName: string;
    description: string;
    frequency: string;
    serviceId: string;
    advice: string;
  }>(null);

  const handleBookService = (serviceId: string) => {
    if (onSelectServiceAndPlan) {
      onSelectServiceAndPlan(serviceId, 0); // standard price setup
    } else {
      onChangeTab('agendar');
    }
  };

  const calculateRecommendation = (e: FormEvent) => {
    e.preventDefault();
    if (!need || !duration) {
      setFormError('Selecciona lo que necesitas y el tiempo de evolución…');
      return;
    }
    setFormError('');

    let therapyName = '';
    let description = '';
    let frequency = '';
    let serviceId = '';
    let advice = '';

    if (need === 'dolor') {
      therapyName = 'Evaluación de fisioterapia';
      serviceId = 'eval-fisio';
      description =
        'Lo más recomendable es empezar con una evaluación inicial: valoramos tu caso, tu movilidad y el origen del dolor antes de tratar.';
      frequency =
        'Una primera sesión de valoración; después el fisioterapeuta definirá la frecuencia del tratamiento.';
      advice =
        'Evita forzar la zona y aplica calor local suave durante 15–20 minutos si no hay inflamación aguda.';
    } else if (need === 'seguimiento') {
      therapyName = 'Sesión de fisioterapia';
      serviceId = 'sesion-fisio';
      description =
        'Ya tienes un diagnóstico o un plan en marcha: continuamos con rehabilitación, fortalecimiento y alivio del dolor.';
      frequency =
        'La frecuencia la marca tu fisioterapeuta según tu progreso y tu adherencia al tratamiento.';
      advice =
        'Trae tu informe o indicaciones previas y coméntanos qué ejercicios estás haciendo en casa.';
    } else if (need === 'tension') {
      therapyName = 'Masaje relajante';
      serviceId = 'masaje-relajante';
      description =
        'Tu perfil encaja con un masaje relajante para bajar el estrés, soltar contracturas y recuperar la calma.';
      frequency =
        '1 sesión semanal o cada 15 días, según el nivel de tensión acumulada.';
      advice =
        'Intenta dormir bien y hacer pausas activas de 5 minutos cada hora si trabajas sentado/a.';
    } else if (need === 'espalda') {
      therapyName = 'Descarga de espalda';
      serviceId = 'descarga-espalda';
      description =
        'La descarga de espalda está enfocada en aliviar la tensión cervical y lumbar, ideal si pasas muchas horas sentado/a.';
      frequency =
        '1 sesión semanal durante las primeras 2–3 semanas para notar el cambio.';
      advice =
        'Ajusta la altura de la pantalla y usa una silla con apoyo lumbar mientras trabajas.';
    } else if (need === 'piernas') {
      therapyName = 'Descarga de piernas';
      serviceId = 'descarga-piernas';
      description =
        'La descarga de piernas estimula la circulación y aligera la sensación de pesadez y cansancio.';
      frequency =
        '1 sesión semanal o cada 15 días, especialmente si pasas mucho tiempo de pie.';
      advice =
        'Eleva las piernas al final del día y camina tramos cortos para activar el retorno circulatorio.';
    } else {
      therapyName = 'Liberación de cuello';
      serviceId = 'liberacion-cuello';
      description =
        'La liberación de cuello reduce la rigidez cervical y mejora la movilidad con una técnica precisa y efectiva.';
      frequency =
        '1 sesión semanal durante 2–3 semanas, según la evolución de la rigidez.';
      advice =
        'Evita mantener la cabeza inclinada hacia el móvil y estira el cuello suavemente varias veces al día.';
    }

    if (duration === 'cronico') {
      frequency += ' Al ser una molestia recurrente, conviene revisar el plan cada mes.';
    } else if (duration === 'agudo') {
      advice += ' Si el dolor es intenso o apareció de golpe, consulta antes de recibir masaje profundo.';
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
      initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
      className="max-w-[1280px] mx-auto px-6 pt-20 space-y-16"
    >
      {/* Intro Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="bg-primary-soft text-primary-deep border border-primary/20 font-sans text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
          Fisioterapia y bienestar en tu hogar
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-text-dark">
          Fisioterapia a domicilio en Santo Domingo
        </h1>
        <p className="font-sans text-base text-lead-muted leading-relaxed font-semibold max-w-2xl mx-auto">
          Recupera tu movilidad, alivia el dolor y mejora tu calidad de vida con
          un servicio personalizado en la comodidad de tu casa. Empezamos con una
          evaluación y diseñamos tu plan de tratamiento.
        </p>
      </section>

      {/* Services Cards Grid */}
      <section
        id="fisioterapia"
        className="grid grid-cols-1 md:grid-cols-2 gap-8 scroll-mt-24"
      >
        {FISIO_SERVICES.map((svc) => (
          <div
            key={svc.id}
            className="glass-card p-8 flex flex-col justify-between relative overflow-hidden group hover:bg-white hover:shadow-lg transition-[background-color,box-shadow] duration-300"
          >
            <div className="space-y-6">
              <div className="flex justify-between items-start gap-4">
                <div className="w-14 h-14 shrink-0 bg-primary-soft rounded-2xl flex items-center justify-center text-primary-strong group-hover:bg-primary-strong group-hover:text-white transition-colors duration-300">
                  <span
                    className="material-symbols-outlined text-3xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                    aria-hidden="true"
                  >
                    {svc.icon}
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-serif text-2xl font-extrabold text-primary-strong block leading-none tabular">
                    {formatPrice(svc.price)}
                  </span>
                  <span className="font-sans text-xs text-lead-muted mt-1 inline-block tabular font-semibold">
                    {svc.duration} min / sesión
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-text-dark leading-tight">
                    {svc.name}
                  </h2>
                  {svc.badge && (
                    <span className="bg-accent-soft text-accent-text border border-accent/50 font-sans text-xs font-bold px-2.5 py-1 rounded-full">
                      {svc.badge}
                    </span>
                  )}
                </div>
                <p className="font-sans text-sm text-lead-muted leading-relaxed font-semibold">
                  {svc.description}
                </p>
              </div>

              <div className="space-y-2.5">
                <p className="font-sans text-xs font-bold text-text-dark">¿Qué incluye?</p>
                <ul className="space-y-2">
                  {svc.details?.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-xs sm:text-sm text-lead-muted leading-relaxed">
                      <span className="w-4 h-4 rounded-full bg-white flex items-center justify-center border border-border-subtle shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary-strong" aria-hidden="true" />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-border-subtle/50 mt-6 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => handleBookService(svc.id)}
                className="flex-1 bg-primary-strong text-white hover:bg-primary-deep font-sans font-bold text-xs sm:text-sm py-3 rounded-xl text-center cursor-pointer transition-colors shadow-md shadow-primary/20"
              >
                Agendar este servicio
              </button>
              <button
                type="button"
                onClick={() => onChangeTab('planes')}
                className="border border-border-subtle bg-white hover:bg-bg-base text-primary-deep font-sans font-semibold text-xs py-3 px-4 rounded-xl transition-colors cursor-pointer"
              >
                Consultar planes
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Symptom Checker System */}
      <section className="glass-card p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-1 bg-accent-soft text-accent-text rounded-lg px-2.5 py-1 text-xs font-bold">
            <Sparkle className="w-3 h-3 text-accent-text" aria-hidden="true" />
            <span>Orientador de servicio</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-dark leading-tight">
            ¿No sabes qué servicio necesitas?
          </h2>
          <p className="font-sans text-xs sm:text-sm text-lead-muted leading-relaxed">
            Cuéntanos qué te ocurre y te orientamos hacia la evaluación, la
            sesión de fisioterapia o el masaje que mejor encaja contigo. La
            recomendación es orientativa: el fisioterapeuta confirmará el plan
            en la primera sesión.
          </p>
          <div className="p-4 bg-bg-base rounded-xl border border-border-subtle text-xs text-lead-muted flex gap-2">
            <ShieldAlert className="w-4 h-4 text-primary-strong shrink-0 mt-0.5" aria-hidden="true" />
            <span>Este cuestionario no sustituye una valoración clínica. Si tienes dolor intenso, fiebre o una lesión reciente, consulta primero.</span>
          </div>
        </div>

        <div className="lg:col-span-7">
          <form onSubmit={calculateRecommendation} className="bg-bg-base/50 p-6 rounded-2xl border border-border-subtle space-y-5">
            {/* Input Need */}
            <div className="space-y-2">
              <label htmlFor="need" className="font-sans text-xs sm:text-sm font-bold text-text-dark block">
                1. ¿Qué necesitas?
              </label>
              <select
                id="need"
                name="necesidad"
                required
                value={need}
                onChange={(e) => setNeed(e.target.value)}
                className="w-full bg-white border border-border-subtle rounded-xl px-4 py-3 text-xs sm:text-sm text-text-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <option value="">Elige una opción…</option>
                <option value="dolor">Dolor o lesión que limita mi movimiento</option>
                <option value="seguimiento">Ya tengo diagnóstico y quiero continuar mi tratamiento</option>
                <option value="tension">Tensión, estrés o contracturas</option>
                <option value="espalda">Tensión cervical o lumbar por estar sentado/a</option>
                <option value="piernas">Piernas cansadas o mala circulación</option>
                <option value="cuello">Rigidez de cuello o dolor de cabeza tensional</option>
              </select>
            </div>

            {/* Input Duration */}
            <div className="space-y-2">
              <span id="duration_label" className="font-sans text-xs sm:text-sm font-bold text-text-dark block">
                2. ¿Cuánto tiempo llevas con la molestia?
              </span>
              <div className="grid grid-cols-3 gap-3" role="group" aria-labelledby="duration_label">
                {[
                  { value: 'agudo', valLabel: 'Menos de 1 semana' },
                  { value: 'subagudo', valLabel: 'En torno a 2-4 semanas' },
                  { value: 'cronico', valLabel: 'Más de un mes (recurrente)' }
                ].map((dur) => (
                  <button
                    key={dur.value}
                    type="button"
                    aria-pressed={duration === dur.value}
                    onClick={() => setDuration(dur.value)}
                    className={`p-3 rounded-xl border text-center transition-colors cursor-pointer font-sans text-xs font-semibold flex items-center justify-center leading-tight ${
                      duration === dur.value
                        ? 'border-primary-strong bg-primary-strong text-white shadow-md'
                        : 'border-border-subtle bg-white hover:bg-bg-base text-lead-muted'
                    }`}
                  >
                    {dur.valLabel}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-sans font-bold text-sm text-center shadow-md transition-colors cursor-pointer bg-primary-strong text-white hover:bg-primary-deep"
            >
              Ver recomendación
            </button>
            {formError && (
              <p className="text-xs font-semibold text-red-700" role="alert">
                {formError}
              </p>
            )}
          </form>

          {/* Suggested Result Block */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-6 bg-accent-soft/70 border border-accent/50 rounded-2xl space-y-4 shadow-sm"
                role="status"
                aria-live="polite"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <span className="font-sans text-xs font-bold text-accent-text uppercase tracking-wider block">
                      Resultado recomendado:
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-text-dark flex items-center gap-1.5 leading-none">
                      <CircleCheck className="w-5 h-5 text-accent-text" aria-hidden="true" />
                      {result.therapyName}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleBookService(result.serviceId)}
                    className="bg-primary-strong hover:bg-primary-deep text-white font-sans font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1 transition-colors"
                  >
                    Reservar esto
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-2 font-sans text-xs sm:text-sm text-lead-muted leading-relaxed">
                  <p>{result.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="bg-white p-3 rounded-xl border border-border-subtle/50">
                      <p className="font-semibold text-text-dark">Frecuencia estimada:</p>
                      <p className="text-xs text-lead-muted mt-0.5">{result.frequency}</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-border-subtle/50">
                      <p className="font-semibold text-text-dark">Consejo inmediato:</p>
                      <p className="text-xs text-lead-muted mt-0.5 leading-normal">{result.advice}</p>
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
