import { useState } from "react";

export default function HtmlExporter() {
  const [activeFile, setActiveFile] = useState<"inicio" | "servicios" | "js">("inicio");
  const [copied, setCopied] = useState(false);

  // Standalone file raw codes for convenient copying
  const fileCodes = {
    inicio: `<!-- Guarda este código en: /public/templates/inicio.html -->
<!DOCTYPE html>
<html class="light" lang="es">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <title>Fisioteruel - Fisioterapia Premium a Domicilio</title>
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;500;600;700&family=Work+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0..1,0&display=swap" rel="stylesheet"/>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            primary: '#004097',
            secondary: '#425d98',
            tertiary: '#676000',
            background: '#faf9ff',
            'surface-container-low': '#f1f3ff',
            'surface-container-lowest': '#ffffff',
            'on-surface-variant': '#424653'
          },
          fontFamily: {
            serif: ['"Source Serif 4"', 'Georgia', 'serif'],
            sans: ['"Work Sans"', 'sans-serif']
          }
        }
      }
    }
  </script>
  <style>
    .glass-card {
      background: rgba(255, 255, 255, 0.82);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(0, 64, 151, 0.08);
    }
    .cream-bg { background-color: #FDFCF8; }
  </style>
</head>
<body class="cream-bg text-[#161b28] font-sans overflow-x-hidden min-h-screen flex flex-col justify-between">
  <fisioteruel-header></fisioteruel-header>
  <main class="flex-grow">
    <!-- HERO -->
    <section class="relative min-h-[600px] flex items-center px-6 py-12 overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img class="w-full h-full object-cover" alt="Fisioterapia en casa" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqlWyiRvgy_X4zSv82QuiI9TtuJfM9TWV0dOO0VJaFfT0Ueul9slMJEYJ9H7ya3PigHP0s_pzHt5CRHeFxiZxja-y7YD9Ip93-qjnrQ-JIQZPNZ0xiMTkFkGaYYVWR5z_8a3SKpYWt-20v8wBJWv1E6ZenCr5nBwHYZDoTF3MgtuhWrVzIBu1xB7loqgnYUi7Aq1wNo_TDWQw8I78-0u0cDVBG_A-m5F1apTLIOhKs4ztkz2Evdbszs-vxJKjDk3hF5vVQUQi8zSQ"/>
        <div class="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-transparent"></div>
      </div>
      <div class="relative z-10 max-w-[1280px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="flex flex-col items-start gap-6 max-w-lg">
          <span class="bg-[#d9e2ff] text-[#29457f] px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide">Fisioterapia Premium a Domicilio</span>
          <h1 class="font-serif text-4xl sm:text-5xl font-bold text-primary leading-tight">Recupera tu Movimiento, Transforma tu Vida</h1>
          <p class="text-base text-on-surface-variant">Fisioterapia a domicilio y masajes terapéuticos profesionales en Teruel Capital. Cuidado clínico personalizado en tu hogar.</p>
          <div class="flex gap-4">
            <a href="./servicios.html#agenda-directa" class="bg-tertiary text-white px-6 py-3.5 rounded-lg text-sm font-bold shadow-lg">Solicita tu evaluación</a>
            <a href="./servicios.html" class="border border-primary text-primary px-6 py-3.5 rounded-lg text-sm font-bold">Ver Servicios</a>
          </div>
        </div>
      </div>
    </section>
  </main>
  <fisioteruel-footer></fisioteruel-footer>
  <script src="./header-footer.js"></script>
</body>
</html>`,
    servicios: `<!-- Guarda este código en: /public/templates/servicios.html -->
<!DOCTYPE html>
<html class="light" lang="es">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <title>Fisioteruel - Servicios y Tarifas a Domicilio</title>
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;500;600;700&family=Work+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0..1,0&display=swap" rel="stylesheet"/>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            primary: '#004097',
            secondary: '#425d98',
            tertiary: '#676000',
            background: '#faf9ff',
            'surface-container': '#e9edff',
            'surface-container-low': '#f1f3ff',
            'surface-container-lowest': '#ffffff',
            'on-surface-variant': '#424653'
          },
          fontFamily: {
            serif: ['"Source Serif 4"', 'Georgia', 'serif'],
            sans: ['"Work Sans"', 'sans-serif']
          }
        }
      }
    }
  </script>
</head>
<body class="bg-[#FDFCF8] text-[#161b28] font-sans select-none">
  <fisioteruel-header></fisioteruel-header>
  <main class="max-w-[1280px] mx-auto px-6 py-12 flex flex-col gap-16">
    <!-- SERVICIOS CATALOG -->
    <section class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div class="flex flex-col gap-6">
        <span class="bg-[#d9e2ff] text-secondary px-4 py-1.5 rounded-full w-fit text-xs font-bold font-sans">Bienestar a tu puerta</span>
        <h2 class="font-serif text-4xl font-bold">Servicios de Salud con <span class="text-primary italic">Calidez Clínica</span></h2>
        <p class="text-sm text-on-surface-variant leading-relaxed">Ofrecemos fisioterapia y masajes terapéuticos de alta gama en tu hogar en Teruel Capital.</p>
        <a href="#agenda-directa" class="bg-primary text-white px-6 py-3 rounded-lg text-sm font-bold text-center w-48">Agenda Cita</a>
      </div>
      <div>
        <img class="rounded-xl object-cover h-[340px] w-full shadow" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrDeUO6cmTShp1YjLFYTrY50ZIekyNZ2V-x-sEo1jZCHGCX7ZgXgpS8tvA6Stmi3N6M62rFvHjrmnD_imFvZr4vu9TaCLdznC-vjhuSHtf3FJSKNqSTVCYvkFEfkpudRjzmeJa1lHbfTPaSgAtL9XoeMPEhSkxKskwwki_rgDNUZhUFFUttfM5TLOeZwqStqVwxIlCU8PD5XbRJhBY0W9PLrc-Q93yJ_cFsAdlIJwR9GzV4c0UieE39h8Oczw-wXqBjBmOu0Rcf6w"/>
      </div>
    </section>
  </main>
  <fisioteruel-footer></fisioteruel-footer>
  <script src="./header-footer.js"></script>
</body>
</html>`,
    js: `/**
 * Reutilizable header-footer.js para Fisioteruel
 * Vanilla JS standard custom elements (HTML5)
 */

class FisioteruelHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = \`
      <header class="bg-[#faf9ff] shadow-sm sticky top-0 z-50 w-full border-b border-[#c2c6d6]/20">
        <nav class="flex justify-between items-center w-full px-6 py-4 max-w-[1280px] mx-auto">
          <a class="font-serif text-2xl font-bold text-[#004097] tracking-tight flex items-center gap-2" href="./inicio.html">
            <span class="material-symbols-outlined text-3xl font-light">physical_therapy</span>
            <span>Fisioteruel</span>
          </a>
          <div class="hidden md:flex items-center gap-8">
            <a class="text-[#004097] font-bold text-sm" href="./inicio.html">Inicio</a>
            <a class="text-[#424653] font-semibold text-sm hover:text-[#004097] transition-colors" href="./servicios.html">Servicios</a>
          </div>
          <a class="bg-[#676000] text-white px-5 py-2 rounded-full text-sm font-semibold tracking-wide" href="./servicios.html#agenda-directa">
            Agendar
          </a>
        </nav>
      </header>
    \`;
  }
}

class FisioteruelFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = \`
      <footer class="bg-[#e9edff]/50 border-t border-[#c2c6d6]/20 py-12 px-6">
        <div class="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="flex flex-col gap-3">
            <span class="font-serif text-xl font-bold text-[#004097]">Fisioteruel</span>
            <p class="text-xs text-[#424653]">Llevamos la excelencia de la terapia física directamente a tu hogar.</p>
          </div>
        </div>
      </footer>
    \`;
  }
}

customElements.define('fisioteruel-header', FisioteruelHeader);
customElements.define('fisioteruel-footer', FisioteruelFooter);`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(fileCodes[activeFile]);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="animate-fade-in max-w-[1280px] mx-auto px-6 py-12 flex flex-col gap-10">
      
      {/* Banner info */}
      <div className="bg-amber-50/50 backdrop-blur-md border border-amber-200/60 p-6 rounded-2xl max-w-4xl mx-auto text-left space-y-4">
        <h3 className="text-amber-900 font-serif text-xl font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-amber-700 text-2xl">deployed_code</span>
          <span>Archivos HTML Estáticos Reutilizables</span>
        </h3>
        <p className="text-sm text-slate-850 leading-relaxed font-bold">
          Tal y como solicitaste, hemos estructurado la aplicación de modo que cada pantalla posea su versión en un **archivo HTML independiente** con estilos embebidos mediante clases Tailwind CDN, FontAwesome/Material Icons y organizados en una carpeta de distribución.
        </p>
        <p className="text-xs text-slate-700 leading-relaxed font-semibold">
          Adicionalmente, hemos diseñado un script reutilizable de **Web Components (header-footer.js)** para asegurar que el **Header y el Footer sean completamente modulares y reutilizables** entre ambos archivos HTML nativos, sin necesidad de duplicar código estático.
        </p>

        <div className="text-xs font-bold text-slate-800 space-y-2 border-t border-amber-200/40 pt-3">
          <p className="text-amber-955 font-black uppercase tracking-wider">Ubicación local en el Workspace:</p>
          <ul className="list-disc list-inside space-y-1 font-mono text-[11px] text-amber-900">
            <li>/public/templates/header-footer.js</li>
            <li>/public/templates/inicio.html</li>
            <li>/public/templates/servicios.html</li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar file selector */}
        <div className="lg:col-span-3 flex flex-col gap-2 p-2 bg-white/45 backdrop-blur-md rounded-2xl border border-white/50 shadow-md">
          <span className="text-[10.5px] font-black text-primary px-3 py-1.5 uppercase tracking-widest bg-white/75 border border-white/40 rounded-lg shadow-2xs text-center">
            Explorar Plantillas
          </span>
          
          <button
            onClick={() => setActiveFile("inicio")}
            className={`w-full text-left py-2.5 px-4 rounded-lg font-bold text-xs flex items-center gap-3 transition-colors cursor-pointer ${
              activeFile === "inicio"
                ? "bg-primary text-white shadow-xs"
                : "text-slate-700 hover:bg-white"
            }`}
          >
            <span className="material-symbols-outlined text-sm">html</span>
            <span>inicio.html (Bienvenida)</span>
          </button>

          <button
            onClick={() => setActiveFile("servicios")}
            className={`w-full text-left py-2.5 px-4 rounded-lg font-bold text-xs flex items-center gap-3 transition-colors cursor-pointer ${
              activeFile === "servicios"
                ? "bg-primary text-white shadow-xs"
                : "text-slate-700 hover:bg-white"
            }`}
          >
            <span className="material-symbols-outlined text-sm">html</span>
            <span>servicios.html (Tarifas)</span>
          </button>

          <button
            onClick={() => setActiveFile("js")}
            className={`w-full text-left py-2.5 px-4 rounded-lg font-bold text-xs flex items-center gap-3 transition-colors cursor-pointer ${
              activeFile === "js"
                ? "bg-primary text-white shadow-xs"
                : "text-slate-700 hover:bg-white"
            }`}
          >
            <span className="material-symbols-outlined text-sm">javascript</span>
            <span>header-footer.js (Módulos)</span>
          </button>
        </div>

        {/* Code viewer panel */}
        <div className="lg:col-span-9 bg-slate-950/90 backdrop-blur-md text-slate-200 rounded-2xl overflow-hidden shadow-xl border border-white/10 flex flex-col">
          <div className="bg-slate-900/40 px-6 py-4 flex justify-between items-center border-b border-white/10">
            <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
              <span className="ml-2 font-semibold">
                {activeFile === "inicio" ? "inicio.html" : activeFile === "servicios" ? "servicios.html" : "header-footer.js"}
              </span>
            </div>

            <button
              onClick={handleCopy}
              className={`text-xs font-bold px-4 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all ${
                copied ? "bg-emerald-600 text-white" : "bg-slate-800 hover:bg-slate-700 text-slate-300"
              }`}
            >
              <span className="material-symbols-outlined text-sm">
                {copied ? "check_circle" : "content_copy"}
              </span>
              <span>{copied ? "¡Copiado!" : "Copiar Código"}</span>
            </button>
          </div>

          <div className="p-6 font-mono text-[11.5px] leading-relaxed max-h-[500px] overflow-auto text-left text-slate-300 bg-black/30">
            <pre>
              <code>{fileCodes[activeFile]}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
