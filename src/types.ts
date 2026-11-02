/**
 * Re-export para los componentes de la línea de diseño candidata
 * (`Servicios`, `Planes`, `Agendar`), que importan `{ Tab } from "../types"`.
 *
 * El tipos "de verdad" del proyecto vive en `src/lib/types.ts`; este archivo
 * solo existía para no tener que editar los ficheros candidatos. Si uno de
 * estos diseños se adopta como definitivo, cambia el import a `@/lib/types`
 * y borra este shim.
 */
export type Tab = "inicio" | "servicios" | "planes" | "agendar" | "descargar";

export * from "@/lib/types";
