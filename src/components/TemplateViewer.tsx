"use client";

import { useState } from "react";

export interface TemplateFile {
  /** Clave del tab (inicio | servicios | js) */
  key: string;
  /** Etiqueta larga del selector lateral */
  label: string;
  /** Nombre de archivo mostrado en la cabecera del visor */
  name: string;
  /** Ruta pública donde se sirve el archivo */
  publicPath: string;
  /** Contenido real del archivo, leído en el servidor */
  content: string;
}

const TAB_ICONS: Record<string, string> = {
  inicio: "html",
  servicios: "html",
  js: "javascript",
};

export default function TemplateViewer({ files }: { files: TemplateFile[] }) {
  const [activeKey, setActiveKey] = useState(files[0]?.key ?? "inicio");
  const [copied, setCopied] = useState(false);

  const activeFile = files.find((f) => f.key === activeKey) ?? files[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      console.error("No se pudo copiar al portapapeles", error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Sidebar file selector */}
      <div className="lg:col-span-3 flex flex-col gap-2 p-2 bg-white/45 backdrop-blur-md rounded-2xl border border-white/50 shadow-md">
        <span className="text-[10.5px] font-black text-primary px-3 py-1.5 uppercase tracking-widest bg-white/75 border border-white/40 rounded-lg shadow-2xs text-center">
          Explorar Plantillas
        </span>

        {files.map((file) => (
          <button
            key={file.key}
            onClick={() => setActiveKey(file.key)}
            aria-pressed={activeKey === file.key}
            className={`w-full text-left py-2.5 px-4 rounded-lg font-bold text-xs flex items-center gap-3 transition-colors cursor-pointer ${
              activeKey === file.key
                ? "bg-primary text-white shadow-xs"
                : "text-slate-700 hover:bg-white"
            }`}
          >
            <span className="material-symbols-outlined text-sm">
              {TAB_ICONS[file.key] ?? "description"}
            </span>
            <span>{file.label}</span>
          </button>
        ))}

        <a
          href={activeFile.publicPath}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-center py-2.5 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-2 text-primary hover:bg-white transition-colors border border-dashed border-primary/30"
        >
          <span className="material-symbols-outlined text-sm">open_in_new</span>
          <span>Abrir /{activeFile.name}</span>
        </a>
      </div>

      {/* Code viewer panel */}
      <div className="lg:col-span-9 bg-slate-950/90 backdrop-blur-md text-slate-200 rounded-2xl overflow-hidden shadow-xl border border-white/10 flex flex-col">
        <div className="bg-slate-900/40 px-6 py-4 flex justify-between items-center border-b border-white/10">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
            <span className="ml-2 font-semibold">{activeFile.name}</span>
          </div>

          <button
            onClick={handleCopy}
            className={`text-xs font-bold px-4 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all ${
              copied
                ? "bg-emerald-600 text-white"
                : "bg-slate-800 hover:bg-slate-700 text-slate-300"
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
            <code>{activeFile.content}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
