import Link from "next/link";
import { NAV_ITEMS, ROUTES } from "@/lib/nav";
import { CONTACT_DATA, SCHEDULE_DATA } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-lead text-slate-300 border-t border-primary/20 py-12 px-6 relative z-10">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand/About Col */}
        <div className="flex flex-col gap-3 max-w-sm">
          <div className="font-serif text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="w-8 h-8 bg-primary/25 rounded-lg flex items-center justify-center">
              <span
                className="material-symbols-outlined text-lg text-sky-200"
                aria-hidden="true"
              >
                physical_therapy
              </span>
            </span>
            <span className="font-sans font-extrabold uppercase text-base tracking-tight text-white">
              Fisio<span className="text-accent">teruel</span>
            </span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed font-semibold">
            Llevamos la fisioterapia, los masajes terapéuticos y el bienestar
            directamente a tu domicilio en Santo Domingo, promoviendo salud,
            autonomía y equilibrio.
          </p>
          <p className="text-xs text-slate-400 font-bold mt-2">
            © 2026 Fisioteruel &amp; Wellness. Santo Domingo, RD.
          </p>
        </div>

        {/* Links Col */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-black text-accent tracking-wider uppercase">
            Enlaces rápidos
          </span>
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={ROUTES[item.key]}
                className="text-left text-sm text-slate-300 font-semibold hover:text-accent transition-colors"
                id={`footer_link_${item.key}`}
              >
                {item.drawerLabel}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Col */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-black text-accent tracking-wider uppercase">
            Contacto
          </span>
          <p className="text-sm text-slate-300 font-semibold flex items-center gap-2">
            <span
              className="material-symbols-outlined text-slate-400 text-lg"
              aria-hidden="true"
            >
              pin_drop
            </span>
            <span>{CONTACT_DATA.address}</span>
          </p>
          <p className="text-sm text-slate-300 font-semibold flex items-center gap-2">
            <span
              className="material-symbols-outlined text-slate-400 text-lg"
              aria-hidden="true"
            >
              call
            </span>
            <a
              href={CONTACT_DATA.phoneHref}
              className="hover:text-accent transition-colors"
            >
              {CONTACT_DATA.phone}
            </a>
          </p>
          <div className="flex flex-col gap-1 mt-2 text-xs text-slate-400 font-semibold">
            {SCHEDULE_DATA.map((block) => (
              <p key={block.days}>
                <span className="text-slate-300">{block.daysShort}:</span>{" "}
                {block.hours}
                {block.note ? ` (${block.note.toLowerCase()})` : ""}
              </p>
            ))}
          </div>

          <div className="flex gap-3 mt-2">
            <a
              className="text-slate-200 hover:text-white transition-colors bg-white/10 p-2.5 rounded-full border border-white/15 flex items-center justify-center hover:bg-primary"
              href={`mailto:${CONTACT_DATA.email}`}
              aria-label="Escríbenos por correo electrónico"
              id="footer_email_action"
            >
              <span
                className="material-symbols-outlined text-lg"
                aria-hidden="true"
              >
                alternate_email
              </span>
            </a>
            <a
              className="text-slate-200 hover:text-white transition-colors bg-white/10 p-2.5 rounded-full border border-white/15 flex items-center justify-center hover:bg-primary"
              href={CONTACT_DATA.phoneHref}
              aria-label="Llámanos por teléfono"
              id="footer_phone_action"
            >
              <span
                className="material-symbols-outlined text-lg"
                aria-hidden="true"
              >
                phone_iphone
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
