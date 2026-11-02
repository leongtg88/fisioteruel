export type ServiceCategory = "fisioterapia" | "masajes";

export type BookableCategory = ServiceCategory | "combos";

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ServiceCategory;
  duration: number; // in minutes
  icon: string;
  badge?: string;
  details?: string[];
}

export interface ComboItem {
  id: string;
  name: string;
  tag: string;
  description: string;
  price: number;
  icon: string;
  includes: string[];
}

export interface ExtraItem {
  id: string;
  name: string;
  description: string;
  individualPrice: number;
  addOnPrice: number;
  icon: string;
}

export interface ScheduleBlock {
  days: string;
  daysShort: string;
  hours: string;
  note?: string;
  /** Días de la semana de JS (0 = domingo) con reserva online. */
  onlineDays: number[];
  /** Horas de inicio disponibles para reservar online. */
  slots: string[];
}

export interface BookableService {
  id: string;
  name: string;
  price: number;
  category: BookableCategory;
  duration: number;
  icon: string;
}

export interface AdvancedBooking {
  id: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  patientAddress: string;
  patientCity: string;
  serviceId: string;
  bookingDate: string;
  bookingTime: string;
  additionalNotes?: string;
  totalPrice: number;
  status: "pending" | "confirmed" | "completed";
}
