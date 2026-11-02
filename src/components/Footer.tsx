import Link from "next/link";
import { NAV_ITEMS, ROUTES } from "@/lib/nav";

export default function Footer() {
  return (
    <footer className="bg-white/40 backdrop-blur-md border-t border-white/25 py-12 px-6 relative z-10">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-slate-800">
        {/* Brand/About Col */}
        <div className="flex flex-col gap-3 max-w-sm">
          <span className="font-serif text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-lg text-primary font-light">
                physical_therapy
              </span>
            </div>
            <span className="font-sans font-extrabold uppercase text-base tracking-tight text-slate-900">
              Fisio<span className="text-primary font-bold">teruel</span>
            </span>
          </span>
          <p className="text-sm text-slate-700 leading-relaxed font-semibold">
            Llevamos la excelencia de la terapia física y rehabilitación
            directamente a tu domicilio, promoviendo salud, autonomía y
            bienestar integral en Teruel Capital y localidades cercanas.
          </p>
          <p className="text-xs text-slate-500 font-extrabold mt-2">
            © 2026 Fisioteruel &amp; Wellness. Teruel, España.
          </p>
        </div>

        {/* Links Col */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-black text-primary tracking-wider uppercase">
            Enlaces Rápidos
          </span>
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={ROUTES[item.key]}
                className="text-left text-sm text-slate-600 font-semibold hover:text-primary transition-colors"
                id={`footer_link_${item.key}`}
              >
                {item.drawerLabel}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Col */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-black text-primary tracking-wider uppercase">
            Contacto
          </span>
          <p className="text-sm text-slate-700 font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-slate-500 text-lg">
              pin_drop
            </span>
            <span>Av. de Sagunto, Teruel, España</span>
          </p>
          <p className="text-sm text-slate-700 font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-slate-500 text-lg">
              call
            </span>
            <span>+34 978 000 000</span>
          </p>

          <div className="flex gap-3 mt-2">
            <a
              className="text-slate-600 hover:text-primary transition-colors bg-white/60 backdrop-blur-xs p-2.5 rounded-full shadow-xs border border-white/40 flex items-center justify-center"
              href="mailto:contacto@fisioteruel.com"
              title="Escríbenos por correo"
              id="footer_email_action"
            >
              <span className="material-symbols-outlined text-lg">
                alternate_email
              </span>
            </a>
            <a
              className="text-slate-600 hover:text-primary transition-colors bg-white/60 backdrop-blur-xs p-2.5 rounded-full shadow-xs border border-white/40 flex items-center justify-center"
              href="tel:+34978000000"
              title="Llámanos por teléfono"
              id="footer_phone_action"
            >
              <span className="material-symbols-outlined text-lg">
                phone_iphone
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
