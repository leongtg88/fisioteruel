"use client";

import React, { useEffect, useRef, useState } from "react";
import { COMBOS_DATA, SERVICES_DATA } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import type { AdvancedBooking } from "@/lib/types";

interface BookingViewProps {
  /**
   * Servicio preseleccionado. Antes vivía en un `useState` de App.tsx; ahora
   * llega desde la URL (`/agendar?servicio=...`).
   */
  initialServiceId?: string;
}

const STORAGE_KEY = "fisioteruel_bookings";

/** Combine services and combos for the dropdown selection */
const ALL_OPTIONS = [
  ...SERVICES_DATA.map((s) => ({ id: s.id, name: s.name, price: s.price })),
  ...COMBOS_DATA.map((c) => ({
    id: c.id,
    name: `${c.name} (${c.tag})`,
    price: c.price,
  })),
];

const TIME_SLOTS: { value: string; label: string }[] = [
  { value: "morning_1", label: "Mañana (08:00 - 11:00)" },
  { value: "morning_2", label: "Mediodía (11:00 - 14:00)" },
  { value: "afternoon_1", label: "Tarde Temprana (15:00 - 18:00)" },
  { value: "afternoon_2", label: "Tarde Noche (18:00 - 20:00)" },
];

const CITIES = [
  "Teruel Capital",
  "Alcañiz",
  "Andorra (Teruel)",
  "Calamocha",
  "Cella",
  "Utrillas",
  "Monreal del Campo",
];

const TIME_LABELS: Record<string, string> = Object.fromEntries(
  TIME_SLOTS.map((slot) => [slot.value, slot.label])
);

// Seed initial mock booking to populate the screen beautifully with example data!
const SEEDED_BOOKINGS: AdvancedBooking[] = [
  {
    id: "bk-seeded-1",
    patientName: "María Amparo Gómez",
    patientPhone: "+34 670 123 456",
    patientEmail: "amparo@gomez.org",
    patientAddress: "Avenida de Sagunto, 14, 2ºB",
    patientCity: "Teruel Capital",
    serviceId: "eval-integral",
    bookingDate: "2026-06-15",
    bookingTime: "morning_2",
    additionalNotes:
      "Paciente post-operatorio de cadera derecha, requiere valoración inicial.",
    totalPrice: 5500,
    status: "confirmed",
  },
];

const inputClasses =
  "w-full bg-white/45 border border-white/60 rounded-xl p-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:bg-white/70 transition-all shadow-2xs";

const labelClasses =
  "block text-xs font-black text-slate-700 uppercase tracking-wider mb-2";

function getServiceName(id: string) {
  const match = ALL_OPTIONS.find((opt) => opt.id === id);
  return match ? match.name : "Servicio General de Fisioterapia";
}

function getTimeLabel(timeVal: string) {
  return TIME_LABELS[timeVal] ?? timeVal;
}

export default function BookingView({ initialServiceId }: BookingViewProps) {

  // Local state for form submission variables
  const [selectedServiceId, setSelectedServiceId] = useState(
    initialServiceId || "eval-integral"
  );
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientAddress, setPatientAddress] = useState("");
  const [patientCity, setPatientCity] = useState("Teruel Capital");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("afternoon_1");
  const [additionalNotes, setAdditionalNotes] = useState("");

  // Storage of booked appointments
  const [bookingsList, setBookingsList] = useState<AdvancedBooking[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastBookedInfo, setLastBookedInfo] = useState<AdvancedBooking | null>(
    null
  );
  const successTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load from local storage for durable persistence!
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setBookingsList(JSON.parse(saved) as AdvancedBooking[]);
      } catch (error) {
        console.error("Could not parse saved bookings", error);
      }
    } else {
      setBookingsList(SEEDED_BOOKINGS);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(SEEDED_BOOKINGS));
    }
  }, []);

  useEffect(
    () => () => {
      if (successTimer.current) clearTimeout(successTimer.current);
    },
    []
  );

  const saveBookingsToStorage = (updated: AdvancedBooking[]) => {
    setBookingsList(updated);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedOption =
      ALL_OPTIONS.find((opt) => opt.id === selectedServiceId) || ALL_OPTIONS[0];

    const newBooking: AdvancedBooking = {
      id: "bk-" + Date.now(),
      patientName,
      patientPhone,
      patientEmail: patientEmail || "no-email@fisioteruel.com",
      patientAddress,
      patientCity,
      serviceId: selectedOption.id,
      bookingDate,
      bookingTime,
      additionalNotes,
      totalPrice: selectedOption.price,
      status: "pending",
    };

    saveBookingsToStorage([newBooking, ...bookingsList]);

    // Set feedback states
    setLastBookedInfo(newBooking);
    setShowSuccess(true);

    // Reset fields smoothly
    setPatientName("");
    setPatientPhone("");
    setPatientEmail("");
    setPatientAddress("");
    setBookingDate("");
    setAdditionalNotes("");

    // Hide success alert after delay
    if (successTimer.current) clearTimeout(successTimer.current);
    successTimer.current = setTimeout(() => setShowSuccess(false), 10000);
  };

  const handleDeleteBooking = (id: string) => {
    const isConfirmed = window.confirm(
      "¿Seguro que deseas cancelar esta solicitud de cita a domicilio?"
    );
    if (isConfirmed) {
      saveBookingsToStorage(bookingsList.filter((b) => b.id !== id));
    }
  };

  return (
    <div className="animate-fade-in max-w-[1280px] mx-auto px-6 py-12 flex flex-col gap-12 relative z-10">
      {/* Visual Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary">
          <span className="material-symbols-outlined text-3xl font-light">
            calendar_month
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
          Agenda tu Sesión a Domicilio
        </h2>
        <p className="text-sm sm:text-base text-slate-700 font-bold leading-relaxed">
          Reserva de forma inmediata. Dinos qué tratamiento precisas, tus datos
          de contacto y la dirección en Teruel para asignar a tu fisioterapeuta
          diplomado.
        </p>
      </div>

      {/* Success Banner */}
      {showSuccess && lastBookedInfo && (
        <div
          role="status"
          className="bg-emerald-50/50 backdrop-blur-md border border-emerald-300 text-emerald-950 p-6 rounded-2xl shadow-md text-left max-w-3xl mx-auto flex items-start gap-4"
        >
          <span
            className="material-symbols-outlined text-3xl text-emerald-600 mt-0.5 select-none"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
          <div className="space-y-2">
            <h4 className="font-extrabold text-[#065f46] text-base">
              ¡Solicitud recibida correctamente!
            </h4>
            <div className="text-sm leading-relaxed space-y-1 text-slate-800 font-semibold">
              <p>
                Hemos registrado la cita para el paciente{" "}
                <strong className="text-emerald-950 font-black">
                  {lastBookedInfo.patientName}
                </strong>{" "}
                el día{" "}
                <strong className="text-emerald-950 font-black">
                  {lastBookedInfo.bookingDate}
                </strong>{" "}
                ({getTimeLabel(lastBookedInfo.bookingTime)}).
              </p>
              <p>
                Tu solicitud se encuentra en estado{" "}
                <span className="bg-amber-100/80 border border-amber-300 text-amber-800 px-2 py-0.5 rounded text-xs font-extrabold font-mono">
                  PENDIENTE DE REVISIÓN
                </span>
                . Nos pondremos en contacto telefónico contigo en un plazo máximo
                de 1 hora para confirmar la asignación del especialista.
              </p>
            </div>
            <p className="text-xs text-emerald-800/80 font-bold mt-2 font-mono">
              ID Cita: {lastBookedInfo.id}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Reservation Form Column */}
        <div className="lg:col-span-7 bg-white/45 backdrop-blur-md p-6 sm:p-10 rounded-[2rem] border border-white/55 shadow-md">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">
              edit_calendar
            </span>
            <span>Formulario de Reserva Directa</span>
          </h3>

          <form onSubmit={handleBookingSubmit} className="space-y-6">
            {/* Field: Service drop down selection */}
            <div>
              <label
                htmlFor="booking_form_service"
                className={labelClasses}
              >
                Tratamiento o Servicio Solicitado
              </label>
              <select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className={`${inputClasses} cursor-pointer`}
                id="booking_form_service"
              >
                {ALL_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name} — {formatPrice(opt.price)}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Field: Patient Name */}
              <div>
                <label htmlFor="booking_form_name" className={labelClasses}>
                  Nombre completo del paciente
                </label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Ej: Francisco Martínez Gómez"
                  className={inputClasses}
                  id="booking_form_name"
                />
              </div>

              {/* Field: Patient Phone */}
              <div>
                <label htmlFor="booking_form_phone" className={labelClasses}>
                  Número de teléfono móvil
                </label>
                <input
                  type="tel"
                  required
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  placeholder="Ej: +34 600 000 000"
                  className={inputClasses}
                  id="booking_form_phone"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Field: Patient Email (Optional) */}
              <div>
                <label htmlFor="booking_form_email" className={labelClasses}>
                  Email de contacto{" "}
                  <span className="text-slate-400 font-normal">(Opcional)</span>
                </label>
                <input
                  type="email"
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  placeholder="Ej: contacto@dominio.com"
                  className={inputClasses}
                  id="booking_form_email"
                />
              </div>

              {/* Field: Patient City / region */}
              <div>
                <label htmlFor="booking_form_city" className={labelClasses}>
                  Localidad / Delegación
                </label>
                <select
                  value={patientCity}
                  onChange={(e) => setPatientCity(e.target.value)}
                  className={`${inputClasses} cursor-pointer`}
                  id="booking_form_city"
                >
                  {CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Field: Patient Address */}
            <div>
              <label htmlFor="booking_form_address" className={labelClasses}>
                Dirección exacta a domicilio
              </label>
              <input
                type="text"
                required
                value={patientAddress}
                onChange={(e) => setPatientAddress(e.target.value)}
                placeholder="Calle, Número, Portal, Escalera, Piso, Puerta"
                className={inputClasses}
                id="booking_form_address"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Field: Date Picker */}
              <div>
                <label htmlFor="booking_form_date" className={labelClasses}>
                  Fecha preferente de la cita
                </label>
                <input
                  type="date"
                  required
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className={`${inputClasses} cursor-pointer`}
                  id="booking_form_date"
                />
              </div>

              {/* Field: Prefered Time slot */}
              <div>
                <label htmlFor="booking_form_time" className={labelClasses}>
                  Franja horaria preferida
                </label>
                <select
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className={`${inputClasses} cursor-pointer`}
                  id="booking_form_time"
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot.value} value={slot.value}>
                      {slot.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Field: Clinical Notes */}
            <div>
              <label htmlFor="booking_form_notes" className={labelClasses}>
                Notas clínicas adicionales o motivo de consulta
              </label>
              <textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Ej: Dolor lumbar severo continuo desde ayer, post-operatorio de prótesis de rodilla, tengo camilla propia en casa, etc."
                rows={3}
                className={inputClasses}
                id="booking_form_notes"
              ></textarea>
            </div>

            {/* Disclaimer policy */}
            <div className="flex items-start gap-2 py-1 text-slate-600 font-bold text-xs leading-relaxed">
              <span className="material-symbols-outlined text-primary text-sm mt-0.5 select-none font-black">
                info
              </span>
              <p className="text-[11px]">
                Al enviar la solicitud, declaras conocer que Fisioteruel enviará
                a un profesional a domicilio colegiado y de confianza. La cita es
                de confirmación telefónica directa previa.
              </p>
            </div>

            {/* Submit btn */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:bg-opacity-95 active:scale-[0.99] transition-transform cursor-pointer"
              id="booking_form_submit_btn"
            >
              Enviar Solicitud de Cita a Domicilio
            </button>
          </form>
        </div>

        {/* Active Appointments List Column */}
        <div className="lg:col-span-5 space-y-8 h-full">
          <div className="bg-white/35 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] border border-white/50 space-y-6 shadow-lg">
            <h4 className="font-serif text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined font-light text-primary">
                patient_list
              </span>
              <span>Tus Solicitudes Guardadas</span>
            </h4>

            <p className="text-xs text-slate-700 leading-relaxed font-bold">
              Esta lista se almacena en el navegador de forma local (
              <strong>Durable persistence</strong>). Aquí puedes consultar y
              gestionar el estado del terapeuta clínico asignado:
            </p>

            {bookingsList.length === 0 ? (
              <div className="bg-white/55 backdrop-blur-xs p-8 rounded-2xl text-center border border-dashed border-white/65 space-y-2">
                <span className="material-symbols-outlined text-4xl text-slate-400">
                  event_busy
                </span>
                <p className="text-xs text-slate-600 font-bold">
                  No posees citas activas solicitadas.
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                {bookingsList.map((bk) => (
                  <div
                    key={bk.id}
                    className="bg-white/55 backdrop-blur-sm p-4 rounded-2xl border border-white/50 shadow-xs space-y-3 relative group hover:bg-white/70 transition-all duration-300"
                  >
                    {/* Delete action */}
                    <button
                      onClick={() => handleDeleteBooking(bk.id)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-red-500 hover:scale-105 transition-all p-1 rounded cursor-pointer"
                      title="Cancelar esta cita"
                      id={`delete_booking_${bk.id}`}
                    >
                      <span className="material-symbols-outlined text-lg font-light">
                        delete
                      </span>
                    </button>

                    <div className="space-y-1">
                      {/* Status indicator style */}
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold font-mono tracking-wider ${
                          bk.status === "confirmed"
                            ? "bg-emerald-100 border border-emerald-300 text-emerald-800"
                            : "bg-amber-100 border border-amber-200 text-amber-800"
                        }`}
                      >
                        {bk.status === "confirmed"
                          ? "CONFIRMADO CLINICA"
                          : "PENDIENTE REVISIÓN"}
                      </span>

                      <h5 className="font-bold text-sm text-slate-900 pr-8">
                        {bk.patientName}
                      </h5>
                      <p className="text-xs text-primary font-bold">
                        {getServiceName(bk.serviceId)}
                      </p>
                    </div>

                    <div className="text-[11px] text-slate-700 leading-relaxed space-y-1 border-t border-white/30 pt-2 font-semibold">
                      <p className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-slate-500 text-sm select-none">
                          calendar_today
                        </span>
                        <span>{bk.bookingDate}</span>
                      </p>
                      <p className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-slate-500 text-sm select-none">
                          schedule
                        </span>
                        <span>{getTimeLabel(bk.bookingTime)}</span>
                      </p>
                      <p className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-slate-500 text-sm select-none">
                          pin_drop
                        </span>
                        <span className="truncate max-w-[210px]">
                          {bk.patientAddress}, {bk.patientCity}
                        </span>
                      </p>
                    </div>

                    <div className="bg-white/60 p-2 rounded text-[11px] text-slate-800 border border-white/50 font-bold flex justify-between items-center">
                      <span>Precio estimado:</span>
                      <strong className="text-primary font-extrabold">
                        {formatPrice(bk.totalPrice)}
                      </strong>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick FAQ info block */}
          <div className="bg-white/45 backdrop-blur-md p-6 rounded-[2rem] border border-white/50 shadow-md space-y-4">
            <h5 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base font-black">
                forum
              </span>
              <span>Preguntas Frecuentes de Agenda</span>
            </h5>
            <div className="text-xs text-slate-700 leading-relaxed space-y-3 font-semibold">
              <div>
                <p className="font-bold text-primary mb-1">
                  ¿Qué ocurre tras enviar el formulario?
                </p>
                <p>
                  Nuestra central clínica en Teruel verifica la disponibilidad
                  del fisioterapeuta óptimo para tu lesión y te llamamos en un
                  máximo de una hora para confirmar la reserva exactitud.
                </p>
              </div>
              <div>
                <p className="font-bold text-primary mb-1">
                  ¿Cómo puedo pagar la sesión?
                </p>
                <p>
                  Puedes pagar directamente en efectivo al fisioterapeuta el día
                  de la sesión, mediante Bizum corporativo, o mediante tarjeta de
                  débito/crédito autorizada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
