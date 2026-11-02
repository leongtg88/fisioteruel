import { useEffect, useRef, useState, FormEvent } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  ChevronRight,
  CheckCircle2,
  ShieldCheck,
  Info,
  Sparkles,
  Loader2,
  FileText,
  ArrowLeft,
  X,
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Tab } from '../types';
import { formatPrice } from '@/lib/format';
import { BOOKABLE_SERVICES, SCHEDULE_DATA } from '@/lib/data';

interface AgendarProps {
  selectedServiceId: string;
  selectedPlanDiscount: number;
  onChangeTab: (tab: Tab) => void;
  onResetSelection?: () => void;
}

type FieldKey =
  | 'firstName'
  | 'lastName'
  | 'phone'
  | 'email'
  | 'address'
  | 'postalCode';

const pad = (value: number) => String(value).padStart(2, '0');

/** Fecha local en formato YYYY-MM-DD, sin el desfase de `toISOString()`. */
const toLocalISODate = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

const weekdayFormatter = new Intl.DateTimeFormat('es-ES', { weekday: 'short' });
const monthFormatter = new Intl.DateTimeFormat('es-ES', { month: 'short' });
const longDateFormatter = new Intl.DateTimeFormat('es-ES', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
});

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

const formatSelectedDate = (isoDate: string) => {
  if (!isoDate) return '';
  const [year, month, day] = isoDate.split('-').map(Number);
  return capitalize(longDateFormatter.format(new Date(year, month - 1, day)));
};

const readStepFromUrl = () => {
  if (typeof window === 'undefined') return 1;
  const parsed = Number(new URLSearchParams(window.location.search).get('paso'));
  return Number.isInteger(parsed) && parsed >= 1 && parsed <= 4 ? parsed : 1;
};

const CATEGORY_LABEL: Record<string, string> = {
  fisioterapia: 'Fisioterapia',
  masajes: 'Masaje',
  combos: 'Combo',
};

const CATEGORY_DESCRIPTION: Record<string, string> = {
  fisioterapia: 'Evaluación y tratamiento a domicilio en Santo Domingo.',
  masajes: 'Sesión de masaje terapéutico en tu hogar.',
  combos: 'Combo con extras incluidos, a domicilio.',
};

const SECTORS = [
  'Distrito Nacional',
  'Santo Domingo Este',
  'Santo Domingo Oeste',
  'Santo Domingo Norte',
  'Boca Chica',
  'Los Alcarrizos',
  'Pedro Brand',
];

const SPECIALISTS = [
  {
    id: 'any',
    name: 'Asignación automática',
    desc: 'Coordinamos al profesional disponible según el servicio que elijas.',
    descShort: 'Recomendado',
    icon: 'person_search',
  },
  {
    id: 'fisio',
    name: 'Fisioterapeuta',
    desc: 'Para evaluación, sesiones de fisioterapia y tratamiento del dolor.',
    descShort: 'Fisioterapia',
    icon: 'physical_therapy',
  },
  {
    id: 'masaje',
    name: 'Terapeuta de masaje',
    desc: 'Para masajes, descargas y combos de bienestar.',
    descShort: 'Masajes',
    icon: 'spa',
  },
];

const initialService = (id: string) =>
  BOOKABLE_SERVICES.some((item) => item.id === id) ? id : 'sesion-fisio';

export default function Agendar({
  selectedServiceId,
  selectedPlanDiscount,
  onChangeTab,
  onResetSelection,
}: AgendarProps) {
  const shouldReduceMotion = useReducedMotion();

  // Wizard steps
  const [step, setStep] = useState(readStepFromUrl);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [successBooking, setSuccessBooking] = useState<null | { id: string }>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Form selections state
  const [service, setService] = useState(initialService(selectedServiceId));
  const [specialist, setSpecialist] = useState('any');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Patient details state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [sector, setSector] = useState(SECTORS[0]);
  const [postalCode, setPostalCode] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});

  const services = BOOKABLE_SERVICES;

  // Próximos días disponibles: solo lunes a viernes (reserva online).
  const getDates = () => {
    const dates: { iso: string; date: Date }[] = [];
    const today = new Date();
    today.setHours(12, 0, 0, 0);

    for (let i = 1; i < 15; i += 1) {
      const day = new Date(today);
      day.setDate(today.getDate() + i);
      const weekday = day.getDay();
      if (weekday !== 0 && weekday !== 6) {
        dates.push({ iso: toLocalISODate(day), date: day });
      }
      if (dates.length === 8) break;
    }
    return dates;
  };

  const getSlotsForDate = (isoDate: string) => {
    if (!isoDate) return [];
    const day = new Date(`${isoDate}T12:00:00`).getDay();
    const block = SCHEDULE_DATA.find((item) =>
      item.onlineDays.includes(day)
    );
    return block?.slots ?? [];
  };

  const availableSlots = getSlotsForDate(selectedDate);

  // Calculations
  const currentServiceObj =
    services.find((item) => item.id === service) || services[0];
  const basePrice = currentServiceObj.price;
  const discountApplies = currentServiceObj.category === 'fisioterapia';
  const discountVal = discountApplies
    ? (selectedPlanDiscount / 100) * basePrice
    : 0;
  const finalPrice = basePrice - discountVal;
  const currentSpecialistObj =
    SPECIALISTS.find((item) => item.id === specialist) || SPECIALISTS[0];

  // Mantiene el paso actual en la URL sin recargar la página.
  const goToStep = (next: number) => {
    const bounded = Math.min(4, Math.max(1, next));
    setStep(bounded);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('paso', String(bounded));
      window.history.replaceState(null, '', url);
    }
  };

  useEffect(() => {
    const onPopState = () => setStep(readStepFromUrl());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Modal de éxito: foco atrapado, Escape y scroll bloqueado.
  useEffect(() => {
    if (!successBooking) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const modal = modalRef.current;
    modal?.querySelector<HTMLElement>('[data-modal-close]')?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSuccessBooking(null);
        return;
      }
      if (event.key !== 'Tab' || !modal) return;

      const focusable = Array.from(
        modal.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]')
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previousFocus && document.contains(previousFocus)) previousFocus.focus();
    };
  }, [successBooking]);

  // Aviso si se cierra la pestaña con datos del paciente sin enviar.
  useEffect(() => {
    const hasPatientData = Boolean(
      firstName || lastName || phone || email || address || postalCode
    );
    if (!hasPatientData || successBooking) return;

    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [
    firstName,
    lastName,
    phone,
    email,
    address,
    postalCode,
    successBooking,
  ]);

  const handleNextStep = () => {
    if (step < 4) goToStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) goToStep(step - 1);
  };

  const validateForm = () => {
    const nextErrors: Partial<Record<FieldKey, string>> = {};

    if (!firstName.trim()) nextErrors.firstName = 'Escribe tu nombre.';
    if (!lastName.trim()) nextErrors.lastName = 'Escribe tus apellidos.';
    if (!/^\+?[0-9\s()-]{10,}$/.test(phone.trim())) {
      nextErrors.phone = 'Escribe un teléfono válido, por ejemplo +1 809 000 0000.';
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      nextErrors.email = 'Escribe un correo válido, por ejemplo nombre@dominio.com.';
    }
    if (!address.trim()) nextErrors.address = 'Escribe la dirección donde te visitamos.';
    if (postalCode.trim() && !/^\d{5}$/.test(postalCode.trim())) {
      nextErrors.postalCode = 'Escribe un código postal de 5 dígitos o déjalo vacío.';
    }

    setErrors(nextErrors);
    const firstError = (Object.keys(nextErrors) as FieldKey[])[0];
    if (firstError) {
      document.getElementById(`booking_${firstError}`)?.focus();
    }
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmitBooking = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoadingSubmit(true);

    // Simula el guardado de la reserva.
    setTimeout(() => {
      setLoadingSubmit(false);
      const randomID = `FT-${44000 + Math.floor(Math.random() * 950)}`;
      setSuccessBooking({ id: randomID });
    }, 1800);
  };

  const handleBackToStart = () => {
    if (onResetSelection) {
      onResetSelection();
    } else {
      onChangeTab('inicio');
    }
    setSuccessBooking(null);
    setStep(1);
    setSelectedDate('');
    setSelectedTime('');
    setFirstName('');
    setLastName('');
    setPhone('');
    setEmail('');
    setAddress('');
    setSector(SECTORS[0]);
    setPostalCode('');
    setNotes('');
    setErrors({});
  };

  const fieldClasses = (field: FieldKey) =>
    `w-full bg-bg-base border rounded-lg px-3 py-2 text-sm text-text-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
      errors[field] ? 'border-red-500' : 'border-border-subtle'
    }`;

  return (
    <div className="max-w-[1280px] mx-auto px-6 pt-20 pb-20">
      {/* Visual Step Stepper */}
      <div className="mb-12 max-w-3xl mx-auto">
        <ol className="flex justify-between items-center relative">
          <div
            className="absolute top-1/2 left-0 right-0 h-0.5 bg-border-subtle -translate-y-1/2 -z-10"
            aria-hidden="true"
          />
          {[
            { num: 1, label: 'Especialidad' },
            { num: 2, label: 'Profesional' },
            { num: 3, label: 'Fecha y hora' },
            { num: 4, label: 'Tus datos' },
          ].map((item) => (
            <li key={item.num}>
              <button
                type="button"
                disabled={item.num > step}
                aria-current={step === item.num ? 'step' : undefined}
                onClick={() => goToStep(item.num)}
                className="flex flex-col items-center gap-1.5 group cursor-pointer disabled:cursor-not-allowed"
              >
                <span
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-sans font-bold text-sm border transition-colors ${
                    step === item.num
                      ? 'bg-primary-strong text-white border-primary-strong shadow ring-4 ring-primary/15'
                      : step > item.num
                        ? 'bg-accent text-lead border-accent'
                        : 'bg-white text-text-muted border-border-subtle group-hover:border-primary/50'
                  }`}
                >
                  {item.num}
                </span>
                <span
                  className={`font-sans text-xs font-semibold ${
                    step === item.num ? 'text-primary-deep' : 'text-lead-muted'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Interactive Wizard Controls */}
        <div className="lg:col-span-8 glass-card p-6 sm:p-8 min-h-[460px] flex flex-col justify-between">
          <p className="sr-only" role="status" aria-live="polite">
            Paso {step} de 4: {['Especialidad', 'Profesional', 'Fecha y hora', 'Tus datos'][step - 1]}
          </p>
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {/* Step 1: Services Choices */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-text-dark">
                      Selecciona el servicio
                    </h2>
                    <p className="font-sans text-sm text-lead-muted">
                      Fisioterapia, masajes y combos disponibles a domicilio en
                      Santo Domingo.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[540px] overflow-y-auto pr-1">
                    {services.map((svc) => (
                      <button
                        key={svc.id}
                        type="button"
                        aria-pressed={service === svc.id}
                        onClick={() => setService(svc.id)}
                        className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-colors cursor-pointer ${
                          service === svc.id
                            ? 'border-primary-strong bg-primary-soft/60 ring-2 ring-primary/15 shadow-sm'
                            : 'border-border-subtle hover:border-primary/50'
                        }`}
                      >
                        <span className="bg-white p-2 rounded-lg shadow-sm border border-border-subtle flex items-center justify-center shrink-0">
                          <span
                            aria-hidden="true"
                            className="material-symbols-outlined text-xl text-primary-strong"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            {svc.icon}
                          </span>
                        </span>
                        <span className="flex-1">
                          <span className="flex items-center gap-2 flex-wrap">
                            <span className="font-serif text-sm font-bold text-text-dark block">
                              {svc.name}
                            </span>
                            <span className="bg-bg-base border border-border-subtle text-[0.65rem] font-bold uppercase tracking-wider text-lead-muted px-1.5 py-0.5 rounded">
                              {CATEGORY_LABEL[svc.category]}
                            </span>
                          </span>
                          <span className="font-sans text-xs font-semibold text-primary-strong block mt-0.5 tabular">
                            {formatPrice(svc.price)} · {svc.duration} min
                          </span>
                          <span className="font-sans text-xs text-lead-muted block leading-snug mt-1">
                            {CATEGORY_DESCRIPTION[svc.category]}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>

                  {selectedPlanDiscount > 0 && discountApplies && (
                    <div className="p-3 bg-accent-soft border border-accent/50 rounded-xl flex items-center gap-2 text-xs text-accent-text">
                      <Sparkles className="w-4 h-4 text-accent-text shrink-0" aria-hidden="true" />
                      <span>
                        ¡Tienes un descuento acumulado activo de{' '}
                        <strong>{selectedPlanDiscount}%</strong> por el plan seleccionado!
                      </span>
                    </div>
                  )}
                  {selectedPlanDiscount > 0 && !discountApplies && (
                    <div className="p-3 bg-bg-base border border-border-subtle rounded-xl flex items-center gap-2 text-xs text-lead-muted">
                      <Info className="w-4 h-4 text-primary-strong shrink-0" aria-hidden="true" />
                      <span>
                        El descuento de plan ({selectedPlanDiscount}%) aplica solo a
                        servicios de fisioterapia. Este servicio se cobra a tarifa normal.
                      </span>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 2: Choose professional */}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-text-dark">
                      ¿Quién te atiende?
                    </h2>
                    <p className="font-sans text-sm text-lead-muted">
                      Elige una preferencia o deja que asignemos al profesional
                      disponible.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {SPECIALISTS.map((sp) => (
                      <button
                        key={sp.id}
                        type="button"
                        aria-pressed={specialist === sp.id}
                        onClick={() => setSpecialist(sp.id)}
                        className={`w-full p-4 rounded-xl border text-left flex items-center gap-4 transition-colors cursor-pointer ${
                          specialist === sp.id
                            ? 'border-primary-strong bg-primary-soft/60 ring-2 ring-primary/15 shadow-sm'
                            : 'border-border-subtle hover:border-primary/50'
                        }`}
                      >
                        <span className="w-12 h-12 rounded-xl bg-white border border-border-subtle flex items-center justify-center shrink-0">
                          <span
                            aria-hidden="true"
                            className="material-symbols-outlined text-2xl text-primary-strong"
                          >
                            {sp.icon}
                          </span>
                        </span>
                        <span className="flex-1 space-y-1">
                          <span className="font-serif text-base font-bold text-text-dark block">
                            {sp.name}
                          </span>
                          <span className="font-sans text-xs text-lead-muted block">{sp.desc}</span>
                        </span>
                        <span className="font-sans text-xs text-lead-muted shrink-0 text-right font-bold">
                          {sp.descShort}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Calendar date & hours */}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                  className="space-y-5"
                >
                  <div className="space-y-1">
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-text-dark">
                      Selecciona fecha y hora
                    </h2>
                    <p className="font-sans text-sm text-lead-muted">
                      La reserva online está disponible de lunes a viernes. Los
                      fines de semana se coordinan aparte.
                    </p>
                  </div>

                  {/* Dates Horizontal Row */}
                  <div className="space-y-2">
                    <span id="available_dates_label" className="font-sans text-xs font-bold text-text-dark block">
                      Fechas próximas disponibles:
                    </span>
                    <div
                      role="group"
                      aria-labelledby="available_dates_label"
                      className="grid grid-cols-3 sm:grid-cols-7 gap-2 overflow-x-auto pb-1"
                    >
                      {getDates().map((dt) => (
                        <button
                          key={dt.iso}
                          type="button"
                          aria-pressed={selectedDate === dt.iso}
                          onClick={() => {
                            setSelectedDate(dt.iso);
                            const slots = getSlotsForDate(dt.iso);
                            setSelectedTime(slots[0] ?? '');
                          }}
                          className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-colors cursor-pointer ${
                            selectedDate === dt.iso
                              ? 'border-primary-strong bg-primary-strong text-white shadow'
                              : 'border-border-subtle bg-white hover:bg-bg-base'
                          }`}
                        >
                          <span className="font-sans text-xs uppercase font-bold tracking-tight opacity-80">
                            {weekdayFormatter.format(dt.date).replace('.', '')}
                          </span>
                          <span className="font-serif text-lg font-bold block my-0.5 leading-none tabular">
                            {dt.date.getDate()}
                          </span>
                          <span className="font-sans text-xs font-semibold">
                            {monthFormatter.format(dt.date).replace('.', '')}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Hour slots selector */}
                  {selectedDate ? (
                    <div className="space-y-2">
                      <span id="time_slots_label" className="font-sans text-xs font-bold text-text-dark block">
                        Horas disponibles para el {formatSelectedDate(selectedDate)}:
                      </span>
                      <div
                        role="group"
                        aria-labelledby="time_slots_label"
                        className="grid grid-cols-2 sm:grid-cols-4 gap-2"
                      >
                        {availableSlots.map((ts) => (
                          <button
                            key={ts}
                            type="button"
                            aria-pressed={selectedTime === ts}
                            onClick={() => setSelectedTime(ts)}
                            className={`p-2.5 rounded-lg border text-center transition-colors cursor-pointer font-sans text-xs font-bold flex items-center justify-center gap-1.5 tabular ${
                              selectedTime === ts
                                ? 'border-primary-strong bg-primary-soft text-primary-deep ring-2 ring-primary/25 shadow-sm'
                                : 'border-border-subtle bg-white hover:border-primary/50 text-lead-muted'
                            }`}
                          >
                            <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                            {ts}
                          </button>
                        ))}
                      </div>
                      <div className="p-3 bg-bg-base border border-border-subtle rounded-xl flex items-start gap-2 text-xs text-lead-muted">
                        <Info className="w-4 h-4 text-primary-strong shrink-0 mt-0.5" aria-hidden="true" />
                        <span>
                          Sábados y domingos: horario variable, previa coordinación.
                          Escríbenos para acordar una hora.
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 border border-dashed border-border-subtle rounded-xl text-center">
                      <p className="font-sans text-sm text-lead-muted">
                        Por favor, selecciona una fecha del listado superior primero para ver los huecos libres.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 4: Personal Patient Information form */}
              {step === 4 && (
                <motion.div
                  key="step-4"
                  initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-text-dark">
                      Tus datos de asistencia
                    </h2>
                    <p className="font-sans text-sm text-lead-muted">
                      Introduce tu dirección en Santo Domingo y tus datos de contacto.
                    </p>
                  </div>

                  <form
                    id="booking-details-form"
                    noValidate
                    onSubmit={handleSubmitBooking}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    {/* First Name */}
                    <div className="space-y-1">
                      <label htmlFor="booking_firstName" className="font-sans text-xs font-bold text-text-dark block">
                        Nombre:
                      </label>
                      <input
                        id="booking_firstName"
                        name="given-name"
                        autoComplete="given-name"
                        type="text"
                        placeholder="Ej. Roberto…"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        aria-invalid={Boolean(errors.firstName)}
                        aria-describedby={errors.firstName ? 'error_firstName' : undefined}
                        className={fieldClasses('firstName')}
                      />
                      {errors.firstName && (
                        <p id="error_firstName" role="alert" className="text-xs font-semibold text-red-700">
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    {/* Last Name */}
                    <div className="space-y-1">
                      <label htmlFor="booking_lastName" className="font-sans text-xs font-bold text-text-dark block">
                        Apellidos:
                      </label>
                      <input
                        id="booking_lastName"
                        name="family-name"
                        autoComplete="family-name"
                        type="text"
                        placeholder="Ej. Sánchez Pérez…"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        aria-invalid={Boolean(errors.lastName)}
                        aria-describedby={errors.lastName ? 'error_lastName' : undefined}
                        className={fieldClasses('lastName')}
                      />
                      {errors.lastName && (
                        <p id="error_lastName" role="alert" className="text-xs font-semibold text-red-700">
                          {errors.lastName}
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1">
                      <label htmlFor="booking_phone" className="font-sans text-xs font-bold text-text-dark block">
                        Teléfono móvil:
                      </label>
                      <input
                        id="booking_phone"
                        name="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        spellCheck={false}
                        type="tel"
                        placeholder="Ej. +1 809 000 0000…"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? 'error_phone' : undefined}
                        className={fieldClasses('phone')}
                      />
                      {errors.phone && (
                        <p id="error_phone" role="alert" className="text-xs font-semibold text-red-700">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label htmlFor="booking_email" className="font-sans text-xs font-bold text-text-dark block">
                        Correo electrónico:
                      </label>
                      <input
                        id="booking_email"
                        name="email"
                        autoComplete="email"
                        inputMode="email"
                        spellCheck={false}
                        type="email"
                        placeholder="Ej. roberto@dominio.com…"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'error_email' : undefined}
                        className={fieldClasses('email')}
                      />
                      {errors.email && (
                        <p id="error_email" role="alert" className="text-xs font-semibold text-red-700">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Full Address */}
                    <div className="space-y-1 sm:col-span-2">
                      <label htmlFor="booking_address" className="font-sans text-xs font-bold text-text-dark block">
                        Dirección en Santo Domingo (calle, edificio, apto):
                      </label>
                      <input
                        id="booking_address"
                        name="street-address"
                        autoComplete="street-address"
                        type="text"
                        placeholder="Ej. Calle 27 de Febrero 123, apto 4B…"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        aria-invalid={Boolean(errors.address)}
                        aria-describedby={errors.address ? 'error_address' : undefined}
                        className={fieldClasses('address')}
                      />
                      {errors.address && (
                        <p id="error_address" role="alert" className="text-xs font-semibold text-red-700">
                          {errors.address}
                        </p>
                      )}
                    </div>

                    {/* Sector / municipality */}
                    <div className="space-y-1">
                      <label htmlFor="booking_sector" className="font-sans text-xs font-bold text-text-dark block">
                        Sector o municipio:
                      </label>
                      <select
                        id="booking_sector"
                        name="sector"
                        value={sector}
                        onChange={(e) => setSector(e.target.value)}
                        className="w-full bg-bg-base border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 cursor-pointer"
                      >
                        {SECTORS.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* ZIP Code */}
                    <div className="space-y-1">
                      <label htmlFor="booking_postalCode" className="font-sans text-xs font-bold text-text-dark block">
                        Código postal (opcional):
                      </label>
                      <input
                        id="booking_postalCode"
                        name="postal-code"
                        autoComplete="postal-code"
                        inputMode="numeric"
                        type="text"
                        placeholder="Ej. 10125…"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        aria-invalid={Boolean(errors.postalCode)}
                        aria-describedby={errors.postalCode ? 'error_postalCode' : undefined}
                        className={fieldClasses('postalCode')}
                      />
                      {errors.postalCode ? (
                        <p id="error_postalCode" role="alert" className="text-xs font-semibold text-red-700">
                          {errors.postalCode}
                        </p>
                      ) : (
                        <span className="font-sans text-xs text-lead-muted block mt-1">
                          5 dígitos. Puedes dejarlo vacío.
                        </span>
                      )}
                    </div>

                    {/* Notes */}
                    <div className="space-y-1 sm:col-span-2">
                      <label htmlFor="booking_notes" className="font-sans text-xs font-bold text-text-dark block">
                        Notas o síntomas previos (opcional):
                      </label>
                      <textarea
                        id="booking_notes"
                        name="notes"
                        rows={2}
                        placeholder="Cuéntanos brevemente qué te ocurre, diagnósticos previos, dolores localizados…"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full bg-bg-base border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                      />
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="pt-8 border-t border-border-subtle flex justify-between gap-4 mt-6">
            <button
              type="button"
              disabled={step === 1}
              onClick={handlePrevStep}
              className={`font-sans font-bold text-sm px-5 py-2.5 rounded-xl border flex items-center gap-1 cursor-pointer select-none transition-colors ${
                step === 1
                  ? 'border-border-subtle text-text-muted bg-white opacity-40 cursor-not-allowed'
                  : 'border-border-subtle bg-white hover:bg-bg-base text-text-dark'
              }`}
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Atrás
            </button>

            {step < 4 ? (
              <button
                type="button"
                disabled={step === 3 && !selectedDate}
                onClick={handleNextStep}
                className={`font-sans font-bold text-sm px-6 py-2.5 rounded-xl text-white select-none transition-colors flex items-center gap-1 cursor-pointer shadow-md shadow-primary/20 ${
                  step === 3 && !selectedDate
                    ? 'bg-slate-300 cursor-not-allowed'
                    : 'bg-primary-strong hover:bg-primary-deep'
                }`}
              >
                Continuar
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="submit"
                form="booking-details-form"
                disabled={loadingSubmit}
                className={`font-sans font-bold text-sm px-8 py-3 rounded-xl text-lead bg-accent-strong shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                  loadingSubmit ? 'opacity-80 cursor-wait' : 'hover:bg-accent'
                }`}
              >
                {loadingSubmit ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-lead" aria-hidden="true" />
                    Procesando reserva…
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5 text-lead" aria-hidden="true" />
                    Confirmar y agendar sesión
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Right Sticky Booking Summary Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-6 space-y-5">
            <h2 className="font-serif text-lg font-bold text-text-dark border-b border-border-subtle pb-3 flex items-center gap-1.5">
              <FileText className="w-5 h-5 text-primary-strong" aria-hidden="true" />
              Resumen del servicio
            </h2>

            {/* Selected service and details */}
            <div className="space-y-4 text-sm text-lead-muted">
              {/* Service name */}
              <div className="space-y-1">
                <span className="font-sans text-xs font-bold text-lead-muted uppercase tracking-wider block">
                  Servicio solicitado:
                </span>
                <p className="font-serif text-base font-bold text-text-dark">{currentServiceObj.name}</p>
                <span className="font-sans text-xs text-primary-strong font-medium block">
                  {currentServiceObj.duration} min · Atención a domicilio
                </span>
              </div>

              {/* Professional */}
              <div className="space-y-1 border-t border-border-subtle pt-3">
                <span className="font-sans text-xs font-bold text-lead-muted uppercase tracking-wider block">
                  Profesional:
                </span>
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-md bg-bg-base shrink-0 border border-border-subtle flex items-center justify-center">
                    <span
                      aria-hidden="true"
                      className="material-symbols-outlined text-sm text-primary-strong"
                    >
                      person
                    </span>
                  </span>
                  <p className="font-sans text-xs font-bold text-text-dark">{currentSpecialistObj.name}</p>
                </div>
              </div>

              {/* Sched timestamp */}
              {selectedDate && (
                <div className="space-y-1 border-t border-border-subtle pt-3">
                  <span className="font-sans text-xs font-bold text-lead-muted uppercase tracking-wider block">
                    Fecha y hora reservada:
                  </span>
                  <div className="flex items-center gap-1.5 text-text-dark font-sans font-bold text-xs bg-bg-base px-2.5 py-1.5 rounded-lg border border-border-subtle w-fit tabular">
                    <CalendarIcon className="w-3.5 h-3.5 text-primary-strong" aria-hidden="true" />
                    <span>{formatSelectedDate(selectedDate)}</span>
                    <Clock className="w-3.5 h-3.5 text-primary-strong ml-1" aria-hidden="true" />
                    <span>{selectedTime} h</span>
                  </div>
                </div>
              )}

              {/* Patient brief address */}
              {address && (
                <div className="space-y-1 border-t border-border-subtle pt-3">
                  <span className="font-sans text-xs font-bold text-lead-muted uppercase tracking-wider block">
                    Ubicación de asistencia (Santo Domingo):
                  </span>
                  <div className="flex items-start gap-1.5 text-text-dark text-xs font-semibold leading-relaxed">
                    <MapPin className="w-4 h-4 text-primary-strong shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      {address}, {sector}
                      {postalCode && ` (CP: ${postalCode})`}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="border-t border-border-subtle pt-4 space-y-2 text-sm text-lead-muted tabular">
              <div className="flex justify-between">
                <span>Servicio a domicilio:</span>
                <span className="font-semibold text-text-dark">{formatPrice(basePrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Desplazamiento en Santo Domingo:</span>
                <span className="text-primary-deep font-bold bg-primary-soft px-2 py-0.5 rounded border border-primary/20">
                  Incluido ({formatPrice(0)})
                </span>
              </div>
              <div className="flex justify-between">
                <span>Material profesional:</span>
                <span className="text-primary-deep font-bold bg-primary-soft px-2 py-0.5 rounded border border-primary/20">
                  Incluido ({formatPrice(0)})
                </span>
              </div>

              {selectedPlanDiscount > 0 && discountApplies && (
                <div className="flex justify-between text-accent-text font-sans font-bold bg-accent-soft p-2 rounded-lg border border-accent/40">
                  <span>Descuento de plan ({selectedPlanDiscount}%):</span>
                  <span>-{formatPrice(discountVal)}</span>
                </div>
              )}

              {selectedPlanDiscount > 0 && !discountApplies && (
                <div className="p-2 bg-bg-base rounded-lg border border-border-subtle text-xs text-lead-muted">
                  El descuento de plan aplica solo a fisioterapia.
                </div>
              )}

              <div className="flex justify-between items-baseline pt-3 border-t border-border-subtle mt-4">
                <span className="font-sans text-sm font-bold text-text-dark">Total sesión:</span>
                <span className="font-serif text-2xl font-extrabold text-primary-deep">
                  {formatPrice(finalPrice)}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-bg-base border border-border-subtle rounded-2xl flex gap-3 items-start shadow-sm">
            <Info className="w-4 h-4 text-primary-strong shrink-0 mt-0.5" aria-hidden="true" />
            <p className="font-sans text-xs text-lead-muted leading-relaxed">
              <strong className="text-text-dark font-semibold">Política de cancelación:</strong> ¿Te ha surgido un imprevisto? Puedes cancelar o posponer tu cita de forma gratuita hasta 12 horas antes avisando por teléfono.
            </p>
          </div>
        </div>
      </div>

      {/* SUCCESS OVERLAY MODAL */}
      <AnimatePresence>
        {successBooking && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="success_title"
              initial={shouldReduceMotion ? false : { scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-[2rem] p-6 sm:p-10 max-w-xl w-full border border-border-subtle shadow-2xl relative text-center space-y-6 max-h-[90vh] overflow-y-auto overscroll-contain"
            >
              <button
                type="button"
                data-modal-close
                onClick={() => setSuccessBooking(null)}
                className="absolute top-4 right-4 text-lead-muted hover:text-text-dark p-1 rounded-lg"
                aria-label="Cerrar confirmación"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>

              <div className="w-16 h-16 bg-primary-soft text-primary-strong rounded-full mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" aria-hidden="true" />
              </div>

              <div className="space-y-2">
                <span className="font-sans text-xs font-bold text-primary-strong uppercase tracking-wider block">
                  ¡Reserva recibida correctamente!
                </span>
                <h2 id="success_title" className="font-serif text-2xl sm:text-3xl font-extrabold text-text-dark leading-tight">
                  Tu cita ha sido agendada
                </h2>
                <div className="bg-bg-base py-2 px-4 rounded-xl border border-border-subtle inline-block font-sans text-sm font-black text-text-dark tracking-wide tabular">
                  Código de reserva: <span className="text-primary-strong">{successBooking.id}</span>
                </div>
              </div>

              <div className="border border-border-subtle rounded-2xl p-4 sm:p-5 bg-bg-base text-left font-sans text-sm text-lead-muted space-y-2 leading-relaxed">
                <div className="flex justify-between gap-4">
                  <span>Paciente:</span>
                  <strong className="text-text-dark">{firstName} {lastName}</strong>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Profesional:</span>
                  <strong className="text-text-dark">{currentSpecialistObj.name}</strong>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Fecha y hora:</span>
                  <strong className="text-text-dark">{formatSelectedDate(selectedDate)} a las {selectedTime} h</strong>
                </div>
                <div className="flex justify-between gap-4 border-t border-border-subtle pt-2 mt-2">
                  <span>Dirección:</span>
                  <strong className="text-text-dark text-right max-w-xs">
                    {address}, {sector}
                  </strong>
                </div>
              </div>

              <div className="space-y-4">
                <p className="font-sans text-sm text-lead-muted leading-relaxed">
                  Te hemos enviado un correo de confirmación con los detalles a <strong>{email}</strong>. El profesional asignado te llamará a tu móvil para formalizar los detalles de la sesión.
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleBackToStart}
                    className="w-full sm:w-auto bg-primary-strong text-white hover:bg-primary-deep font-sans text-sm font-bold px-8 py-3.5 rounded-xl transition-colors cursor-pointer shadow-md inline-block"
                  >
                    Entendido, volver al inicio
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
