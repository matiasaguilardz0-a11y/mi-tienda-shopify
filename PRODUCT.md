# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Personas que necesitan **mecánica diésel**: dueños y operadores de camiones, tractocamiones, camionetas y maquinaria en Torreón, Coahuila y alrededores. Llegan buscando quién les diagnostique, repare o dé mantenimiento a un motor diésel, y su siguiente paso es escribir o llamar al taller.

Audiencias secundarias (atendidas por los demás servicios, sin confirmar su peso relativo): quienes necesitan rescate 24 horas, vulcanizadora, soldadura de cajas secas, refacciones para tractocamión, renta de equipo industrial o fabricación de remolques.

Pendiente de confirmar: si el cliente típico es una flotilla/transportista o un operador independiente.

## Product Purpose

Sitio web de una sola marca para el taller **Multiservicios MSS**. Existe para que el taller aparezca cuando alguien busca mecánica diésel en Torreón (Google y Google Maps) y para convertir esa visita en un contacto directo por WhatsApp o llamada. Éxito = mensajes y llamadas de clientes con unidades diésel.

## Positioning

Especialistas en mecánica diésel con servicios complementarios en el mismo lugar: escáner para diagnosticar y reprogramar unidades de servicio pesado (y escáner para servicio ligero), vulcanizadora, soldadura de cajas secas, refacciones para tractocamiones, servicio eléctrico, fabricación de remolques de cualquier tipo, renta de equipo industrial y rescate 24 horas.

## Operating Context

- El visitante suele llegar desde el celular, muchas veces con una unidad detenida; el contacto debe estar a un toque (WhatsApp, llamar, cómo llegar).
- Contacto: teléfono/WhatsApp 871 450 9356 (`https://wa.me/528714509356`). Los botones de WhatsApp abren con un mensaje prellenado ("Hola, me interesa: …").
- Dirección: C. Raúl López Sánchez 13031, C.P. 27059, Torreón, Coahuila. En Google Maps el negocio aparece como "MECANICO RESCATE MSS"; el mapa del sitio usa ese lugar.
- Horario: lunes a viernes 9:00 a.m.–6:00 p.m.; sábado 9:00 a.m.–2:00 p.m.; domingo cerrado. Rescate: 24 horas, todos los días.
- Idioma: español de México.

## Capabilities and Constraints

- HTML/CSS/JS estático, sin framework ni build, en `taller/`: `index.html` (inicio), `remolques.html`, `soldadura.html`, `renta.html` (galerías).
- Publicado con GitHub Pages desde la rama `sitio-taller-automotriz`: https://matiasaguilardz0-a11y.github.io/mi-tienda-shopify/taller/
- Cada página lleva sus estilos y el logo embebidos para funcionar sola (también en la vista previa de la app, que abre un archivo a la vez).
- Galerías: las fotos se guardan en `taller/img/<remolques|soldadura|renta>/` con nombres fijos (ver `LEEME.txt` de cada carpeta) y reemplazan solas los recuadros "Foto próximamente".
- Datos estructurados schema.org (`AutoRepair`) con nombre, teléfono, dirección, horario y servicios.
- Sin dominio propio todavía. Videos de remolques: recomendados vía YouTube, aún no existen.

## Brand Commitments

- Nombre oficial: **Multiservicios MSS** (el logo dice "Multiservicios Santiago García's"; en Google Maps figura como "MECANICO RESCATE MSS").
- Logo del cliente: `taller/logo.jpg`.
- Colores pedidos por el cliente: blanco y azul rey.
- La mecánica diésel es la especialidad y va primero y destacada en todo mensaje.
- Tono: directo, honesto, de taller ("servicio rápido, honesto y con precios justos").

## Evidence on Hand

- Confirmado: más de 10 años de experiencia.
- Logo (`taller/logo.jpg`) y ubicación verificada en Google Maps.
- **No hay aún:** fotos de trabajos, remolques, soldadura ni equipo en renta; videos; testimonios ni reseñas; precios. No inventar ninguno de estos.

## Product Principles

1. Diésel primero: la especialidad encabeza cada página y cada lista de servicios.
2. Contacto a un toque: WhatsApp, llamada y ruta siempre visibles, sobre todo en celular.
3. Solo hechos del taller: nada de reseñas, cifras o fotos que el cliente no haya entregado.
4. Local y encontrable: Torreón, Coahuila explícito en textos, títulos y datos estructurados.
5. Fácil de mantener: agregar fotos o servicios no debe requerir tocar diseño.
