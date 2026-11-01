import { ScreenType } from "../types";

interface HeaderProps {
  currentScreen: ScreenType;
  setScreen: (screen: ScreenType) => void;
  currency: "EUR" | "DOP";
  setCurrency: (currency: "EUR" | "DOP") => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Header({
  currentScreen,
  setScreen,
  currency,
  setCurrency,
  mobileMenuOpen,
  setMobileMenuOpen
}: HeaderProps) {
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
              id="header_menu_btn"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
            <button
              onClick={() => {
                setScreen("inicio");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="font-serif text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2 hover:opacity-90 transition-opacity text-left cursor-pointer"
              id="header_logo"
            >
              <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-2xl text-primary font-light">physical_therapy</span>
              </div>
              <span className="font-sans font-extrabold uppercase text-lg tracking-tight text-slate-900">
                Fisio<span className="text-primary font-bold">teruel</span>
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => {
                setScreen("inicio");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`font-semibold text-sm tracking-wide transition-all py-1.5 cursor-pointer border-b-2 ${
                currentScreen === "inicio"
                  ? "text-primary border-primary font-bold"
                  : "text-slate-600 border-transparent hover:text-primary hover:border-primary/40"
              }`}
              id="nav_inicio_btn"
            >
              Inicio
            </button>
            <button
              onClick={() => {
                setScreen("servicios");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`font-semibold text-sm tracking-wide transition-all py-1.5 cursor-pointer border-b-2 ${
                currentScreen === "servicios"
                  ? "text-primary border-primary font-bold"
                  : "text-slate-600 border-transparent hover:text-primary hover:border-primary/40"
              }`}
              id="nav_servicios_btn"
            >
              Servicios y Tarifas
            </button>
            <button
              onClick={() => {
                setScreen("agendar");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`font-semibold text-sm tracking-wide transition-all py-1.5 cursor-pointer border-b-2 ${
                currentScreen === "agendar"
                  ? "text-primary border-primary font-bold"
                  : "text-slate-600 border-transparent hover:text-primary hover:border-primary/40"
              }`}
              id="nav_agendar_btn"
            >
              Agenda Online
            </button>
            <button
              onClick={() => {
                setScreen("descargar");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`font-semibold text-sm tracking-wide transition-all py-1.5 cursor-pointer border-b-2 flex items-center gap-1 ${
                currentScreen === "descargar"
                  ? "text-primary border-primary font-bold"
                  : "text-amber-750 font-bold border-transparent hover:text-amber-800"
              }`}
              id="nav_descargas_btn"
            >
              <span className="material-symbols-outlined text-xs">deployed_code</span>
              <span>Exportar HTML</span>
            </button>
          </div>

          {/* Right actions: Currency selector & Agenda Button */}
          <div className="flex items-center gap-4">
            {/* Elegant currency switcher pill - Frosted style */}
            <div className="bg-white/55 backdrop-blur-xs p-0.5 rounded-full flex border border-white/60 shadow-xs">
              <button
                onClick={() => setCurrency("EUR")}
                className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wide transition-all ${
                  currency === "EUR"
                    ? "bg-primary text-white shadow-sm"
                    : "text-slate-600 hover:text-primary hover:bg-white/40"
                }`}
                title="Mostrar precios en Euros (España)"
                id="currency_eur_btn"
              >
                € EUR
              </button>
              <button
                onClick={() => setCurrency("DOP")}
                className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wide transition-all ${
                  currency === "DOP"
                    ? "bg-primary text-white shadow-sm"
                    : "text-slate-600 hover:text-primary hover:bg-white/40"
                }`}
                title="Mostrar precios en Pesos Dominicanos (como en el mockup original)"
                id="currency_dop_btn"
              >
                $ DOP
              </button>
            </div>

            <button
              onClick={() => {
                setScreen("agendar");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="bg-primary text-white px-5 py-2.5 rounded-full text-xs font-bold tracking-wide hover:bg-primary/90 transition-all shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/20 cursor-pointer hover:-translate-y-px active:translate-y-0"
              id="header_agendar_pillo"
            >
              Agendar
            </button>
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
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
            <span className="font-serif text-2xl font-bold text-primary tracking-tight flex items-center gap-2">
              <span className="material-symbols-outlined text-2.5xl font-light">physical_therapy</span>
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
            <button
              onClick={() => {
                setScreen("inicio");
                setMobileMenuOpen(false);
              }}
              className={`w-full py-3 px-4 rounded-xl flex items-center gap-4 text-sm font-semibold transition-colors cursor-pointer text-left ${
                currentScreen === "inicio"
                  ? "bg-[#e9edff] text-[#2f4b85]"
                  : "text-on-surface-variant hover:bg-slate-50"
              }`}
              id="drawer_nav_inicio"
            >
              <span className="material-symbols-outlined">home</span>
              <span>Inicio</span>
            </button>

            <button
              onClick={() => {
                setScreen("servicios");
                setMobileMenuOpen(false);
              }}
              className={`w-full py-3 px-4 rounded-xl flex items-center gap-4 text-sm font-semibold transition-colors cursor-pointer text-left ${
                currentScreen === "servicios"
                  ? "bg-[#e9edff] text-[#2f4b85]"
                  : "text-on-surface-variant hover:bg-slate-50"
              }`}
              id="drawer_nav_servicios"
            >
              <span className="material-symbols-outlined">rebase_edit</span>
              <span>Servicios y Tarifas</span>
            </button>

            <button
              onClick={() => {
                setScreen("agendar");
                setMobileMenuOpen(false);
              }}
              className={`w-full py-3 px-4 rounded-xl flex items-center gap-4 text-sm font-semibold transition-colors cursor-pointer text-left ${
                currentScreen === "agendar"
                  ? "bg-[#e9edff] text-[#2f4b85]"
                  : "text-on-surface-variant hover:bg-slate-50"
              }`}
              id="drawer_nav_agendar"
            >
              <span className="material-symbols-outlined">calendar_month</span>
              <span>Agenda Online</span>
            </button>

            <button
              onClick={() => {
                setScreen("descargar");
                setMobileMenuOpen(false);
              }}
              className={`w-full py-3 px-4 rounded-xl flex items-center gap-4 text-sm font-semibold transition-colors cursor-pointer text-left ${
                currentScreen === "descargar"
                  ? "bg-amber-50 text-amber-900 border border-amber-200/50"
                  : "text-amber-800 font-medium hover:bg-slate-50"
              }`}
              id="drawer_nav_descargas"
            >
              <span className="material-symbols-outlined">deployed_code</span>
              <span>Exportar HTML Standalone</span>
            </button>
          </div>

          {/* Drawer footer info */}
          <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col gap-4">
            <div className="flex flex-col gap-1 text-center">
              <span className="text-xs text-on-surface-variant font-medium">Llámanos directamente:</span>
              <a href="tel:+34978000000" className="text-primary font-bold text-base hover:underline">
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
