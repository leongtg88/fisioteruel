/**
 * Re-export para los componentes candidatos (`Servicios`, `Planes`, `Agendar`),
 * que importan `{ Tab } from "../types"`.
 *
 * `Tab` es simplemente una de las rutas del sitio, así que los valores que
 * estos componentes pasan a `onChangeTab` (`'inicio'`, `'agendar'`) siguen
 * siendo válidos. El origen de verdad está en `src/lib/nav.ts`.
 *
 * Si algún día se reescriben los candidatos para usar `Link` de Next, este shim
 * se puede borrar.
 */
import type { RouteKey } from "@/lib/nav";

export type Tab = RouteKey;

export * from "@/lib/types";
