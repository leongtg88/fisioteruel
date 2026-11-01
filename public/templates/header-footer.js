/**
 * Fisioteruel - Reusable Header and Footer Web Components
 * Pure Web Components (HTML5 / Vanilla JS) for static HTML screens
 */

class FisioteruelHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="bg-[#faf9ff] shadow-sm sticky top-0 z-50 w-full border-b border-[#c2c6d6]/20">
        <nav class="flex justify-between items-center w-full px-6 py-3 max-w-[1280px] mx-auto">
          <div class="flex items-center gap-4">
            <button class="md:hidden text-[#004097] hover:opacity-80 transition-opacity" id="drawer-trigger">
              <span class="material-symbols-outlined text-2xl">menu</span>
            </button>
            <a class="font-serif text-2xl font-bold text-[#004097] tracking-tight flex items-center gap-2" href="./inicio.html">
              <span class="material-symbols-outlined text-3xl font-light">physical_therapy</span>
              <span>Fisioteruel</span>
            </a>
          </div>
          
          <!-- Desktop Nav -->
          <div class="hidden md:flex items-center gap-8">
            <a class="text-[#004097] font-bold text-sm tracking-wide hover:opacity-80 transition-opacity" href="./inicio.html">Inicio</a>
            <a class="text-[#424653] font-semibold text-sm tracking-wide hover:text-[#004097] transition-colors" href="./servicios.html">Servicios</a>
            <a class="text-[#424653] font-semibold text-sm tracking-wide hover:text-[#004097] transition-colors" href="./inicio.html#ventajas">Ventajas</a>
            <a class="text-[#424653] font-semibold text-sm tracking-wide hover:text-[#004097] transition-colors" href="./inicio.html#estandar">Contacto</a>
          </div>
          
          <div class="flex items-center gap-2">
            <a class="bg-[#676000] text-white px-5 py-2 rounded-full text-sm font-semibold tracking-wide hover:bg-opacity-90 transition-all shadow-sm transform hover:-translate-y-px active:translate-y-0" href="./servicios.html#agenda-directa">
              Agendar Cita
            </a>
          </div>
        </nav>
      </header>
      
      <!-- Mobile Drawer Overlay -->
      <div class="fixed inset-0 bg-black/40 z-[90] hidden opacity-0 transition-opacity duration-300" id="drawer-overlay"></div>
      
      <!-- Mobile Drawer -->
      <aside class="fixed inset-y-0 left-0 z-[100] flex flex-col bg-white rounded-r-xl h-full w-80 shadow-2xl -translate-x-full transition-transform duration-300" id="nav-drawer">
        <div class="p-6 flex flex-col h-full">
          <div class="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
            <span class="font-serif text-2xl font-bold text-[#004097] tracking-tight flex items-center gap-2">
              <span class="material-symbols-outlined text-2xl">physical_therapy</span>
              Fisioteruel
            </span>
            <button class="text-[#424653] hover:text-black" id="drawer-close">
              <span class="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>
          <div class="flex flex-col gap-2">
            <a class="bg-[#e9edff] text-[#2f4b85] rounded-lg px-4 py-3 flex items-center gap-4 font-semibold text-sm transition-colors" href="./inicio.html">
              <span class="material-symbols-outlined">home</span> Inicio
            </a>
            <a class="text-[#424653] px-4 py-3 flex items-center gap-4 font-semibold text-sm hover:bg-[#faf9ff] hover:text-[#004097] rounded-lg transition-colors" href="./servicios.html">
              <span class="material-symbols-outlined">rebase_edit</span> Servicios y Tarifas
            </a>
            <a class="text-[#424653] px-4 py-3 flex items-center gap-4 font-semibold text-sm hover:bg-[#faf9ff] hover:text-[#004097] rounded-lg transition-colors" href="./inicio.html#ventajas">
              <span class="material-symbols-outlined">check_circle</span> Por Qué Elegirnos
            </a>
            <a class="text-[#424653] px-4 py-3 flex items-center gap-4 font-semibold text-sm hover:bg-[#faf9ff] hover:text-[#004097] rounded-lg transition-colors" href="./servicios.html#combos">
              <span class="material-symbols-outlined">loyalty</span> Combos y Descuentos
            </a>
            <a class="text-[#424653] px-4 py-3 flex items-center gap-4 font-semibold text-sm hover:bg-[#faf9ff] hover:text-[#004097] rounded-lg transition-colors" href="mailto:info@fisioteruel.com">
              <span class="material-symbols-outlined">alternate_email</span> Soporte
            </a>
          </div>
          <div class="mt-auto pt-6 border-t border-gray-100 flex flex-col gap-3">
            <span class="text-xs text-[#424653] text-center font-semibold">Atención en Teruel Capital y Provincias</span>
            <a class="text-center font-semibold text-sm text-[#004097] hover:underline" href="tel:+34978000000">+34 978 000 000</a>
          </div>
        </div>
      </aside>
    `;

    // Initialize drawer events inside connectedCallback
    this._setupDrawer();
  }

  _setupDrawer() {
    const trigger = this.querySelector('#drawer-trigger');
    const closeBtn = this.querySelector('#drawer-close');
    const drawer = this.querySelector('#nav-drawer');
    const overlay = this.querySelector('#drawer-overlay');

    if (!trigger || !closeBtn || !drawer || !overlay) return;

    const toggleDrawer = (open) => {
      if (open) {
        drawer.classList.remove('-translate-x-full');
        overlay.classList.remove('hidden');
        setTimeout(() => overlay.classList.add('opacity-100'), 10);
        document.body.classList.add('overflow-hidden');
      } else {
        drawer.classList.add('-translate-x-full');
        overlay.classList.remove('opacity-100');
        setTimeout(() => {
          overlay.classList.add('hidden');
          document.body.classList.remove('overflow-hidden');
        }, 300);
      }
    };

    trigger.addEventListener('click', () => toggleDrawer(true));
    closeBtn.addEventListener('click', () => toggleDrawer(false));
    overlay.addEventListener('click', () => toggleDrawer(false));
  }
}

class FisioteruelFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="bg-[#e9edff]/50 border-t border-[#c2c6d6]/20 py-12 px-6">
        <div class="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="flex flex-col gap-3 max-w-sm">
            <span class="font-serif text-2xl font-bold text-[#004097] flex items-center gap-2">
              <span class="material-symbols-outlined text-3xl font-light">physical_therapy</span>
              Fisioteruel
            </span>
            <p class="text-sm text-[#424653] leading-relaxed">
              Llevamos la excelencia de la terapia física y rehabilitación post-quirúrgica directamente a tu hogar, promoviendo salud, autonomía y bienestar integral en Teruel Capital y alrededores.
            </p>
            <p class="text-xs text-[#424653]/70 font-medium mt-2">
              © 2026 Fisioteruel &amp; Wellness. Teruel, España.
            </p>
          </div>
          
          <div class="flex flex-col gap-3">
            <span class="text-sm font-bold text-[#004097] tracking-wider uppercase">Enlaces Útiles</span>
            <a class="text-sm text-[#424653] hover:text-[#004097] transition-colors focus:underline" href="./inicio.html">Inicio</a>
            <a class="text-sm text-[#424653] hover:text-[#004097] transition-colors focus:underline" href="./servicios.html">Fisioterapia y Masajes</a>
            <a class="text-sm text-[#424653] hover:text-[#004097] transition-colors focus:underline" href="./servicios.html#combos">Membresías y Combos</a>
            <a class="text-sm text-[#424653] hover:text-[#004097] transition-colors focus:underline" href="#">Política de Privacidad</a>
          </div>
          
          <div class="flex flex-col gap-3">
            <span class="text-sm font-bold text-[#004097] tracking-wider uppercase">Contacto</span>
            <p class="text-sm text-[#424653] flex items-center gap-2">
              <span class="material-symbols-outlined text-gray-500">pin_drop</span>
              Av. de Sagunto, Teruel, España
            </p>
            <p class="text-sm text-[#424653] flex items-center gap-2">
              <span class="material-symbols-outlined text-gray-500">call</span>
              +34 978 000 000
            </p>
            <div class="flex gap-3 mt-2">
              <a class="text-[#424653] hover:text-[#004097] transition-colors bg-white p-2 rounded-full shadow-sm border border-gray-100 flex items-center justify-center" href="mailto:contacto@fisioteruel.com" title="Email">
                <span class="material-symbols-outlined">alternate_email</span>
              </a>
              <a class="text-[#424653] hover:text-[#004097] transition-colors bg-white p-2 rounded-full shadow-sm border border-gray-100 flex items-center justify-center" href="tel:+34978000000" title="Llamar">
                <span class="material-symbols-outlined">phone_iphone</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('fisioteruel-header', FisioteruelHeader);
customElements.define('fisioteruel-footer', FisioteruelFooter);
