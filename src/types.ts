export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "fisioterapia" | "masajes";
  duration: number; // in minutes
  icon: string;
  badge?: string;
  details?: string[];
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

export type ScreenType = "inicio" | "servicios" | "agendar" | "descargar";
