/**
 * Navegación principal. Los candidatos ya adoptados (especialidades, planes y
 * asistente) definen qué se enlaza.
 */

/** Rutas del sitio. */
export const ROUTES = {
  inicio: "/",
  servicios: "/servicios",
  planes: "/planes",
  agendar: "/agendar",
  /** Formulario antiguo (localStorage). Existe, pero no se enlaza. */
  reservas: "/reservas",
} as const;

export type RouteKey = keyof typeof ROUTES;

export interface NavItem {
  key: RouteKey;
  label: string;
  /** Etiqueta larga usada en el drawer móvil */
  drawerLabel: string;
  /** Icono Material Symbols para el drawer móvil */
  drawerIcon: string;
}

/**
 * Navegación visible.
 *
 * Se quitaron dos accesos a petición del cliente: "Exportar HTML" (la página
 * `/descargar` ya no existe) y "Agenda Online" (el formulario viejo sigue vivo
 * en `/reservas`, sin enlace). La pestaña "Agendar" es ahora el asistente de 4
 * pasos del diseño candidato.
 */
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
    key: "planes",
    label: "Planes",
    drawerLabel: "Planes y Bonos",
    drawerIcon: "card_membership",
  },
  {
    key: "agendar",
    label: "Agendar",
    drawerLabel: "Agendar cita",
    drawerIcon: "calendar_month",
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
