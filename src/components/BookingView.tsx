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
  { value: "afternoon_1", label: "Tarde (3:00 - 5:00 p. m.)" },
  { value: "afternoon_2", label: "Tarde-noche (5:00 - 7:00 p. m.)" },
  { value: "evening", label: "Noche (7:30 - 10:00 p. m.)" },
  { value: "weekend", label: "Fin de semana (previa coordinación)" },
];

const CITIES = [
  "Distrito Nacional",
  "Santo Domingo Este",
  "Santo Domingo Oeste",
  "Santo Domingo Norte",
  "Boca Chica",
  "Los Alcarrizos",
  "Pedro Brand",
];

const TIME_LABELS: Record<string, string> = Object.fromEntries(
  TIME_SLOTS.map((slot) => [slot.value, slot.label])
);

// Seed initial mock booking to populate the screen beautifully with example data!
const SEEDED_BOOKINGS: AdvancedBooking[] = [
  {
    id: "bk-seeded-1",
    patientName: "María Amparo Gómez",
    patientPhone: "+1 809 670 1234",
    patientEmail: "amparo@gomez.org",
    patientAddress: "Calle 27 de Febrero 123, apto 4B",
    patientCity: "Distrito Nacional",
    serviceId: "eval-fisio",
    bookingDate: "2026-11-16",
    bookingTime: "afternoon_1",
    additionalNotes:
      "Paciente post-operatorio de cadera derecha, requiere valoración inicial.",
    totalPrice: 5500,
    status: "confirmed",
  },
];

const inputClasses =
  "w-full bg-white border border-border-subtle rounded-xl p-3 text-sm font-semibold text-lead focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 transition-colors";

const labelClasses =
  "block text-xs font-black text-lead-muted uppercase tracking-wider mb-2";

function getServiceName(id: string) {
  const match = ALL_OPTIONS.find((opt) => opt.id === id);
  return match ? match.name : "Servicio de fisioterapia";
}

function getTimeLabel(timeVal: string) {
  return TIME_LABELS[timeVal] ?? timeVal;
}

const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

function formatBookingDate(isoDate: string) {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) return isoDate;
  return dateFormatter.format(new Date(year, month - 1, day));
}

export default function BookingView({ initialServiceId }: BookingViewProps) {

  // Local state for form submission variables
  const [selectedServiceId, setSelectedServiceId] = useState(
    initialServiceId || "eval-fisio"
  );
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientAddress, setPatientAddress] = useState("");
  const [patientCity, setPatientCity] = useState("Distrito Nacional");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("afternoon_1");
  const [additionalNotes, setAdditionalNotes] = useState("");

  // Storage of booked appointments
  const [bookingsList, setBookingsList] = useState<AdvancedBooking[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastBookedInfo, setLastBookedInfo] = useState<AdvancedBooking | null>(
    null
  );
  const [pendingDelete, setPendingDelete] = useState<AdvancedBooking | null>(
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

  // Confirmación de borrado: Escape y scroll bloqueado.
  useEffect(() => {
    if (!pendingDelete) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPendingDelete(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [pendingDelete]);

  // Aviso si se cierra la pestaña con una solicitud a medio rellenar.
  useEffect(() => {
    const hasPatientData = Boolean(
      patientName || patientPhone || patientEmail || patientAddress
    );
    if (!hasPatientData || showSuccess) return;

    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [
    patientName,
    patientPhone,
    patientEmail,
    patientAddress,
    showSuccess,
  ]);

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
    const target = bookingsList.find((booking) => booking.id === id);
    if (target) setPendingDelete(target);
  };

  const confirmDeleteBooking = () => {
    if (!pendingDelete) return;
    saveBookingsToStorage(bookingsList.filter((b) => b.id !== pendingDelete.id));
    setPendingDelete(null);
  };

  return (
    <div className="animate-fade-in max-w-[1280px] mx-auto px-6 py-12 flex flex-col gap-12 relative z-10">
      {/* Visual Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="w-12 h-12 bg-primary-soft rounded-2xl flex items-center justify-center mx-auto text-primary-strong">
          <span
            className="material-symbols-outlined text-3xl"
            aria-hidden="true"
          >
            calendar_month
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-text-dark">
          Agenda tu sesión a domicilio
        </h1>
        <p className="text-sm sm:text-base text-lead-muted font-semibold leading-relaxed">
          Reserva de forma inmediata. Dinos qué tratamiento precisas, tus datos
          de contacto y la dirección en Santo Domingo para asignar a tu
          profesional.
        </p>
      </div>

      {/* Success Banner */}
      {showSuccess && lastBookedInfo && (
        <div
          role="status"
          aria-live="polite"
          className="bg-primary-soft border border-primary/30 text-primary-deep p-6 rounded-2xl shadow-md text-left max-w-3xl mx-auto flex items-start gap-4"
        >
          <span
            className="material-symbols-outlined text-3xl text-primary-strong mt-0.5 select-none"
            style={{ fontVariationSettings: "'FILL' 1" }}
            aria-hidden="true"
          >
            check_circle
          </span>
          <div className="space-y-2">
            <h2 className="font-extrabold text-primary-deep text-base">
              ¡Solicitud recibida correctamente!
            </h2>
            <div className="text-sm leading-relaxed space-y-1 text-lead font-semibold">
              <p>
                Hemos registrado la cita para el paciente{" "}
                <strong className="text-text-dark font-black">
                  {lastBookedInfo.patientName}
                </strong>{" "}
                el día{" "}
                <strong className="text-text-dark font-black">
                  {formatBookingDate(lastBookedInfo.bookingDate)}
                </strong>{" "}
                ({getTimeLabel(lastBookedInfo.bookingTime)}).
              </p>
              <p>
                Tu solicitud se encuentra en estado{" "}
                <span className="bg-accent-soft border border-accent text-accent-text px-2 py-0.5 rounded text-xs font-extrabold">
                  PENDIENTE DE REVISIÓN
                </span>
                . Nos pondremos en contacto telefónico contigo en un plazo máximo
                de 1 hora para confirmar la asignación del especialista.
              </p>
            </div>
            <p className="text-xs text-lead-muted font-bold mt-2">
              ID de cita: {lastBookedInfo.id}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Reservation Form Column */}
        <div className="lg:col-span-7 bg-white/80 backdrop-blur-md p-6 sm:p-10 rounded-[2rem] border border-border-subtle shadow-md">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-text-dark mb-6 flex items-center gap-3">
            <span
              className="material-symbols-outlined text-primary-strong"
              aria-hidden="true"
            >
              edit_calendar
            </span>
            <span>Formulario de reserva directa</span>
          </h2>

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
                name="servicio"
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
                  name="nombre"
                  autoComplete="name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Ej. Francisco Martínez Gómez…"
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
                  name="telefono"
                  autoComplete="tel"
                  inputMode="tel"
                  spellCheck={false}
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  placeholder="Ej. +1 809 000 0000…"
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
                  <span className="text-lead-muted font-normal">(Opcional)</span>
                </label>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  spellCheck={false}
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  placeholder="Ej. contacto@dominio.com…"
                  className={inputClasses}
                  id="booking_form_email"
                />
              </div>

              {/* Field: Patient City / region */}
              <div>
                <label htmlFor="booking_form_city" className={labelClasses}>
                  Sector / Municipio
                </label>
                <select
                  name="localidad"
                  autoComplete="address-level2"
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
                name="direccion"
                  autoComplete="street-address"
                  value={patientAddress}
                onChange={(e) => setPatientAddress(e.target.value)}
                placeholder="Calle, número, portal, escalera, piso, puerta…"
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
                  name="fecha"
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
                  name="franja"
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
                name="notas"
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Ej. dolor lumbar continuo desde ayer, post-operatorio de rodilla, tengo camilla en casa…"
                rows={3}
                className={inputClasses}
                id="booking_form_notes"
              ></textarea>
            </div>

            {/* Disclaimer policy */}
            <div className="flex items-start gap-2 py-1 text-lead-muted font-bold text-xs leading-relaxed">
              <span
                className="material-symbols-outlined text-primary-strong text-sm mt-0.5 select-none"
                aria-hidden="true"
              >
                info
              </span>
              <p className="text-xs">
                Al enviar la solicitud, declaras conocer que Fisioteruel enviará
                a un profesional a domicilio de confianza. La cita es de
                confirmación telefónica directa previa.
              </p>
            </div>

            {/* Submit btn */}
            <button
              type="submit"
              className="w-full bg-primary-strong text-white py-4 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary-deep hover:shadow-xl transition-colors cursor-pointer"
              id="booking_form_submit_btn"
            >
              Enviar solicitud de cita a domicilio
            </button>
          </form>
        </div>

        {/* Active Appointments List Column */}
        <div className="lg:col-span-5 space-y-8 h-full">
          <div className="bg-white/80 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] border border-border-subtle space-y-6 shadow-lg">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-text-dark flex items-center gap-2">
              <span
                className="material-symbols-outlined text-primary-strong"
                aria-hidden="true"
              >
                patient_list
              </span>
              <span>Tus solicitudes guardadas</span>
            </h2>

            <p className="text-xs text-lead-muted leading-relaxed font-semibold">
              Esta lista se guarda únicamente en el almacenamiento local de este
              navegador. Aquí puedes consultar y gestionar el estado del
              terapeuta clínico asignado:
            </p>

            {bookingsList.length === 0 ? (
              <div className="bg-bg-base p-8 rounded-2xl text-center border border-dashed border-border-subtle space-y-2">
                <span
                  className="material-symbols-outlined text-4xl text-slate-400"
                  aria-hidden="true"
                >
                  event_busy
                </span>
                <p className="text-xs text-lead-muted font-bold">
                  No tienes citas activas solicitadas.
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                {bookingsList.map((bk) => (
                  <div
                    key={bk.id}
                    className="bg-white p-4 rounded-2xl border border-border-subtle shadow-sm space-y-3 relative group hover:shadow-md transition-shadow duration-300"
                  >
                    {/* Delete action */}
                    <button
                      type="button"
                      onClick={() => handleDeleteBooking(bk.id)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-red-600 transition-colors p-1 rounded cursor-pointer"
                      aria-label={`Cancelar la cita de ${bk.patientName}`}
                      id={`delete_booking_${bk.id}`}
                    >
                      <span
                        className="material-symbols-outlined text-lg"
                        aria-hidden="true"
                      >
                        delete
                      </span>
                    </button>

                    <div className="space-y-1">
                      {/* Status indicator style */}
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded text-xs font-bold tracking-wider ${
                          bk.status === "confirmed"
                            ? "bg-primary-soft border border-primary/30 text-primary-deep"
                            : "bg-accent-soft border border-accent text-accent-text"
                        }`}
                      >
                        {bk.status === "confirmed"
                          ? "CONFIRMADA"
                          : "PENDIENTE DE REVISIÓN"}
                      </span>

                      <h3 className="font-bold text-sm text-text-dark pr-8">
                        {bk.patientName}
                      </h3>
                      <p className="text-xs text-primary-strong font-bold">
                        {getServiceName(bk.serviceId)}
                      </p>
                    </div>

                    <div className="text-xs text-lead-muted leading-relaxed space-y-1 border-t border-border-subtle pt-2 font-semibold tabular">
                      <p className="flex items-center gap-1">
                        <span
                          className="material-symbols-outlined text-slate-400 text-sm select-none"
                          aria-hidden="true"
                        >
                          calendar_today
                        </span>
                        <span>{formatBookingDate(bk.bookingDate)}</span>
                      </p>
                      <p className="flex items-center gap-1">
                        <span
                          className="material-symbols-outlined text-slate-400 text-sm select-none"
                          aria-hidden="true"
                        >
                          schedule
                        </span>
                        <span>{getTimeLabel(bk.bookingTime)}</span>
                      </p>
                      <p className="flex items-center gap-1">
                        <span
                          className="material-symbols-outlined text-slate-400 text-sm select-none"
                          aria-hidden="true"
                        >
                          pin_drop
                        </span>
                        <span className="truncate max-w-[210px]">
                          {bk.patientAddress}, {bk.patientCity}
                        </span>
                      </p>
                    </div>

                    <div className="bg-bg-base p-2 rounded text-xs text-text-dark border border-border-subtle font-bold flex justify-between items-center tabular">
                      <span>Precio estimado:</span>
                      <strong className="text-primary-strong font-extrabold">
                        {formatPrice(bk.totalPrice)}
                      </strong>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick FAQ info block */}
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-[2rem] border border-border-subtle shadow-md space-y-4">
            <h2 className="font-bold text-sm text-text-dark flex items-center gap-2">
              <span
                className="material-symbols-outlined text-primary-strong text-base"
                aria-hidden="true"
              >
                forum
              </span>
              <span>Preguntas frecuentes de agenda</span>
            </h2>
            <div className="text-xs text-lead-muted leading-relaxed space-y-3 font-semibold">
              <div>
                <p className="font-bold text-primary-deep mb-1">
                  ¿Qué ocurre tras enviar el formulario?
                </p>
                <p>
                  Nuestro equipo en Santo Domingo verifica la disponibilidad del
                  profesional óptimo para tu servicio y te llamamos en un máximo
                  de una hora para confirmar la reserva.
                </p>
              </div>
              <div>
                <p className="font-bold text-primary-deep mb-1">
                  ¿Cómo puedo pagar la sesión?
                </p>
                <p>
                  Puedes pagar directamente en efectivo al profesional el día de
                  la sesión, mediante transferencia bancaria o con tarjeta de
                  débito/crédito autorizada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmación de cancelación (sustituye a window.confirm) */}
      {pendingDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete_booking_title"
            className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full border border-border-subtle shadow-2xl space-y-4"
          >
            <h2 id="delete_booking_title" className="font-serif text-xl font-bold text-text-dark">
              ¿Cancelar esta solicitud?
            </h2>
            <p className="text-sm text-lead-muted leading-relaxed">
              Se eliminará la cita de{" "}
              <strong className="text-text-dark">{pendingDelete.patientName}</strong>{" "}
              del {formatBookingDate(pendingDelete.bookingDate)}. Esta acción no se
              puede deshacer.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                autoFocus
                onClick={() => setPendingDelete(null)}
                className="flex-1 border border-border-subtle bg-white text-text-dark font-bold text-sm py-2.5 rounded-xl hover:bg-bg-base transition-colors"
              >
                Conservar cita
              </button>
              <button
                type="button"
                onClick={confirmDeleteBooking}
                className="flex-1 bg-red-600 text-white font-bold text-sm py-2.5 rounded-xl hover:bg-red-700 transition-colors"
              >
                Cancelar cita
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
