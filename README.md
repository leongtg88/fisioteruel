# Fisioteruel — Next.js

Sitio de **Fisioteruel**: fisioterapia, masajes terapéuticos y combos de
bienestar a domicilio en **Santo Domingo, República Dominicana**.

Migrado de Vite + React (SPA con navegación por `useState`) a **Next.js 16
(App Router) + React 19 + Tailwind CSS 4**, gestionado con **pnpm**.

## Puesta en marcha

```bash
pnpm install     # instala dependencias (lockfile: pnpm-lock.yaml)
pnpm dev         # servidor de desarrollo en http://localhost:3000
```

| Comando           | Qué hace                                       |
| ----------------- | ---------------------------------------------- |
| `pnpm dev`        | Desarrollo con Turbopack, puerto 3000          |
| `pnpm build`      | Build de producción                            |
| `pnpm start`      | Sirve el build                                 |
| `pnpm typecheck`  | Comprobación de tipos (`tsc --noEmit`)         |

No hay variables de entorno obligatorias.

## Rutas y navegación

| Ruta              | Página                                                              |
| ----------------- | ------------------------------------------------------------------- |
| `/`               | Inicio: hero, servicios, CTA, horarios y estándar de cuidado         |
| `/servicios`      | Fisioterapia + orientador **+** masajes, combos, extras y horarios   |
| `/planes`         | Planes y simulador de precio                                        |
| `/agendar`        | Asistente de reserva en 4 pasos                                      |
| `/reservas`       | Formulario antiguo (guarda citas en `localStorage`), **sin enlace**  |
| `/disenos/*`      | Los 3 diseños sueltos para revisarlos, **solo por URL** (noindex)    |

## Catálogo y precios

La única fuente de verdad es `src/lib/data.ts`.

**Fisioterapia a domicilio**

| Servicio                     | Precio    |
| ---------------------------- | --------- |
| Evaluación de fisioterapia   | RD$ 5,500 |
| Sesión de fisioterapia       | RD$ 4,000 |

**Masajes terapéuticos**

| Servicio                    | Precio    | Duración |
| --------------------------- | --------- | -------- |
| Descarga de cuerpo completo | RD$ 4,500 | 60 min   |
| Masaje relajante            | RD$ 4,100 | 60 min   |
| Descarga de espalda         | RD$ 3,800 | 45 min   |
| Descarga de piernas         | RD$ 3,800 | 45 min   |
| Liberación de cuello        | RD$ 4,000 | 50 min   |

**Combos**

| Combo                | Incluye                                              | Precio    |
| -------------------- | ---------------------------------------------------- | --------- |
| Renuévate Plus       | Descarga de espalda + extra                          | RD$ 5,000 |
| Energía Total        | Descarga de piernas + extra                          | RD$ 4,500 |
| Bienestar Completo   | Masaje relajante + extra                             | RD$ 5,000 |
| Desconéctate Deluxe  | Descarga de cuerpo completo + cupping + estiramiento | RD$ 6,300 |

**Extras:** precio individual y recargo de RD$ 500 al añadirlos a una sesión.
El detalle completo está en `EXTRAS_DATA`.

**Planes:** semanal 5 %, quincenal 10 % y mensual 15 %. Aplican únicamente a
servicios de fisioterapia.

**Horarios:** lunes, miércoles y viernes de 7:30 p. m. a 10:00 p. m.; martes y
jueves de 3:00 p. m. a 7:00 p. m.; sábados y domingos previa coordinación.

## Cómo funciona el asistente

- **Paso 1:** 11 servicios reservables (2 de fisioterapia, 5 masajes y 4 combos).
- **Paso 2:** asignación automática, fisioterapeuta o terapeuta de masaje.
- **Paso 3:** calendario de lunes a viernes con las franjas reales de cada día.
  Los fines de semana no se reservan online; se coordinan aparte.
- **Paso 4:** datos del paciente, dirección en Santo Domingo y sector.
- El descuento de plan solo se aplica si el servicio es de fisioterapia.

`Agendar.tsx` se monta solo en cliente porque construye el calendario con
`new Date()` durante el render. `CandidateShell.tsx` es el único `"use client"`
de la cadena de candidatos y cablea `onChangeTab` a `router.push`.

## Estructura

```
src/
  app/           layout, globals.css y una carpeta por ruta
  components/    Header, Footer, CandidateShell,
                 vistas migradas (HomeView, ServicesView, BookingView)
                 y los 3 candidatos (Servicios, Planes, Agendar)
  lib/           nav.ts, data.ts, prices.ts, format.ts, types.ts, design-lab.ts
  types.ts       shim con `Tab` para los componentes candidatos
public/          recursos estáticos
```

Alias `@/*` → `src/*` (definido en `tsconfig.json`).

## Pendientes antes de publicar

- **Datos de contacto**: `CONTACT_DATA` en `src/lib/data.ts` contiene teléfono,
  email y dirección provisionales. Sustituirlos por los reales.
- **`metadataBase`** en `src/app/layout.tsx` usa `https://fisioteruel.com` como
  marcador: cambiarlo por el dominio real al desplegar.
- **El asistente no guarda nada**: simula el envío con un `setTimeout` de 1,8 s
  y enseña un ID aleatorio. Para recoger citas de verdad hace falta una Route
  Handler y una base de datos; mientras, `/reservas` conserva el guardado local.
- Confirmar las duraciones de las sesiones (ahora son una referencia de 45–60
  min; los combos usan 90 min).
