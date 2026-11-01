import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import path from "node:path";
import { connection } from "next/server";
import TemplateViewer, { type TemplateFile } from "@/components/TemplateViewer";

export const metadata: Metadata = {
  title: "Exportar HTML Standalone",
  description:
    "Plantillas HTML estáticas y Web Components reutilizables de Fisioteruel.",
  alternates: { canonical: "/descargar" },
  robots: { index: false },
};

// Next.js 16: `export const dynamic = "force-dynamic"` ya no es la forma
// recomendada. `connection()` marca el render como "en petición", así que las
// plantillas se leen del disco en cada visita (sin Cache Components).

const TEMPLATES_DIR = path.join(process.cwd(), "public", "templates");

const TEMPLATE_DEFS: { key: string; label: string; file: string }[] = [
  { key: "inicio", label: "inicio.html (Bienvenida)", file: "inicio.html" },
  { key: "servicios", label: "servicios.html (Tarifas)", file: "servicios.html" },
  { key: "js", label: "header-footer.js (Módulos)", file: "header-footer.js" },
];

function readTemplate(file: string): string {
  try {
    return readFileSync(path.join(TEMPLATES_DIR, file), "utf8");
  } catch {
    return `<!-- No se pudo leer public/templates/${file} -->`;
  }
}

export default async function DescargarPage() {
  // Fuerza renderizado en tiempo de petición (lectura de disco por visita).
  await connection();

  const files: TemplateFile[] = TEMPLATE_DEFS.map((def) => ({
    key: def.key,
    label: def.label,
    name: def.file,
    publicPath: `/templates/${def.file}`,
    content: readTemplate(def.file),
  }));

  return (
    <div className="animate-fade-in max-w-[1280px] mx-auto px-6 py-12 flex flex-col gap-10">
      {/* Banner info */}
      <div className="bg-amber-50/50 backdrop-blur-md border border-amber-200/60 p-6 rounded-2xl max-w-4xl mx-auto text-left space-y-4">
        <h3 className="text-amber-900 font-serif text-xl font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-amber-700 text-2xl">
            deployed_code
          </span>
          <span>Archivos HTML Estáticos Reutilizables</span>
        </h3>
        <p className="text-sm text-slate-800 leading-relaxed font-bold">
          Cada pantalla tiene su versión en un{" "}
          <strong>archivo HTML independiente</strong> con estilos embebidos
          mediante clases Tailwind CDN y Material Icons, organizados en una
          carpeta de distribución.
        </p>
        <p className="text-xs text-slate-700 leading-relaxed font-semibold">
          Adicionalmente, se incluye un script reutilizable de{" "}
          <strong>Web Components (header-footer.js)</strong> para asegurar que
          el <strong>Header y el Footer sean modulares y reutilizables</strong>{" "}
          entre ambos archivos HTML nativos, sin duplicar código estático. El
          código que se muestra abajo se lee en el servidor desde{" "}
          <code>public/templates/</code>, así que siempre refleja los archivos
          reales.
        </p>

        <div className="text-xs font-bold text-slate-800 space-y-2 border-t border-amber-200/40 pt-3">
          <p className="text-amber-900 font-black uppercase tracking-wider">
            Ubicación local en el Workspace:
          </p>
          <ul className="list-disc list-inside space-y-1 font-mono text-[11px] text-amber-900">
            <li>/public/templates/header-footer.js</li>
            <li>/public/templates/inicio.html</li>
            <li>/public/templates/servicios.html</li>
          </ul>
        </div>
      </div>

      <TemplateViewer files={files} />
    </div>
  );
}
