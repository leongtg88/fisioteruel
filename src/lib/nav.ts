/**
 * Mapa de rutas del App Router. Sustituye al antiguo `ScreenType` + `useState`
 * que gestionaba la navegación como una SPA.
 */
export const ROUTES = {
  inicio: "/",
  servicios: "/servicios",
  agendar: "/agendar",
  descargar: "/descargar",
} as const;

export type RouteKey = keyof typeof ROUTES;

export interface NavItem {
  key: RouteKey;
  label: string;
  /** Etiqueta larga usada en el drawer móvil */
  drawerLabel: string;
  /** Icono Material Symbols para el drawer móvil */
  drawerIcon: string;
  /** Variante visual destacada (Exportar HTML) */
  highlight?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  {
    key: "inicio",
    label: "Inicio",
    drawerLabel: "Inicio",
    drawerIcon: "home",
  },
  {
    key: "servicios",
    label: "Servicios y Tarifas",
    drawerLabel: "Servicios y Tarifas",
    drawerIcon: "rebase_edit",
  },
  {
    key: "agendar",
    label: "Agenda Online",
    drawerLabel: "Agenda Online",
    drawerIcon: "calendar_month",
  },
  {
    key: "descargar",
    label: "Exportar HTML",
    drawerLabel: "Exportar HTML Standalone",
    drawerIcon: "deployed_code",
    highlight: true,
  },
];

/** Resuelve qué ruta activa corresponde a un pathname concreto. */
export function routeKeyFromPathname(pathname: string): RouteKey {
  const clean = pathname.replace(/\/$/, "") || "/";
  const found = (Object.keys(ROUTES) as RouteKey[]).find(
    (key) => ROUTES[key] === clean
  );
  return found ?? "inicio";
}
