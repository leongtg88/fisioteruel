import { useState, FormEvent } from 'react';
import { Calendar as CalendarIcon, User, Clock, MapPin, ChevronRight, CheckCircle2, ShieldCheck, Mail, Phone, Info, Sparkles, Loader2, FileText, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Tab } from '../types';
import { formatPrice } from '@/lib/format';
import { THERAPY_PRICE_DOP } from '@/lib/prices';

interface AgendarProps {
  selectedServiceId: string;
  selectedPlanDiscount: number;
  onChangeTab: (tab: Tab) => void;
  onResetSelection?: () => void;
}

export default function Agendar({
  selectedServiceId,
  selectedPlanDiscount,
  onChangeTab,
  onResetSelection
}: AgendarProps) {
  // Wizard steps
  const [step, setStep] = useState(1);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [successBooking, setSuccessBooking] = useState<null | { id: string }>(null);

  // Form selections state
  const [service, setService] = useState(selectedServiceId || 'trauma');
  const [specialist, setSpecialist] = useState('any');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  // Patient details state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [notes, setNotes] = useState('');

  // Diagnostic data
  const services = [
    { id: 'trauma', name: 'Fisioterapia Traumatológica', price: THERAPY_PRICE_DOP.trauma, icon: '🦴' },
    { id: 'deporte', name: 'Fisioterapia Deportiva', price: THERAPY_PRICE_DOP.deporte, icon: '🏋️' },
    { id: 'geriatrica', name: 'Fisioterapia Geriátrica', price: THERAPY_PRICE_DOP.geriatrica, icon: '👴' },
    { id: 'neuro', name: 'Fisioterapia Neurológica', price: THERAPY_PRICE_DOP.neuro, icon: '🧠' }
  ];

  const specialists = [
    { id: 'any', name: 'Fisioterapeuta disponible más rápido', desc: 'Asigna de forma coordinada e inmediata.', descShort: 'El de guardia', rating: 4.9, img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=400&q=80' },
    { id: 'javier', name: 'Dr. Javier Méndez', desc: 'Especialista en trauma deportivo, dolor crónico y técnicas manuales.', descShort: 'Col. 1403', rating: 5.0, img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80' },
    { id: 'elena', name: 'Dra. Elena Soriano', desc: 'Especialista en neurorehabilitación, geriatría y presoterapia a domicilio.', descShort: 'Col. 1928', rating: 4.8, img: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=400&q=80' }
  ];

  // Calendar dates mock (next 7 days except Sunday)
  const getDates = () => {
    const dates = [];
    const daysArr = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const monthsArr = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    
    for (let i = 1; i < 9; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      // Skip Sundays
      if (d.getDay() !== 0) {
        dates.push({
          isoStr: d.toISOString().split('T')[0],
          dayName: daysArr[d.getDay()],
          dayNum: d.getDate(),
          monthName: monthsArr[d.getMonth()]
        });
      }
    }
    return dates;
  };

  const timeSlots = [
    '08:30', '10:00', '11:30', '13:00', '15:30', '17:00', '18:30', '20:00'
  ];

  // Calculations
  const currentServiceObj = services.find(s => s.id === service) || services[0];
  const basePrice = currentServiceObj.price;
  const rawTotal = basePrice;
  const discountVal = (selectedPlanDiscount / 100) * rawTotal;
  const finalPrice = rawTotal - discountVal;

  const currentSpecialistObj = specialists.find(sp => sp.id === specialist) || specialists[0];

  const handleNextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmitBooking = (e: FormEvent) => {
    e.preventDefault();
    setLoadingSubmit(true);
    
    // Simulate API storage latency block
    setTimeout(() => {
      setLoadingSubmit(false);
      const randomID = `FT-${44000 + Math.floor(Math.random() * 950)}`;
      setSuccessBooking({ id: randomID });
    }, 1800);
  };

  const handleBackToStart = () => {
    if (onResetSelection) onResetSelection();
    setSuccessBooking(null);
    setStep(1);
    setSelectedDate('');
    setSelectedTime('');
    setFirstName('');
    setLastName('');
    setPhone('');
    setEmail('');
    setAddress('');
    setPostalCode('');
    setNotes('');
    onChangeTab('inicio');
  };

  return (
    <div className="max-w-7xl mx-auto px-1">
      {/* Visual Step Stepper */}
      <div className="mb-10 max-w-3xl mx-auto">
        <div className="flex justify-between items-center relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border-subtle -translate-y-1/2 -z-10" />
          {[
            { num: 1, label: 'Especialidad' },
            { num: 2, label: 'Especialista' },
            { num: 3, label: 'Fecha y Hora' },
            { num: 4, label: 'Tus Datos' }
          ].map((s) => (
            <button
              key={s.num}
              disabled={s.num > step && !selectedDate}
              onClick={() => setStep(s.num)}
              className="flex flex-col items-center gap-1.5 focus:outline-none focus:ring-0 group cursor-pointer"
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-sans font-bold text-xs sm:text-sm border transition-all ${
                  step === s.num
                    ? 'bg-primary text-white border-primary shadow ring-4 ring-primary/15'
                    : step > s.num
                    ? 'bg-accent-warm text-text-dark border-accent-warm'
                    : 'bg-white text-text-muted border-border-subtle group-hover:border-primary-container'
                }`}
              >
                {s.num}
              </div>
              <span className={`font-sans text-[10px] sm:text-xs font-semibold ${step === s.num ? 'text-primary' : 'text-text-muted'}`}>
                {s.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Interactive Wizard Controls */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-border-subtle shadow-md min-h-[460px] flex flex-col justify-between">
          
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {/* Step 1: Services Choices */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-primary">Selecciona la Especialidad</h3>
                    <p className="font-sans text-xs sm:text-sm text-text-muted">¿Qué dolencia o tratamiento deseas enfocar hoy?</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {services.map((svc) => (
                      <button
                        key={svc.id}
                        type="button"
                        onClick={() => setService(svc.id)}
                        className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                          service === svc.id
                            ? 'border-primary bg-primary/5 ring-2 ring-primary/15 shadow-sm'
                            : 'border-border-subtle hover:border-primary/55'
                        }`}
                      >
                        <span className="text-2xl bg-white p-2 rounded-lg shadow-sm border border-border-subtle/40 leading-none inline-block">{svc.icon}</span>
                        <div className="flex-1">
                          <span className="font-serif text-sm font-bold text-text-dark block">{svc.name}</span>
                          <span className="font-sans text-xs font-semibold text-primary block mt-0.5">{formatPrice(svc.price)} / sesión</span>
                          <span className="font-sans text-[10px] text-text-muted block leading-snug mt-1">Con camilla profesional y material incluido.</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {selectedPlanDiscount > 0 && (
                    <div className="p-3 bg-accent-light/50 border border-accent/25 rounded-xl flex items-center gap-2 text-xs text-accent">
                      <Sparkles className="w-4 h-4 text-accent-warm shrink-0" />
                      <span>¡Tienes un descuento acumulado activo de <strong>{selectedPlanDiscount}%</strong> por bono seleccionado!</span>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 2: Choose therapist */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-primary">Elige tu Fisioterapeuta</h3>
                    <p className="font-sans text-xs sm:text-sm text-text-muted">Todos nuestros fisioterapeutas están graduados y colegiados.</p>
                  </div>
                  
                  <div className="space-y-3">
                    {specialists.map((sp) => (
                      <button
                        key={sp.id}
                        type="button"
                        onClick={() => setSpecialist(sp.id)}
                        className={`w-full p-4 rounded-xl border text-left flex flex-col sm:flex-row items-center gap-4 transition-all cursor-pointer ${
                          specialist === sp.id
                            ? 'border-primary bg-primary/5 ring-2 ring-primary/15 shadow-sm'
                            : 'border-border-subtle hover:border-primary/55'
                        }`}
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-border-subtle shrink-0">
                          <img src={sp.img} alt={sp.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex-1 space-y-1 text-center sm:text-left">
                          <div className="flex sm:justify-start justify-center items-center gap-2">
                            <span className="font-serif text-base font-bold text-text-dark">{sp.name}</span>
                            <span className="bg-bg-base border border-border-subtle font-sans text-[10px] font-bold px-2 py-0.5 rounded text-accent">
                              ⭐ {sp.rating}
                            </span>
                          </div>
                          <span className="font-sans text-xs text-text-muted block">{sp.desc}</span>
                        </div>
                        <div className="font-sans text-xs text-text-muted shrink-0 text-right font-medium">
                          {sp.descShort}
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Calendar date & hours */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-primary">Selecciona Fecha y Hora</h3>
                    <p className="font-sans text-xs sm:text-sm text-text-muted">Los domingos descansamos por conciliación. Elige un hueco disponible.</p>
                  </div>

                  {/* Dates Horizontal Row */}
                  <div className="space-y-2">
                    <span className="font-sans text-xs font-bold text-text-dark block">Fechas próximas disponibles:</span>
                    <div className="grid grid-cols-3 sm:grid-cols-7 gap-2 overflow-x-auto pb-1">
                      {getDates().map((dt) => (
                        <button
                          key={dt.isoStr}
                          type="button"
                          onClick={() => {
                            setSelectedDate(dt.isoStr);
                            // Auto select a time if not set
                            if (!selectedTime) setSelectedTime('10:00');
                          }}
                          className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                            selectedDate === dt.isoStr
                              ? 'border-primary bg-primary text-white shadow'
                              : 'border-border-subtle bg-white hover:bg-border-subtle/20'
                          }`}
                        >
                          <span className="font-sans text-[10px] uppercase font-bold tracking-tight opacity-75">{dt.dayName}</span>
                          <span className="font-serif text-lg font-bold block my-0.5 leading-none">{dt.dayNum}</span>
                          <span className="font-sans text-[9px] font-semibold">{dt.monthName}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Hour slots selector */}
                  {selectedDate ? (
                    <div className="space-y-2">
                      <span className="font-sans text-xs font-bold text-text-dark block">Horas disponibles para el {selectedDate}:</span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {timeSlots.map((ts) => (
                          <button
                            key={ts}
                            type="button"
                            onClick={() => setSelectedTime(ts)}
                            className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer font-sans text-xs font-bold flex items-center justify-center gap-1.5 ${
                              selectedTime === ts
                                ? 'border-primary bg-primary/5 text-primary ring-2 ring-primary/20 shadow-sm'
                                : 'border-border-subtle bg-white hover:border-primary/55 text-text-muted'
                            }`}
                          >
                            <Clock className="w-3.5 h-3.5 shrink-0" />
                            {ts}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 border border-dashed border-border-subtle rounded-xl text-center">
                      <p className="font-sans text-xs sm:text-sm text-text-muted">Por favor, selecciona una fecha del listado superior primero para ver los huecos libres.</p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 4: Personal Patient Information form */}
              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-primary">Tus Datos de Asistencia</h3>
                    <p className="font-sans text-xs sm:text-sm text-text-muted">Introduce tu dirección en Teruel y datos de contacto para acudir.</p>
                  </div>

                  <form id="booking-details-form" onSubmit={handleSubmitBooking} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* First Name */}
                    <div className="space-y-1">
                      <label className="font-sans text-xs font-bold text-text-dark block">Nombre:</label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Roberto"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-bg-base border border-border-subtle rounded-lg px-3 py-2 text-xs sm:text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    {/* Last Name */}
                    <div className="space-y-1">
                      <label className="font-sans text-xs font-bold text-text-dark block">Apellidos:</label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Sánchez Pérez"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full bg-bg-base border border-border-subtle rounded-lg px-3 py-2 text-xs sm:text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1">
                      <label className="font-sans text-xs font-bold text-text-dark block">Teléfono Móvil:</label>
                      <input
                        type="tel"
                        required
                        placeholder="Ej. +34 600 000 000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-bg-base border border-border-subtle rounded-lg px-3 py-2 text-xs sm:text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="font-sans text-xs font-bold text-text-dark block">Correo Electrónico:</label>
                      <input
                        type="email"
                        required
                        placeholder="Ej. roberto@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-bg-base border border-border-subtle rounded-lg px-3 py-2 text-xs sm:text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    {/* Full Address */}
                    <div className="space-y-1 sm:col-span-2">
                      <label className="font-sans text-xs font-bold text-text-dark block">Dirección en Teruel (Calle, Portal, Piso):</label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Calle de la Amargura 24, 3º Izquierda"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full bg-bg-base border border-border-subtle rounded-lg px-3 py-2.5 text-xs sm:text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    {/* ZIP Code */}
                    <div className="space-y-1">
                      <label className="font-sans text-xs font-bold text-text-dark block">Código Postal Teruel:</label>
                      <input
                        type="text"
                        required
                        pattern="^44[0-9]{3}$"
                        placeholder="Ej. 44001"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full bg-bg-base border border-border-subtle rounded-lg px-3 py-2 text-xs sm:text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                      <span className="font-sans text-[10px] text-text-muted block leading-none mt-1">Debe empezar por 44xxx provincias Teruel.</span>
                    </div>

                    {/* Notes */}
                    <div className="space-y-1 sm:col-span-2">
                      <label className="font-sans text-xs font-bold text-text-dark block">Notas clínicas o síntomas previos (Opcional):</label>
                      <textarea
                        rows={2}
                        placeholder="Explícanos brevemente qué te ocurre, diagnóstico médico previo, dolores localizados, etc."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full bg-bg-base border border-border-subtle rounded-lg px-3 py-2 text-xs sm:text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/20"
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
              className={`font-sans font-bold text-xs sm:text-sm px-5 py-2.5 rounded-lg border flex items-center gap-1 cursor-pointer select-none transition-all ${
                step === 1
                  ? 'border-border-subtle text-text-muted bg-white opacity-40 cursor-not-allowed'
                  : 'border-border-subtle bg-white hover:bg-bg-base text-text-dark active:scale-[0.98]'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Atrás
            </button>

            {step < 4 ? (
              <button
                type="button"
                disabled={step === 3 && !selectedDate}
                onClick={handleNextStep}
                className={`font-sans font-bold text-xs sm:text-sm px-6 py-2.5 rounded-lg text-white select-none transition-all flex items-center gap-1 cursor-pointer shadow-sm ${
                  step === 3 && !selectedDate
                    ? 'bg-border-subtle text-text-muted cursor-not-allowed opacity-50'
                    : 'bg-primary hover:bg-primary-container hover:shadow active:scale-[0.98]'
                }`}
              >
                Continuar
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                form="booking-details-form"
                disabled={loadingSubmit || !firstName || !lastName || !phone || !email || !address || !postalCode}
                className={`font-sans font-bold text-sm px-8 py-3 rounded-lg text-text-dark bg-accent-warm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  loadingSubmit
                    ? 'opacity-80 cursor-wait'
                    : 'hover:bg-accent hover:shadow-lg active:scale-[0.98]'
                }`}
              >
                {loadingSubmit ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-text-dark" />
                    Procesando Reserva...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5 text-text-dark" />
                    Confirmar y Agendar Sesión
                  </>
                )}
              </button>
            )}
          </div>

        </div>

        {/* Right Sticky Booking Summary Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-border-subtle shadow-md space-y-5">
            <h4 className="font-serif text-lg font-bold text-primary border-b border-border-subtle pb-3 flex items-center gap-1.5">
              <FileText className="w-5 h-5 text-primary" />
              Resumen del Servicio
            </h4>

            {/* Selected Specialties and details */}
            <div className="space-y-4 text-xs sm:text-sm text-text-muted">
              {/* Service name */}
              <div className="space-y-1">
                <span className="font-sans text-[10px] font-bold text-text-muted uppercase tracking-wider block">Servicio Solicitado:</span>
                <p className="font-serif text-base font-bold text-text-dark">{currentServiceObj.name}</p>
                <span className="font-sans text-xs text-primary font-medium block">55-60 mins | Camilla hidráulica portátil</span>
              </div>

              {/* Specialist */}
              <div className="space-y-1 border-t border-border-subtle/50 pt-3">
                <span className="font-sans text-[10px] font-bold text-text-muted uppercase tracking-wider block">Fisioterapeuta Técnico:</span>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md overflow-hidden bg-bg-base shrink-0 border border-border-subtle">
                    <img src={currentSpecialistObj.img} alt={currentSpecialistObj.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <p className="font-sans text-xs font-bold text-text-dark">{currentSpecialistObj.name}</p>
                </div>
              </div>

              {/* Sched timestamp */}
              {selectedDate && (
                <div className="space-y-1 border-t border-border-subtle/50 pt-3">
                  <span className="font-sans text-[10px] font-bold text-text-muted uppercase tracking-wider block">Fecha &amp; Hora Reservada:</span>
                  <div className="flex items-center gap-1.5 text-text-dark font-sans font-bold text-xs bg-bg-base px-2.5 py-1.5 rounded-lg border border-border-subtle/50 w-fit">
                    <CalendarIcon className="w-3.5 h-3.5 text-primary" />
                    <span>{selectedDate}</span>
                    <Clock className="w-3.5 h-3.5 text-primary ml-1" />
                    <span>{selectedTime} h</span>
                  </div>
                </div>
              )}

              {/* Patient brief address */}
              {address && (
                <div className="space-y-1 border-t border-border-subtle/50 pt-3">
                  <span className="font-sans text-[10px] font-bold text-text-muted uppercase tracking-wider block">Ubicación Asistencia (Teruel):</span>
                  <div className="flex items-start gap-1.5 text-text-dark text-xs font-semibold leading-relaxed">
                    <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{address} {postalCode && `(CP: ${postalCode})`}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="border-t border-border-subtle pt-4 space-y-2 text-xs sm:text-sm text-text-muted">
              <div className="flex justify-between">
                <span>Consulta Clínica a domicilio:</span>
                <span className="font-semibold text-text-dark">{formatPrice(basePrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Desplazamiento a Teruel comarca:</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Incluido (RD$ 0)</span>
              </div>
              <div className="flex justify-between font-sans">
                <span>Equipo higienizado desechable:</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Incluido (RD$ 0)</span>
              </div>

              {selectedPlanDiscount > 0 && (
                <div className="flex justify-between text-accent font-sans font-bold bg-accent-light/40 p-2 rounded-lg border border-accent/20">
                  <span>Descuento de Plan ({selectedPlanDiscount}%):</span>
                  <span>-{formatPrice(discountVal)}</span>
                </div>
              )}

              <div className="flex justify-between items-baseline pt-3 border-t border-border-subtle mt-4">
                <span className="font-sans text-sm font-bold text-text-dark">Total Sesión:</span>
                <span className="font-serif text-2xl font-extrabold text-primary">
                  {formatPrice(finalPrice)}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-bg-base border border-border-subtle rounded-xl flex gap-3 items-start shadow-sm">
            <Info className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
            <p className="font-sans text-xs text-text-muted leading-relaxed">
              <strong className="text-text-dark font-semibold">Política de Cancelación:</strong> ¿Te ha surgido un imprevisto? No hay problema, puedes cancelar o posponer tu cita de forma gratuita hasta 12 horas antes avisando por teléfono.
            </p>
          </div>
        </div>
      </div>

      {/* SUCCESS OVERLAY MODAL */}
      <AnimatePresence>
        {successBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-6 sm:p-10 max-w-xl w-full border border-border-subtle shadow-2xl relative text-center space-y-6"
            >
              <div className="w-16 h-16 bg-accent-light/80 text-accent-warm rounded-full mx-auto flex items-center justify-center scale-110 shadow-inner">
                <CheckCircle2 className="w-10 h-10 text-accent font-bold" />
              </div>

              <div className="space-y-2">
                <span className="font-sans text-xs font-bold text-accent uppercase tracking-wider block">
                  ¡Reserva Recibida de forma Exitosa!
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-primary leading-tight">
                  Tu cita ha sido agendada
                </h3>
                <div className="bg-bg-base/80 py-2 px-4 rounded-xl border border-border-subtle/40 inline-block font-sans text-xs sm:text-sm font-black text-text-dark tracking-wide">
                  Código de Reserva: <span className="text-primary">{successBooking.id}</span>
                </div>
              </div>

              <div className="border border-border-subtle rounded-2xl p-4 sm:p-5 bg-bg-base text-left font-sans text-xs sm:text-sm text-text-muted space-y-2 leading-relaxed">
                <div className="flex justify-between">
                  <span>Paciente:</span>
                  <strong className="text-text-dark">{firstName} {lastName}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Fisioterapeuta Técnico:</span>
                  <strong className="text-text-dark">{currentSpecialistObj.name}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Fecha y Hora:</span>
                  <strong className="text-text-dark">{selectedDate} a las {selectedTime} h</strong>
                </div>
                <div className="flex justify-between border-t border-border-subtle/50 pt-2 mt-2">
                  <span>Dirección Domicilio:</span>
                  <strong className="text-text-dark text-right max-w-xs">{address}</strong>
                </div>
              </div>

              <div className="space-y-4">
                <p className="font-sans text-xs sm:text-sm text-text-muted leading-relaxed">
                  Te hemos enviado un correo de confirmación con los pormenores a <strong>{email}</strong>. El Dr. Javier o el técnico asignado te llamará a tu móvil para formalizar los detalles clínicos del espinograma.
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleBackToStart}
                    className="w-full sm:w-auto bg-primary text-white hover:bg-primary-container font-sans text-sm font-bold px-8 py-3.5 rounded-xl transition-all cursor-pointer shadow-md inline-block"
                  >
                    Entendido, Volver al Inicio
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
