"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV_ITEMS, ROUTES, routeKeyFromPathname } from "@/lib/nav";
import { CONTACT_DATA } from "@/lib/data";

export default function Header() {
  const pathname = usePathname();
  const currentRoute = routeKeyFromPathname(pathname);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  // El drawer debe cerrarse al cambiar de ruta.
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Diálogo modal: Escape, foco atrapado, scroll bloqueado y foco devuelto.
  useEffect(() => {
    if (!mobileMenuOpen) return;

    previousFocus.current = document.activeElement as HTMLElement | null;
    const drawer = drawerRef.current;
    const closeButton = drawer?.querySelector<HTMLElement>(
      "[data-drawer-close]"
    );
    closeButton?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        return;
      }
      if (event.key !== "Tab" || !drawer) return;

      const focusable = Array.from(
        drawer.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
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
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus.current?.focus();
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="bg-white/85 backdrop-blur-xl border-b border-border-subtle sticky top-0 z-50 w-full">
        <nav
          aria-label="Navegación principal"
          className="flex justify-between items-center w-full px-6 py-3.5 max-w-[1280px] mx-auto"
        >
          {/* Logo & Mobile Menu Trigger */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-primary-strong hover:text-primary-deep transition-colors p-1.5 rounded-lg"
              aria-label="Abrir menú"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile_drawer"
              id="header_menu_btn"
            >
              <span
                className="material-symbols-outlined text-2xl"
                aria-hidden="true"
              >
                menu
              </span>
            </button>
            <Link
              href={ROUTES.inicio}
              className="font-serif text-2xl font-bold text-lead tracking-tight flex items-center gap-2 hover:opacity-90 transition-opacity text-left"
              id="header_logo"
            >
              <span className="w-9 h-9 bg-primary-soft rounded-xl flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-2xl text-primary-strong"
                  aria-hidden="true"
                >
                  physical_therapy
                </span>
              </span>
              <span className="font-sans font-extrabold uppercase text-base sm:text-lg tracking-tight text-text-dark">
                Fisio
                <span className="text-primary-strong font-extrabold">
                  teruel
                </span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {NAV_ITEMS.map((item) => {
              const isActive = currentRoute === item.key;
              return (
                <Link
                  key={item.key}
                  href={ROUTES[item.key]}
                  aria-current={isActive ? "page" : undefined}
                  className={`font-bold text-sm tracking-wide transition-colors py-1.5 border-b-2 cursor-pointer ${
                    isActive
                      ? "text-primary-strong border-primary-strong"
                      : "text-lead-muted border-transparent hover:text-primary-strong hover:border-primary/40"
                  }`}
                  id={`nav_${item.key}_btn`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right action: CTA */}
          <div className="flex items-center gap-4 shrink-0">
            <Link
              href={ROUTES.agendar}
              className="bg-primary-strong text-white px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold tracking-wide hover:bg-primary-deep transition-colors shadow-md shadow-primary/15 hover:shadow-lg hover:shadow-primary/20 whitespace-nowrap"
              id="header_agendar_pillo"
            >
              <span className="sm:hidden">Reservar</span>
              <span className="hidden sm:inline">Reservar cita</span>
            </Link>
          </div>
        </nav>
      </header>

      {/* Overlay del drawer */}
      {mobileMenuOpen && (
        <button
          type="button"
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-900/50 z-[90] cursor-default overscroll-contain"
          aria-label="Cerrar menú"
          tabIndex={-1}
          id="drawer_overlay"
        />
      )}

      {/* Mobile navigation drawer */}
      <aside
        ref={drawerRef}
        className={`fixed inset-y-0 left-0 z-[100] flex flex-col bg-white border-r border-border-subtle rounded-r-2xl h-full w-80 shadow-2xl transition-transform duration-300 transform ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        id="mobile_drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        aria-hidden={!mobileMenuOpen}
        inert={!mobileMenuOpen}
      >
        <div className="p-6 flex flex-col h-full overscroll-contain">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-border-subtle">
            <span className="font-serif text-2xl font-bold text-primary-strong tracking-tight flex items-center gap-2">
              <span
                className="material-symbols-outlined text-[1.75rem]"
                aria-hidden="true"
              >
                physical_therapy
              </span>
              <span>Fisioteruel</span>
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lead-muted hover:text-text-dark p-1 rounded-lg"
              aria-label="Cerrar menú"
              data-drawer-close
              id="drawer_close_btn"
            >
              <span
                className="material-symbols-outlined text-2xl"
                aria-hidden="true"
              >
                close
              </span>
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
                  className={`w-full py-3 px-4 rounded-xl flex items-center gap-4 text-sm font-bold transition-colors text-left ${
                    isActive
                      ? "bg-primary-soft text-primary-deep"
                      : "text-lead-muted hover:bg-bg-base hover:text-primary-deep"
                  }`}
                  id={`drawer_nav_${item.key}`}
                >
                  <span
                    className="material-symbols-outlined"
                    aria-hidden="true"
                  >
                    {item.drawerIcon}
                  </span>
                  <span>{item.drawerLabel}</span>
                </Link>
              );
            })}
          </div>

          {/* Drawer footer info */}
          <div className="mt-auto pt-6 border-t border-border-subtle flex flex-col gap-4">
            <div className="flex flex-col gap-1 text-center">
              <span className="text-xs text-lead-muted font-semibold">
                Llámanos directamente:
              </span>
              <a
                href={CONTACT_DATA.phoneHref}
                className="text-primary-strong font-bold text-base hover:text-primary-deep hover:underline"
              >
                {CONTACT_DATA.phone}
              </a>
            </div>

            <div className="bg-bg-base rounded-xl p-3 text-center border border-border-subtle">
              <span className="text-xs text-lead-muted leading-relaxed">
                Fisioterapia y bienestar a domicilio en Santo Domingo, RD.
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
