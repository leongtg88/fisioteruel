"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_ITEMS, ROUTES, routeKeyFromPathname } from "@/lib/nav";

export default function Header() {
  const pathname = usePathname();
  const currentRoute = routeKeyFromPathname(pathname);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // El drawer debe cerrarse al cambiar de ruta.
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="bg-white/45 backdrop-blur-md shadow-xs sticky top-0 z-50 w-full border-b border-white/20">
        <nav className="flex justify-between items-center w-full px-6 py-3.5 max-w-[1280px] mx-auto">
          {/* Logo & Mobile Menu Trigger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-primary hover:opacity-80 transition-opacity p-1 focus:ring-2 focus:ring-primary/20 rounded"
              aria-label="Abrir menú"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile_drawer"
              id="header_menu_btn"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
            <Link
              href={ROUTES.inicio}
              className="font-serif text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2 hover:opacity-90 transition-opacity text-left"
              id="header_logo"
            >
              <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-2xl text-primary font-light">
                  physical_therapy
                </span>
              </div>
              <span className="font-sans font-extrabold uppercase text-lg tracking-tight text-slate-900">
                Fisio<span className="text-primary font-bold">teruel</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => {
              const isActive = currentRoute === item.key;
              return (
                <Link
                  key={item.key}
                  href={ROUTES[item.key]}
                  aria-current={isActive ? "page" : undefined}
                  className={`font-semibold text-sm tracking-wide transition-all py-1.5 border-b-2 cursor-pointer ${
                    isActive
                      ? "text-primary border-primary font-bold"
                      : "text-slate-600 border-transparent hover:text-primary hover:border-primary/40"
                  }`}
                  id={`nav_${item.key}_btn`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right action: CTA */}
          <div className="flex items-center gap-4">
            <Link
              href={ROUTES.agendar}
              className="bg-primary text-white px-5 py-2.5 rounded-full text-xs font-bold tracking-wide hover:bg-primary/90 transition-all shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-px active:translate-y-0"
              id="header_agendar_pillo"
            >
              Reservar cita
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile drawer overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/40 z-[90] transition-opacity duration-300"
          id="drawer_overlay"
        />
      )}

      {/* Mobile navigation drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-[100] flex flex-col bg-[#FDFCF8] rounded-r-2xl h-full w-80 shadow-2xl transition-transform duration-300 transform ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        id="mobile_drawer"
        aria-hidden={!mobileMenuOpen}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
            <span className="font-serif text-2xl font-bold text-primary tracking-tight flex items-center gap-2">
              <span className="material-symbols-outlined text-[1.75rem] font-light">
                physical_therapy
              </span>
              <span>Fisioteruel</span>
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#424653] hover:text-black p-1 focus:ring-2 focus:ring-primary/20 rounded"
              aria-label="Cerrar menú"
              id="drawer_close_btn"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = currentRoute === item.key;
              return (
                <Link
                  key={item.key}
                  href={ROUTES[item.key]}
                  aria-current={isActive ? "page" : undefined}
                  className={`w-full py-3 px-4 rounded-xl flex items-center gap-4 text-sm font-semibold transition-colors text-left ${
                    isActive
                      ? "bg-[#e9edff] text-[#2f4b85]"
                      : "text-on-surface-variant hover:bg-slate-50"
                  }`}
                  id={`drawer_nav_${item.key}`}
                >
                  <span className="material-symbols-outlined">
                    {item.drawerIcon}
                  </span>
                  <span>{item.drawerLabel}</span>
                </Link>
              );
            })}
          </div>

          {/* Drawer footer info */}
          <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col gap-4">
            <div className="flex flex-col gap-1 text-center">
              <span className="text-xs text-on-surface-variant font-medium">
                Llámanos directamente:
              </span>
              <a
                href="tel:+34978000000"
                className="text-primary font-bold text-base hover:underline"
              >
                +34 978 000 000
              </a>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 text-center border border-gray-100">
              <span className="text-[11px] text-on-surface-variant leading-relaxed">
                Fisioterapia Premium en la provincia de Teruel, España.
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
